Ready for review
Select text to add comments on the plan
Backend integration: headless CMS + Spring Boot for form metadata and application storage
Context
The app is currently 100% client-side: form content (src/forms/** — manifests, rules, PDF field mappings, evidence catalogs) is authored as static TypeScript/JSON and bundled at build time, and a user's in-progress application (answers, current step, visibility state) lives only in localStorage (src/engine/persistence/). There is no server, no durable storage, and no user identity.

The user wants to add a real backend: form metadata authored in a headless CMS (e.g. Strapi/Contentful) and served through a Spring Boot API, user applications persisted server-side instead of in localStorage, and the same validation/rules the client already enforces (json-rules-engine conditional visibility, Zod-driven format rules, the mandatory-field gate) also enforced authoritatively on the backend. Per direction already confirmed: the client keeps its own live json-rules-engine evaluation for instant per-keystroke UX (this is what the free-navigation/live-sidebar-unlock features depend on) — the backend re-validates at save/submit time as the authoritative gate, not on every keystroke.

This plan describes the shape of that work — new REST contracts, what moves out of localStorage and into API calls, and how the existing engine types translate into a Java rules implementation — as a reference for scoping and sequencing the actual implementation, which is a genuinely large, multi-phase effort (new service, new language ecosystem, CMS integration, auth from scratch).

Architecture
Headless CMS (Strapi/Contentful)          Spring Boot                          React SPA
──────────────────────────────           ─────────────                        ─────────
Content authors edit:            publish  Pulls + caches CMS content   fetch   Bootstraps formRegistry
 - manifest (steps/fields)      ───────▶  as its own persisted         ─────▶  from API instead of
 - rules document                webhook  representation; exposes a            static imports
 - pdfMapping                              typed REST API                      
 - evidenceCatalog                                                             xstate + json-rules-engine
                                           Owns Application entities:            still run client-side,
                                            id, formId, answers (JSON),          unchanged, for live UX
                                            status, owner, timestamps
                                                                                 
                                           Re-evaluates the same                Saves debounce to the
                                           RuleDocument server-side in           API instead of
                                           Java; enforces format +               localStorage
                                           requiredness at save time
The SPA never talks to the CMS directly — Spring Boot is the one API surface the client knows about, keeping CMS auth/webhooks/shape off the client and letting the CMS be swapped later without a frontend change.

Content contract (CMS ↔ Spring Boot ↔ SPA)
The CMS's content types should model 1:1 onto the engine types that already exist and are already form-agnostic — nothing about their shape needs to change, only where they're authored and served from:

FormManifest / StepSchema / FieldSchema / FieldType / FieldConstraints / RuleRef / ContentBlock — src/engine/schema/types.ts
RuleDocument / RuleDefinition / RuleEventType / RuleEventParams — src/engine/rules/types.ts (conditions are literal json-rules-engine TopLevelCondition trees — all/any of {fact, operator, value})
PdfMappingDocument / PdfFieldMappingEntry (text/dropdown/checkbox/checkboxGroup) — src/engine/pdf/types.ts
EvidenceCatalog / EvidenceItem — src/engine/evidence/types.ts
CMS content should support draft/publish so the SPA and any in-flight application only ever see published content — a form's shape must not change underneath someone mid-application. On publish, a CMS webhook triggers Spring Boot to pull and cache the updated content (store each document as JSONB rather than fully normalizing into relational tables — the shape is already the natural unit the frontend consumes, and normalizing ~230 dynamic per-form field keys into columns would mean schema churn on every step/field addition).

Spring Boot: form content API
Replaces src/engine/registry/formRegistry.ts (registerForm/getForm/listForms) and the static registerForm(...) calls in src/forms/index.ts.

GET /api/forms — list published forms (→ listForms())
GET /api/forms/{formId} — manifest + rules + pdfMapping + evidenceCatalog bundle (→ getForm())
On the frontend, formRegistry.ts becomes an async fetch-and-cache on app load instead of a synchronous Map populated by build-time imports — its call sites (WizardPage.tsx, ReviewPage.tsx, DownloadPage.tsx all call getForm(formId)) barely change in shape, just in when the data becomes available.

Spring Boot: application (user data) API
Replaces src/engine/persistence/wizardPersistence.ts and applicationsRegistry.ts.

POST /api/applications — create (formId + owner) → replaces local createApplication
GET /api/applications — list mine → replaces the Dashboard's local list read
GET /api/applications/{id} — → replaces loadSnapshot/extractContext
PATCH /api/applications/{id} — merge answers, update currentStepId/status → replaces saveSnapshot/persistActorOnChange's debounced write (same debounce strategy applies directly to a debounced PATCH)
Persist answers as JSON (JSONB/document store), not normalized columns — the engine already treats answers: Record<string, unknown> as an opaque, dynamically-keyed bag; the backend should honor that rather than fight it.

This requires real user identity, which doesn't exist anywhere in the app today — Spring Security with session or JWT auth (or wiring to an existing IdP) is a separate, non-trivial slice of this work, not a port of anything.

Server-side rules/validation (Java)
Three things need a Java equivalent, all bounded, mechanical ports of small existing functions rather than large rewrites:

Rule evaluation — src/engine/rules/rulesEngine.ts's evaluateRules(): for each RuleDefinition, evaluate its conditions tree against stored answers, reduce fired showStep/showField/requireField/requireEvidence events into {visibleSteps, visibleFields, requiredFields, activeEvidence}. Two real options, worth deciding explicitly before building: hand-roll a small Java interpreter for the actual operator set in use (equal, notEqual, in) — lightweight, but a second implementation of the rule semantics that could drift from the JS one; or embed a JS engine (GraalVM) and run the real json-rules-engine library server-side — heavier operationally, but there is truly only one implementation of "what a rule means."
Mandatory-field gate — src/engine/validation/validateAnswers.ts's findMissingRequiredFields(): a small pure function over the rule-evaluation result plus each field's static constraints.required — trivial once (1) exists.
Format validation — src/engine/schema/buildZodSchema.ts's buildFieldZodType() (SSN/A-Number regex, min/maxLength, enum-of-options): port to Bean Validation constraints or a small custom validator, driven by the same FieldSchema.constraints/FieldType data pulled from the CMS-backed manifest — so a constraint change in the CMS governs both the client Zod schema and the server validator without being kept in sync by hand.
Enforce all three on application create/update: reject a save that leaves a currently-required field empty or a field failing format constraints, and return the resulting missing/invalid field list in the response.

Frontend integration points
formRegistry.ts — async fetch+cache; src/forms/index.ts's static registerForm calls are removed.
wizardPersistence.ts / applicationsRegistry.ts — swap localStorage for API calls, keeping the same function signatures (saveSnapshot/loadSnapshot/jumpToStep) where possible so WizardPage.tsx/ReviewPage.tsx call sites change minimally.
WizardStepView.tsx's commitAndGo — after a save, surface any server-returned validation state.
Review/Download (ReviewPage.tsx, DownloadPage.tsx) — recommend replacing their client-computed findMissingRequiredFields/useRuleEvaluation calls with a GET /api/applications/{id}/validation response, so there's exactly one authoritative judgment of "is this complete," not two independently-computed ones that could disagree.
Explicitly out of scope (flagged, not silently dropped)
PDF generation (fillPdf.ts, pdfMapping.ts) stays client-side pdf-lib, unrelated to this request (metadata + application storage + validation) — a natural next question, not addressed here.
xstate (buildWizardMachine.ts) stays entirely client-side/unchanged — pure UI navigation state, not something a backend should own.
Client-side json-rules-engine stays for live field-reveal UX, per the confirmed direction.
Verification
This plan describes work in a language/service the repo doesn't have yet, so there's nothing to run today. Once implementation begins:

First integration slice: round-trip the smallest form (mock-form) end-to-end — CMS publish → Spring Boot sync → SPA fetch → render a step → save an answer → server validation response — before doing the same for the two large real forms (i-485, i-130).
Confirm the REST contracts above still match RegisteredForm (src/engine/registry/formRegistry.ts), WizardContext (src/engine/machine/buildWizardMachine.ts), and RuleEvaluationResult (src/engine/rules/rulesEngine.ts) at the time work starts, since those are the shapes this plan was checked against.
Add Comment