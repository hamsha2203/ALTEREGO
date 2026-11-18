# ALTEREGO — AIESEC in Amaravati
Static app (no build). Run: `npx serve .` (don't open via file://) · Deploy: drag folder to Vercel/Netlify.

## EB photos and participant photo
The current photos in `assets/eb/` are `hamsha.jpeg`, `munna.jpeg`, `DJ.jpeg`, `kishan.jpeg`, `yuva.jpeg` (Yuvaanesh P), and `alan.png` (Alan Pramod).
Participant uploads accept JPG, PNG, or WEBP up to 10 MB and remain in the browser.

## Independent scoring engines
- **A · EB resonance**: answers → 8 dims (A,P,C,E,S,I,D,M) scaled 0-10 → centered cosine vs all six `EB[].v` profiles, then scores are normalized across the six profiles so one or two shared-baseline profiles do not dominate. Uses NO department data. The available profiles and their data are shown with the full ranking; raw ACE response files are not included in this repository.
- **B · Department**: answers → 6 JD competencies (S,L,D,K,O,R) → cosine vs `DEPT[].v` (from JD booklets), then scores are distributed across all five departments as percentages summing to 100. A modest prior boosts the participant's selected department while answers still determine the fit and rankings.
- **C · Archetype**: tally of C/A/N/V/W per answer.
- **D · Spider-Verse identity**: independent profile weights in `spiderverse.js`, based on the selected answer's existing EB-dimension and archetype signals. Does not change the question set or other scores.
Each option in `Q` = `text|EBdims|DEPTdims|ARCH` — separate mappings per engine.

## Spider-Verse artwork
Place individually licensed, commissioned, or original transparent PNG artwork in `assets/spider-verse/`. Required filenames and dimensions guidance are in [assets/spider-verse/README.md](assets/spider-verse/README.md). The app identifies the exact missing file instead of showing a broken or substitute image.

## TODO / known gaps
- No raw ACE response files or verified EB special-ability/archetype descriptions are included; do not infer those details from resonance vectors. The five configured department competency profiles are all scored and displayed independently of EB results.
- Photos stay in-browser; no backend, so no admin/CSV/duplicate-check yet. Next step: Supabase (private storage bucket + `submissions` table) + protected admin route.
- Scores are indicative, not validated psychometrics.


## Recent update
- Removed iGTa from department alignment options and results.
- Result pages display all six EB profiles and all five department scores; the collectible card includes both complete match rankings.
- Reworked the 20 question prompts into comic/multiverse scenarios and refreshed the visual styling.
- Added an independent Spider-Verse identity result before EB resonance, five-step result navigation, answer-based character stats, and a collectible card download.
- Added Alan Pramod to EB resonance and linked `yuva.jpeg` to Yuvaanesh P.
