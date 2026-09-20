#!/usr/bin/env python3
"""
Film Frxmes image helper.

Makes a lightweight WebP thumbnail (for gallery grids) for each photo you give
it, optionally shrinks the full-size photo for the web, and prints a ready-to-
paste gallery snippet with the correct width/height (which stops the page
jumping while images load).

    pip install pillow
    python tools/optimize_images.py MAMATHA/new-shot.jpeg
    python tools/optimize_images.py --resize Mahaveer/IMG_9000.jpeg   # also shrink the original in place
    python tools/optimize_images.py --all                             # (re)build every thumbnail

Run it from the site's root folder (the one that contains index.html).
Originals are only touched when you pass --resize. EXIF (incl. GPS) is stripped
from anything it re-saves.
"""
import os, re, sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOLDERS = ["images", "Mahaveer", "MAMATHA", "new-images", "portraits"]
SKIP = {"images/logo.jpeg", "images/myphoto.jpg"}
FULL_MAX = 2400      # longest edge of the full-size web copy
THUMB_W = 900        # thumbnail width (px)
THUMB_Q = 76         # webp quality
FULL_Q = 82          # jpeg quality when re-saving


def slug(name):
    stem = os.path.splitext(name)[0]
    return re.sub(r"[^a-zA-Z0-9]+", "-", stem).strip("-").lower()


def thumb_path(rel):
    d, f = os.path.split(rel)
    return f"thumbs/{d}/{slug(f)}.webp"


def process(rel, resize=False):
    src = os.path.join(ROOT, rel)
    im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    w, h = im.size
    if resize and (max(w, h) > FULL_MAX or os.path.getsize(src) > 700_000):
        big = im.copy()
        big.thumbnail((FULL_MAX, FULL_MAX), Image.LANCZOS)
        tmp = src + ".tmp"
        big.save(tmp, "JPEG", quality=FULL_Q, optimize=True, progressive=True)
        if os.path.getsize(tmp) < os.path.getsize(src):
            os.replace(tmp, src)
            w, h = big.size
        else:
            os.remove(tmp)
    t = im.copy()
    if t.width > THUMB_W:
        t = t.resize((THUMB_W, round(t.height * THUMB_W / t.width)), Image.LANCZOS)
    tp = thumb_path(rel)
    os.makedirs(os.path.dirname(os.path.join(ROOT, tp)), exist_ok=True)
    t.save(os.path.join(ROOT, tp), "WEBP", quality=THUMB_Q, method=6)
    return tp, (w, h), t.size


def snippet(rel, tp, full, th, caption="Caption here"):
    return (f'<a class="g-item" href="{rel}" data-cap="{caption}" data-cursor="View" data-focus>\n'
            f'  <img src="{tp}" width="{th[0]}" height="{th[1]}" alt="{caption}" loading="lazy" decoding="async">\n'
            f'  <span class="g-cap">{caption}</span>\n</a>')


def main(argv):
    resize = "--resize" in argv
    args = [a for a in argv if not a.startswith("--")]
    if "--all" in argv:
        args = [os.path.join(d, f).replace("\\", "/")
                for d in FOLDERS for f in sorted(os.listdir(os.path.join(ROOT, d)))
                if f.lower().endswith((".jpg", ".jpeg", ".png")) and f"{d}/{f}" not in SKIP]
    if not args:
        print(__doc__); return
    for rel in args:
        rel = os.path.relpath(os.path.abspath(rel), ROOT).replace("\\", "/")
        tp, full, th = process(rel, resize)
        print(f"{rel}  ->  {tp}  ({full[0]}x{full[1]} full, {th[0]}x{th[1]} thumb)")
        if "--all" not in argv:
            print(snippet(rel, tp, full, th)); print()


if __name__ == "__main__":
    main(sys.argv[1:])
