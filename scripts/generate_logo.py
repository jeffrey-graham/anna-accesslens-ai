#!/usr/bin/env python3
"""
Generate crisp 512x512 `assets/app-logo.png` for AccessLens AI (`@jeffrey-graham/accesslens-ai`)
using 2x supersampled (`1024x1024` -> `512x512` LANCZOS) Pillow vector-grade geometry.
"""

from __future__ import annotations

import math
import os
from PIL import Image, ImageDraw, ImageFilter


def set_oom_guardrail() -> None:
    try:
        with open("/proc/self/oom_score_adj", "w", encoding="utf-8") as fh:
            fh.write("500")
    except OSError:
        pass


def generate_logo(out_path: str) -> None:
    set_oom_guardrail()
    size = 1024  # 2x supersample -> downsampled to 512x512
    img = Image.new("RGBA", (size, size), (10, 17, 34, 255))
    draw = ImageDraw.Draw(img)

    # Rich radial twilight gradient background (full-bleed square safe for Anna 256x256 crop)
    cx, cy = size // 2, size // 2
    for r in range(740, 0, -8):
        t = 1.0 - (r / 740.0)
        red = int(10 + 18 * t)
        green = int(18 + 42 * t)
        blue = int(38 + 78 * t)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(red, green, blue, 255))

    # Subtle inner border frame
    draw.rounded_rectangle(
        (36, 36, size - 36, size - 36),
        radius=190,
        outline=(56, 189, 248, 70),
        width=6,
    )

    # Soft ambient cyan/emerald glow behind the central optical lens
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse((240, 210, 784, 754), fill=(56, 189, 248, 85))
    gdraw.ellipse((360, 280, 820, 740), fill=(52, 211, 153, 70))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=56))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # Left side: Dense tangled "raw complex text" bars entering the lens
    dense_y = [310, 362, 414, 466, 518, 570, 622]
    dense_x0 = [110, 142, 98, 128, 108, 150, 120]
    for y, x0 in zip(dense_y, dense_x0):
        draw.rounded_rectangle(
            (x0, y, 420, y + 24),
            radius=12,
            fill=(148, 163, 184, 150),
        )
    # Amber warning accent on one dense bar (symbolizing hidden risk trap before AccessLens)
    draw.rounded_rectangle((118, 466, 410, 490), radius=12, fill=(251, 191, 36, 215))

    # Right side: Transformed WCAG-AAA spaced plain-language lines + checklist & concept nodes
    clear_rows = [
        (540, 326, 865, (52, 211, 153, 255)),   # Emerald checklist / action clarity
        (540, 448, 895, (248, 250, 252, 255)),  # Crisp white plain-language line
        (540, 570, 835, (56, 189, 248, 255)),   # Sky cyan accessible HTML / concept flow
    ]
    for x0, y, x1, color in clear_rows:
        draw.rounded_rectangle((x0, y, x1, y + 44), radius=22, fill=color)

    # Subtle concept-map connector arc & nodes on top-right / bottom-right
    node_pts = [(885, 250), (912, 470), (860, 682)]
    draw.line([node_pts[0], (760, 348)], fill=(52, 211, 153, 190), width=10)
    draw.line([node_pts[2], (745, 592)], fill=(56, 189, 248, 190), width=10)
    for nx, ny in [node_pts[0], node_pts[2]]:
        draw.ellipse((nx - 26, ny - 26, nx + 26, ny + 26), fill=(15, 23, 42, 255), outline=(56, 189, 248, 255), width=10)
        draw.ellipse((nx - 10, ny - 10, nx + 10, ny + 10), fill=(52, 211, 153, 255))

    # Central Optical AccessLens Ring & Glass Interior
    lens_cx, lens_cy, lens_r = 492, 476, 218

    # Angled ergonomic lens handle (bottom-left)
    angle = math.radians(136)
    hx1 = lens_cx + int((lens_r + 8) * math.cos(angle))
    hy1 = lens_cy + int((lens_r + 8) * math.sin(angle))
    hx2 = lens_cx + int((lens_r + 185) * math.cos(angle))
    hy2 = lens_cy + int((lens_r + 185) * math.sin(angle))
    draw.line([(hx1, hy1), (hx2, hy2)], fill=(15, 23, 42, 255), width=68)
    draw.line([(hx1, hy1), (hx2, hy2)], fill=(56, 189, 248, 255), width=46)
    draw.ellipse((hx2 - 23, hy2 - 23, hx2 + 23, hy2 + 23), fill=(56, 189, 248, 255))

    # Inner dark sapphire glass tint
    draw.ellipse(
        (lens_cx - lens_r, lens_cy - lens_r, lens_cx + lens_r, lens_cy + lens_r),
        fill=(14, 30, 62, 232),
    )

    # Inside the lens: Bionic-bolded clarity transformation bars + Emerald Check badge
    draw.rounded_rectangle((352, 378, 468, 416), radius=19, fill=(248, 250, 252, 255))
    draw.rounded_rectangle((482, 378, 632, 416), radius=19, fill=(56, 189, 248, 235))

    draw.rounded_rectangle((338, 456, 492, 494), radius=19, fill=(52, 211, 153, 255))
    draw.rounded_rectangle((506, 456, 646, 494), radius=19, fill=(248, 250, 252, 235))

    draw.rounded_rectangle((360, 534, 456, 572), radius=19, fill=(248, 250, 252, 255))
    draw.rounded_rectangle((470, 534, 618, 572), radius=19, fill=(56, 189, 248, 225))

    # Specular glass reflection arc (top-left inside lens)
    draw.arc(
        (lens_cx - lens_r + 30, lens_cy - lens_r + 30, lens_cx + lens_r - 30, lens_cy + lens_r - 30),
        start=200,
        end=262,
        fill=(255, 255, 255, 165),
        width=14,
    )

    # Outer dual-tone optical bezel
    draw.ellipse(
        (lens_cx - lens_r - 12, lens_cy - lens_r - 12, lens_cx + lens_r + 12, lens_cy + lens_r + 12),
        outline=(15, 23, 42, 255),
        width=40,
    )
    draw.ellipse(
        (lens_cx - lens_r, lens_cy - lens_r, lens_cx + lens_r, lens_cy + lens_r),
        outline=(56, 189, 248, 255),
        width=28,
    )
    draw.arc(
        (lens_cx - lens_r, lens_cy - lens_r, lens_cx + lens_r, lens_cy + lens_r),
        start=-55,
        end=85,
        fill=(52, 211, 153, 255),
        width=28,
    )

    # Verified Accessibility Checkmark Badge on bottom-right rim of lens
    bx, by, br = 648, 626, 66
    draw.ellipse((bx - br, by - br, bx + br, by + br), fill=(16, 185, 129, 255), outline=(11, 18, 36, 255), width=12)
    draw.line([(bx - 28, by + 2), (bx - 6, by + 24), (bx + 32, by - 20)], fill=(255, 255, 255, 255), width=16, joint="curve")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    final_img = img.resize((512, 512), Image.Resampling.LANCZOS)
    final_img.save(out_path, format="PNG", optimize=True)
    print(f"[+] Generated {out_path} ({os.path.getsize(out_path)} bytes, 512x512 PNG)")


if __name__ == "__main__":
    target = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "assets", "app-logo.png")
    )
    generate_logo(target)
