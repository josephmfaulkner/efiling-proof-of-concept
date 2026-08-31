# USCIS I-485 Guided e-Filing — Proof of Concept

A React + Vite proof of concept for a myUSCIS-style guided filing wizard, built so
that adding a new form is a metadata change, not an engine rewrite — and, most
importantly, proving that a real USCIS PDF can be auto-filled entirely in the
browser from data the applicant enters, with no backend.

**Not affiliated with USCIS or DHS. Not legal advice. Not a real filing channel.**

## Running it

```bash
npm install
npm run dev
```

Open the printed local URL. Start an application from the landing page (either
form works) and walk through the wizard.

## What this proves

1. **A real, current-edition government PDF (Form I-485) can be filled entirely
   client-side**, using [pdf-lib](https://pdf-lib.js.org/), with the applicant's
   data landing in the correct boxes — verified against the actual form, not a
   mockup. See `src/engine/pdf/fillPdf.ts` and `src/forms/i-485/pdfMapping.ts`.
2. **Adding a second form touches no engine code.** `src/forms/mock-form/` is a
   complete second form (steps, rules, PDF mapping, evidence catalog) added by
   creating that one directory and adding one registration call in
   `src/forms/index.ts` — nothing under `src/engine/` changed to support it.
3. **Business rules (conditional steps, fields, and evidence requirements) live
   in JSON**, evaluated by [json-rules-engine](https://github.com/CacheControl/json-rules-engine),
   not hardcoded in components. See `src/forms/i-485/rules/i485.rules.json`.

## Architecture

- `src/engine/` — generic, form-agnostic code (schema → Zod, the wizard state
  machine factory, the rules-engine wrapper, the PDF-fill engine, localStorage
  persistence, the form registry). Never imports from `src/forms/`.
- `src/forms/<form-id>/` — one form's content as data: a `manifest.ts` (steps/
  fields), a rules JSON document, a `pdfMapping.ts` (logical answer → real PDF
  field names), and an evidence catalog. `src/forms/index.ts` registers each one.
- `src/components/fields/` — a small `<SchemaField>` switch (~8 leaf
  components) that turns a field's `type` into the right input, wired to React
  Hook Form. Adding a field type means adding one case here, reusable by every
  form.
- `src/features/` — the route-level screens (landing, dashboard with a
  Domino's-tracker-style progress bar, the wizard, evidence checklist, review,
  and PDF generation/download).
- XState v5 (`src/engine/machine/buildWizardMachine.ts`) orchestrates step
  sequencing as one state per step, generated entirely from a form's
  `manifest.steps` — no per-form transition logic anywhere.

## Look and feel

The UI is built with [MUI](https://mui.com/) on a theme (`src/theme.ts`) styled to
match the real myUSCIS guided filing app, not just approximate it. The user supplied
actual "Save Page As" captures of 44 real myUSCIS I-130 pages plus screenshots
(`myUSCIS_Pages/`, not committed — local reference material only); those captures
turned out to contain more real signal than a saved SPA snapshot normally would:

- The static chrome (banner, masthead, footer) is server-rendered and was captured
  correctly, complete with the real `.uscis-banner-bar`/`.uscis-header` CSS, real
  colors (e.g. the header's actual `#003366`, not a USWDS-default guess), and the
  real DHS/USCIS logo, seal, and icon SVGs — all vendored into `src/assets/gov/` and
  used as-is.
- A handful of app components (the evidence uploader, address layout, radio helper
  text, required-field styling) are captured with **genuine embedded sourcemaps**
  pointing at their real `.scss` filenames — e.g. the required-field red is
  confirmed `#cc3333` straight from the app's own `RequiredFieldsCopy.scss`, not a
  guess.
- Most MUI component styling (sidebar accordion, form controls) comes from MUI's
  runtime CSS-in-JS, which a page save can't capture at all — those parts are
  cross-checked against the screenshots instead, since that reconstruction is a
  best-effort approximation, not captured fact.

One deliberate departure: the `.gov` banner's real, literal text — "An official
website of the United States government" — is reworded here (**"This is a
prototype of a U.S. government-style website"**) since this is a local, unpublished
study prototype, not an actual federal site; that's the one sentence in the whole
UI it felt wrong to reuse verbatim even so. The rest of the banner (assets, layout,
the full "Here's how you know" expand copy) and the footer's identifier section are
otherwise faithful, each carrying its own explicit not-affiliated disclaimer.

Still out of scope: the repeating "Add address" list/table pattern seen on a few
real pages — that's a genuinely new field type (a repeating group), not a
look-and-feel change, and is left as a natural follow-up.

## Hard-won findings about the real I-485 PDF

The official USCIS-distributed I-485 (`https://www.uscis.gov/.../i-485.pdf`) is
**encrypted** (AES, empty user password) and an **Adobe LiveCycle hybrid XFA
form** — a real 760-field AcroForm layer plus a synced XFA `datasets`/`template`
XML packet, plus a PDF417 barcode on every page that USCIS's scan/intake
pipeline reads (normally regenerated by Adobe's own scripting engine).

- **pdf-lib cannot load the original file.** It silently produces 0 fields — no
  error, just nothing — because pdf-lib doesn't support encrypted PDFs. The fix
  used here: decrypt the file **once, offline**, with Python's `pypdf`
  (`reader.decrypt(""); writer.append(reader)`), and vendor the clean output as
  a static asset (`public/forms/i-485/template.pdf`). This is a one-time
  repo-prep step, never something asked of the end user's browser.
- **Loading the decrypted file drops the XFA layer** (pdf-lib prints a benign
  `"Removing XFA form data..."` warning). Any standard viewer still renders the
  760 real AcroForm fields correctly; the barcode and Adobe-side XFA sync are
  lost. That's an accepted limitation for a PoC, not something this project
  attempts to solve.
- **`pdfDoc.save()`'s default appearance-regeneration pass can crash on a real
  field it never touched.** This PDF has one rich-text-capable field (Part 14,
  Additional Information) that throws `RichTextFieldReadError` during that
  blanket pass. `fillPdfTemplate()` tries the normal save first (correct and
  necessary — skipping it entirely left freshly-authored templates, like the
  mock form, rendering blank despite a correctly-set value) and falls back to
  `save({ updateFieldAppearances: false })` only if it throws.
- **Checkbox pairs don't follow a fixed index convention.** Sex and most Yes/No
  questions are `[0]`=first-option/`[1]`=second-option, but at least one field
  (`Pt1Line19_YN`, Q19) is reversed. Every `checkboxGroup` mapping entry records
  its real, individually-verified on-value per option rather than assuming a
  pattern.
- **One logical answer can map to several real PDF fields.** The A-Number
  reprints via its own field in the running header of all 24 pages.

## Known limitations (by design, for a PoC)

- Illustrative rules only (4–5 example rules) — not a legally vetted encoding
  of immigration law. Only Part 1 (~30 of its 111 fields) and the start of
  Part 2 are wired to real PDF fields; the rest of the real form's 736 fields
  are out of scope here.
- No backend, no auth, no real file upload — evidence "upload" records a
  filename only. Wizard progress persists to `localStorage`; only *submitted*
  step data survives a refresh, not an in-progress, not-yet-submitted step.
- The mock form's synthetic PDF template was authored by hand with pdf-lib
  purely to prove the registry pattern generalizes — it is explicitly labeled
  as non-official on its own page.
