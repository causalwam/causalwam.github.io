# Verification

Verified on 2026-11-06 using local Chrome 156.0.8078.80 through Playwright Core. The current paper-style layout was visually inspected on desktop and mobile.

- Viewport widths 1440, 1024, 768, 540, 390 and 320 pixels: no page-level horizontal overflow; all images loaded.
- No JavaScript exceptions or failed HTTP responses during the main interaction checks.
- Public arXiv title, five-author order, two affiliation labels and superscripts match the paper. The arXiv button links to the supplied PDF and BibTeX includes arXiv:2610.42096.
- Nine RoboCasa skill-family rows, 17 task rows, four LIBERO suite rows, and one real-robot row.
- Result tabs work with pointer and keyboard (left/right, Home/End).
- The per-task selector changes the RoboCasa chart and is hidden for other benchmarks.
- Both supplied MP4s load and play with their original dimensions and duration. A common play/pause control operates both, native controls remain available, and reduced-motion preference suppresses autoplay. File hashes match the original inputs.
- Citation copying works on localhost; direct file preview renders correctly and has a text-selection fallback.
- Theory disclosure opens, official Figure 1 opens in a dialog, and Escape closes it. The static Visualization section and its old routing images are absent.
- The configured paper link is visible; the unconfigured code link remains hidden.
- Relative assets and interactions work under a simulated `/cwam/` repository prefix.
- `node --check app.js` and `node --check site-config.js` passed.
- All font and media assets are served locally. No external runtime requests occurred during browser verification.
- Narrative headings follow setup, the ambiguity/sparsity/identification argument, practical estimator and empirical questions. The five-row synthetic table is present; both user-supplied MP4s remain byte-identical and are the primary robot demonstration media.

Published at https://causalwam.github.io/ from https://github.com/causalwam/causalwam.github.io on 2026-11-06. GitHub Pages uses main:/ with HTTPS enforced. Canonical and Open Graph URLs use the public site address. Live Chromium verification passed all six viewport widths, video playback and controls, result tabs and keyboard navigation, citation copying, image dialog, and disclosure checks with no JavaScript errors or failed responses. The page, official figure, sharing image and both videos returned HTTP 200; downloaded video hashes match the supplied originals. Real-device / non-Chromium browser testing and external author-link availability were not checked.

The website source and the provided paper assets were checked; no new experiment was run and no scientific result was independently reproduced.
