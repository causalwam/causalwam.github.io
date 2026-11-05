# CausalWAM project website

Academic project page for **CausalWAM: Learning the Causes of Actions in World Action Models** ([paper](https://arxiv.org/pdf/2610.42096)).

Website: https://causalwam.github.io/

This repository contains the project website. Research implementation links will be added when available.

## Local preview

```sh
python -m http.server 8018 --bind 127.0.0.1
```

Open http://127.0.0.1:8018. No build or package installation is required.

## Maintenance

Edit `index.html`, `styles.css`, and `app.js` for content, styling, and interactions. Configure public links in `site-config.js`; an empty research code URL keeps that button hidden. Keep the citation in `index.html` and `citation.bib` consistent.

The organization Pages repository is `causalwam/causalwam.github.io`, served from branch `main`, root directory. The `.nojekyll` file enables plain static hosting.

## Assets

Figure 1 is extracted from the linked paper. Both demonstration videos were supplied by the authors and copied unchanged. The existing video heatmaps are not independently authenticated by this website. See `ASSET_PROVENANCE.md` for hashes and result attribution.

Source Serif 4 and Source Sans 3 are bundled with their SIL Open Font License notices in `assets/fonts/`. Layout and explanatory progression are inspired by [DSReg](https://dsreg.github.io/). Paper and media rights remain with their respective owners; no new redistribution license is assigned.
