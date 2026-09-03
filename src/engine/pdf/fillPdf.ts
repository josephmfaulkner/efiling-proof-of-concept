import { PDFDocument } from 'pdf-lib';
import type { PdfMappingDocument, TextTransform } from './types';

function applyTransform(transform: TextTransform | undefined, value: string): string {
  switch (transform) {
    case 'stripNonDigits':
      return value.replace(/\D/g, '');
    case 'isoDateToUsDate': {
      // <input type="date"> yields "YYYY-MM-DD"; USCIS forms expect "MM/DD/YYYY".
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
      return match ? `${match[2]}/${match[3]}/${match[1]}` : value;
    }
    default:
      return value;
  }
}

/**
 * Loads a vendored PDF template, applies every mapping entry that has a
 * corresponding non-empty answer, and returns a filled, downloadable Blob.
 *
 * Templates must already be decrypted, plain AcroForm PDFs (see
 * public/forms/*.pdf and README) — pdf-lib cannot load the original
 * encrypted, XFA-hybrid PDFs USCIS distributes.
 *
 * Only a subset of a real form's fields is ever hand-mapped for this PoC, so
 * each entry is applied independently: a missing/renamed field name warns to
 * the console and is skipped rather than aborting the whole document.
 */
export async function fillPdfTemplate(
  templateUrl: string,
  mapping: PdfMappingDocument,
  answers: Record<string, unknown>,
): Promise<Blob> {
  // Every manifest.pdfTemplatePath is written root-relative (e.g. "/forms/i-130/template.pdf")
  // for readability, but the app isn't always served from the domain root — GitHub Pages
  // serves it at /<repo>/ (see vite.config.ts's `base`). Resolving against BASE_URL here,
  // in the one place that actually fetches a template, keeps every manifest untouched.
  const resolvedUrl = `${import.meta.env.BASE_URL}${templateUrl.replace(/^\//, '')}`;
  const templateBytes = await fetch(resolvedUrl).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(templateBytes);
  const form = pdfDoc.getForm();

  for (const entry of mapping.entries) {
    const rawValue = answers[entry.answerKey];
    if (rawValue === undefined || rawValue === null || rawValue === '') continue;

    try {
      switch (entry.kind) {
        case 'text': {
          const text = applyTransform(entry.transform, String(rawValue));
          for (const name of entry.pdfFieldNames) form.getTextField(name).setText(text);
          break;
        }
        case 'dropdown': {
          const exportValue = entry.valueMap?.[String(rawValue)] ?? String(rawValue);
          for (const name of entry.pdfFieldNames) form.getDropdown(name).select(exportValue);
          break;
        }
        case 'checkbox': {
          if (Boolean(rawValue)) {
            for (const name of entry.pdfFieldNames) form.getCheckBox(name).check();
          }
          break;
        }
        case 'checkboxGroup': {
          const match = entry.options.find((o) => o.matchValue === String(rawValue));
          if (match) form.getCheckBox(match.pdfFieldName).check();
          break;
        }
      }
    } catch (err) {
      console.warn(`[fillPdf] skipping "${entry.answerKey}" — field lookup failed:`, err);
    }
  }

  // Verified by hand: setText()/check()/select() only set a field's *value* — none of
  // them regenerate its visual appearance stream (pdf-lib only does that during save(),
  // via the blanket, default-on updateFieldAppearances pass). That default pass is what
  // we actually want and need — skipping it left freshly-authored templates (e.g. the
  // mock form) rendering blank despite a correctly-set value — but the real I-485 has one
  // rich-text-capable field (Part 14, Additional Information) that throws
  // RichTextFieldReadError during that same blanket pass, even though we never touch it.
  // So: try the normal/recommended save first, and only fall back to the restricted one
  // (which skips appearance regeneration entirely) for templates that can't tolerate it.
  let outputBytes: Uint8Array;
  try {
    outputBytes = await pdfDoc.save();
  } catch (err) {
    console.warn('[fillPdf] full appearance regeneration failed, falling back to unregenerated save:', err);
    outputBytes = await pdfDoc.save({ updateFieldAppearances: false });
  }
  // pdf-lib's Uint8Array is always backed by a plain ArrayBuffer at runtime; the cast
  // works around lib.dom's stricter ArrayBufferView<ArrayBuffer> typing in TS 6.
  return new Blob([outputBytes as BlobPart], { type: 'application/pdf' });
}
