#!/usr/bin/env python3
"""
Generate crisp 1280x720 `assets/architecture-preview.png` Anna Store Cover & Architecture Diagram
for AccessLens AI (`@jeffrey-graham/accesslens-ai`), honoring 14 GiB host memory guardrails.
"""

from __future__ import annotations

import os
from PIL import Image, ImageDraw, ImageFont


def set_oom_guardrail() -> None:
    try:
        with open("/proc/self/oom_score_adj", "w", encoding="utf-8") as fh:
            fh.write("500")
    except OSError:
        pass


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = (
        [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        ]
        if bold
        else [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        ]
    )
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size=size)
    return ImageFont.load_default()


def generate_cover(out_path: str) -> None:
    set_oom_guardrail()
    w, h = 1280, 720
    img = Image.new("RGB", (w, h), (10, 17, 34))
    draw = ImageDraw.Draw(img)

    # Subtle header band
    draw.rounded_rectangle((32, 26, w - 32, 128), radius=20, fill=(17, 28, 51), outline=(56, 189, 248), width=2)
    f_h1 = load_font(28, bold=True)
    f_sub = load_font(15, bold=False)
    f_card_t = load_font(15, bold=True)
    f_body = load_font(13, bold=False)
    f_pill = load_font(13, bold=True)

    draw.text((58, 46), "AccessLens AI  (@jeffrey-graham/accesslens-ai)", fill=(248, 250, 252), font=f_h1)
    draw.text(
        (58, 88),
        "6-Engine Plain-Language, Checklist, Dyslexia Studio, WCAG 2.2 HTML Auto-Repair, Karaoke & Concept-Map App for Anna OS",
        fill=(148, 163, 184),
        font=f_sub,
    )
    draw.rounded_rectangle((1060, 48, 1222, 92), radius=22, fill=(16, 185, 129))
    draw.text((1084, 62), "WCAG 2.2 AAA", fill=(6, 18, 36), font=f_pill)

    # Left Input Column
    draw.rounded_rectangle((32, 156, 304, 560), radius=18, fill=(17, 28, 51), outline=(51, 65, 85), width=2)
    draw.text((50, 178), "DENSE INPUT DOMAINS", fill=(56, 189, 248), font=f_card_t)
    domains = [
        ("Medical & EOBs", "Discharge notes, drug warnings", (52, 211, 153)),
        ("Legal Contracts", "SaaS MSAs, NDAs, leases", (167, 139, 250)),
        ("Financial Filings", "Loan APR traps, 10-K risks", (251, 191, 36)),
        ("Technical & RFCs", "Zero-day CVEs, architectures", (56, 189, 248)),
    ]
    for idx, (title, desc, col) in enumerate(domains):
        y = 222 + idx * 80
        draw.rounded_rectangle((48, y, 288, y + 64), radius=12, fill=(10, 17, 34), outline=col, width=2)
        draw.text((62, y + 12), title, fill=(248, 250, 252), font=f_pill)
        draw.text((62, y + 35), desc, fill=(148, 163, 184), font=f_body)

    # Connector arrows to 6 Capability Cards
    draw.line([(304, 358), (348, 358)], fill=(56, 189, 248), width=4)
    draw.polygon([(354, 358), (340, 349), (340, 367)], fill=(56, 189, 248))

    # Right 2x3 Grid of All 6 Isabel-Highlighted Capabilities
    cards = [
        (
            "1. Plain-Language Translator",
            "Grade 16.7 -> Grade 5.8 (-10.9)\nGunning Fog + Inline Glossary\n3 Modes: 5th-Gr / Brief / Exec",
            (52, 211, 153),
        ),
        (
            "2. Action & Risk Checklist",
            "Who / What / By When tasks\nAuto-renewal & drug trap alerts\n.ics Calendar + Anna APS Memory",
            (251, 191, 36),
        ),
        (
            "3. Dyslexia & Bionic Studio",
            "Syllable dots + Bionic bolding\nCream / Sepia / 21:1 AAA themes\nAnimated Line Focus Ruler",
            (56, 189, 248),
        ),
        (
            "4. WCAG 2.2 HTML Repair",
            "Fixes alt, labels, h1-h6, onclick\nRepairs <4.5:1 CSS to AAA >7:1\nSide-by-Side ARIA + Unified Diff",
            (167, 139, 250),
        ),
        (
            "5. Karaoke Narration",
            "0.75x-1.75x pitch & voice control\nReal-time word/sentence highlight\nWeb Speech + Anna Neural TTS",
            (244, 114, 182),
        ),
        (
            "6. Visual Concept Map",
            "<= 24 crisp keyboard-safe nodes\nParties -> Obligations -> Risks\nZoom, Filter & ARIA Inspector",
            (52, 211, 153),
        ),
    ]

    gx0, gy0 = 360, 156
    cw, ch = 285, 192
    gap_x, gap_y = 16, 20
    for idx, (title, body, col) in enumerate(cards):
        col_i = idx % 3
        row_i = idx // 3
        x = gx0 + col_i * (cw + gap_x)
        y = gy0 + row_i * (ch + gap_y)
        draw.rounded_rectangle((x, y, x + cw, y + ch), radius=16, fill=(17, 28, 51), outline=col, width=2)
        draw.rounded_rectangle((x, y, x + cw, y + 8), radius=4, fill=col)
        draw.text((x + 18, y + 24), title, fill=(248, 250, 252), font=f_card_t)
        for l_idx, line in enumerate(body.split("\n")):
            draw.text((x + 18, y + 66 + l_idx * 30), f"• {line}", fill=(203, 213, 225), font=f_body)

    # Bottom Anna Runtime + MCP Footer Bar
    draw.rounded_rectangle((32, 588, w - 32, 692), radius=18, fill=(14, 30, 62), outline=(52, 211, 153), width=2)
    draw.text(
        (58, 608),
        "ANNA OS RUNTIME + MCP 2024-11-05 DUAL PACKAGING",
        fill=(52, 211, 153),
        font=f_card_t,
    )
    draw.text(
        (58, 642),
        "AnnaAppRuntime.connect()  •  anna.storage (APS)  •  anna.llm.complete  •  anna.audio.speak  •  anna.chat.append_artifact  •  6 MCP Tools",
        fill=(248, 250, 252),
        font=f_body,
    )

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, format="PNG", optimize=True)
    print(f"[+] Generated {out_path} ({os.path.getsize(out_path)} bytes, 1280x720 PNG)")


if __name__ == "__main__":
    target = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "assets", "architecture-preview.png")
    )
    generate_cover(target)
