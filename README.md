# ALTEREGO — AIESEC in Amaravati
Static app (no build). Run: `npx serve .` (don't open via file://) · Deploy: drag folder to Vercel/Netlify.

## EB photos and participant photo
The current photos in `assets/eb/` are `hamsha.jpeg`, `munna.jpeg`, `DJ.jpeg`, `kishan.jpeg`, and `yuva.jpeg` (Yuvaanesh P). Alan Pramod currently has no photo, so initials show for that profile.
Participant uploads accept JPG, PNG, or WEBP up to 10 MB and remain in the browser.

## Independent scoring engines
- **A · EB resonance**: answers → 8 dims (A,P,C,E,S,I,D,M) scaled 0-10 → centered cosine vs `EB[].v`. EB vectors were hand-coded from the ACE sheet (edit `v` to tune). Uses NO dept data.
- **B · Department**: answers → 6 JD competencies (S,L,D,K,O,R) → cosine vs `DEPT[].v` (from JD booklets). Uses NO EB data. 2nd dept shown if within 8 pts.
- **C · Archetype**: tally of C/A/N/V/W per answer.
- **D · Spider-Verse identity**: independent profile weights in `spiderverse.js`, based on the selected answer's existing EB-dimension and archetype signals. Does not change the question set or other scores.
Each option in `Q` = `text|EBdims|DEPTdims|ARCH` — separate mappings per engine.

## Spider-Verse artwork
Place individually licensed, commissioned, or original transparent PNG artwork in `assets/spider-verse/`. Required filenames and dimensions guidance are in [assets/spider-verse/README.md](assets/spider-verse/README.md). The app identifies the exact missing file instead of showing a broken or substitute image.

## TODO / known gaps
- No iGTa EB baseline provided; PM/F&L/iGTa/EwA JDs only partly covered.
- Photos stay in-browser; no backend, so no admin/CSV/duplicate-check yet. Next step: Supabase (private storage bucket + `submissions` table) + protected admin route.
- Scores are indicative, not validated psychometrics.


## Recent update
- Removed iGTa from department alignment options and results.
- Final card shows the matched EB member's name only; their portfolio/department is not printed on the card.
- Reworked the 20 question prompts into comic/multiverse scenarios and refreshed the visual styling.
- Added an independent Spider-Verse identity result before EB resonance, five-step result navigation, answer-based character stats, and a collectible card download.
- Added Alan Pramod to EB resonance and linked `yuva.jpeg` to Yuvaanesh P.
