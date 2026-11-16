# ALTEREGO — AIESEC in Amaravati
Static app (no build). Run: `npx serve .` (don't open via file://) · Deploy: drag folder to Vercel/Netlify.

## EB photos
The current photos in `assets/eb/` are `hamsha.jpeg`, `munna.jpeg`, `DJ.jpeg`, and `kishan.jpeg`. `Yuvaanesh P` has no photo yet, so initials show for that profile.

## Engines (all in data.js / app.js, independent)
- **A · EB resonance**: answers → 8 dims (A,P,C,E,S,I,D,M) scaled 0-10 → centered cosine vs `EB[].v`. EB vectors were hand-coded from the ACE sheet (edit `v` to tune). Uses NO dept data.
- **B · Department**: answers → 6 JD competencies (S,L,D,K,O,R) → cosine vs `DEPT[].v` (from JD booklets). Uses NO EB data. 2nd dept shown if within 8 pts.
- **C · Archetype**: tally of C/A/N/V/W per answer.
Each option in `Q` = `text|EBdims|DEPTdims|ARCH` — separate mappings per engine.

## TODO / known gaps
- No iGTa EB baseline provided; PM/F&L/iGTa/EwA JDs only partly covered.
- Photos stay in-browser; no backend, so no admin/CSV/duplicate-check yet. Next step: Supabase (private storage bucket + `submissions` table) + protected admin route.
- Scores are indicative, not validated psychometrics.


## Recent update
- Removed iGTa from department alignment options and results.
- Final card shows the matched EB member's name only; their portfolio/department is not printed on the card.
- Reworked the 20 question prompts into comic/multiverse scenarios and refreshed the visual styling.
