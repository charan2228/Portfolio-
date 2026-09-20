# Film Frxmes

Static site, no build step. Open `index.html` or push the folder to GitHub Pages / any static host.

## Structure
- `assets/css/site.css`: all styling (was duplicated across 6 pages)
- `assets/js/main.js`: nav, cursor, reveals, lightbox, page transitions (shared)
- `assets/js/home.js`: intro, hero slider, stacking cards. **Hero photos are the `SLIDES` list at the top.**
- `thumbs/`: small WebP copies used in gallery grids (full photos open in the lightbox)

## Adding a photo to a gallery
1. Drop the photo in its folder (`images/`, `MAMATHA/`, ...).
2. From the site root: `pip install pillow`, then
   `python tools/optimize_images.py --resize path/to/photo.jpeg`
   It makes the thumbnail, shrinks the original for web, and prints a snippet to paste into the page's gallery.

## Adding a hero slide
Add a line to `SLIDES` in `assets/js/home.js`. `fx`/`fy` (0 to 1) is where the autofocus box lands on the photo.

## Notes
- Photos in this copy were resized to max 2400px and EXIF (incl. GPS) stripped. Keep your originals.
- Users with "reduce motion" on get no intro, no autoplay, no animation.
