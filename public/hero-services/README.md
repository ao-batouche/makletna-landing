# Hero photography

Each service uses the same scene for its small frame and full-hero background.

- `*.webp`: 520 × 520 frame thumbnails.
- `*-background.webp`: 1600 × 1600 responsive background files.
- `*-hq.webp`: 3840 × 3840 enhanced background files for large or high-density displays.

The sources are AI-generated 1024 × 1024 photographs. The large files were
enhanced using FSRCNN ×4 super-resolution, then downsampled to 3840 pixels and
encoded as WebP. These are enhanced 4K-width assets, not native 4K photographs.
Source files are retained in `attached_assets/generated_images/hero-*-hq.png`.

The enhancement model is FSRCNN_x4.pb from
https://github.com/Saafke/FSRCNN_Tensorflow (MIT license). OpenCV's dnn_superres
module was used as a one-off asset-preparation tool, not an app dependency.
