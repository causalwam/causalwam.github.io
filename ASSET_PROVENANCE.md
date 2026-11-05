# Asset and result provenance

The original supplied CWAM paper archive supplied the initial result values. On 2026-11-06 the user identified the public paper as CausalWAM: Learning the Causes of Actions in World Action Models (https://arxiv.org/pdf/2610.42096), requested official Figure 1, and separately supplied two MP4 demonstration videos. The title, authors, affiliation superscripts, figure and citation now follow that public paper.

## Official Figure 1

- `assets/figure1-overview.svg` and `assets/figure1-overview.png`: faithful vector/raster rendering of Figure 1 on PDF page 6. Clip rectangle in source PDF points: `(108, 82, 504, 251)`. No labels, arrows or other figure content are retouched.
- Source: https://arxiv.org/pdf/2610.42096 (v1).
- Source PDF SHA-256: `779ae9e74958abed959c57e7f9dd828a36dc08e0d7e2fc39e597825238b39314`.
- The page caption explicitly states that the deployed implementation retains the gray dashed dense path.
- The earlier static routing-visualization section is removed. Its old image assets remain in local history but are excluded from the updated deployment ZIP.

## Video demos added 2026-11-06

- `assets/demos/real-robot-stack.mp4`: source `00e0c371e3970721b30f76a7fc39ceb7.mp4`; 768 × 768, 175 frames, 15 fps, 11.6667 s. SHA-256: `b157542472eafbf17f1dd964021bf3af88d22f7a2d58b77f9afc2f8772be97b4`.
- `assets/demos/robocasa.mp4`: source `cb9276c6d3dbbc5fabf19c37f63a3a7b.mp4`; 1280 × 960, 208 frames, 30 fps, 6.9333 s. SHA-256: `ab109c52d0ba15a1eaadce88d9cc01e726e4f54e3380eb6d9fa07169ac679e1b`.
- Both MP4s are copied unchanged from the supplied files. The heatmaps are already present in those files. This website work does not compute or independently authenticate the heatmap weights.
- The JPEG poster for each video is an unretouched sampled frame from that video.
- The separate synthetic illustrations created on 2026-10-23 are not used by this page and are not included in its deployment ZIP.

## Typography and layout

The reading-column organization, serif typography and teal accents are inspired by https://dsreg.github.io/. No DSReg research prose, figures, branding or claims are reused. Source Serif 4 and Source Sans 3 are retrieved from Google Fonts, converted to WOFF2 for local serving, and accompanied by their original SIL Open Font License notices under `assets/fonts/`.

## Sharing image

`assets/social-preview.png` is an original typographic sharing image containing sampled poster frames from the supplied videos.

## Results

RoboCasa365: `robocasa_per_task_success_table.tex`, 17 task success rates. Baseline: 407 / 1700 = 23.941%; CWAM: 729 / 1700 = 42.882%. The website rounds both to one decimal place.

LIBERO: supplied result values 94/98, 98/100, 86/95, and 94/98 percent for baseline/CWAM across Spatial, Object, Goal, and LIBERO-10. Means: 93.0% / 97.75%. The website explicitly states that these averages use the reported rounded suite values.

Real robot: 23 / 50 versus 41 / 50 successful stack-cube trials, equivalent to 46% / 82%.

Context ablation: selected task values 74/63/28, 72/61/21, 70/59/33, and 69/58/16 percent for full/C-only/random. Exact means are 71.25% / 60.25% / 24.5%; display values are 71.3% / 60.3% / 24.5%. The four tasks were chosen by highest full CWAM success.

Checkpoint attribution follows the author's clarification: main results use 50k; the supplied CSV's 60k label is an error. The website does not modify the manuscript or evaluation files.

## Authorship and publication metadata

Title, author order, affiliation superscripts and citation follow the public paper linked above. No research implementation URL, publication acceptance, DOI or redistribution license has been inferred.
