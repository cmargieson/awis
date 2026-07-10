#!/usr/bin/env python3
"""Generate Google Play listing screenshots and graphics for AWIS."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "assets/data/data.json"
ICON_PATH = ROOT / "assets/images/icon.png"
OUT_DIR = ROOT / "fastlane/metadata/android/en-AU/images"

WIDTH = 1080
HEIGHT = 1920
HEADER_H = 160
SEARCH_H = 96
PADDING = 48
CARD_H = 132
CARD_GAP = 16


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def aerodromes() -> list[dict[str, str]]:
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def draw_card(
    draw: ImageDraw.ImageDraw,
    y: int,
    name: str,
    identifier: str,
    phone: str,
    *,
    bg: str,
    border: str,
    text: str,
    muted: str,
) -> None:
    x0 = PADDING
    x1 = WIDTH - PADDING
    draw.rounded_rectangle((x0, y, x1, y + CARD_H), radius=24, fill=bg, outline=border, width=2)
    draw.text((x0 + 28, y + 22), name, font=load_font(34, bold=True), fill=text)
    draw.text((x0 + 28, y + 72), identifier, font=load_font(28), fill=muted)
    phone_w = draw.textlength(phone, font=load_font(28))
    draw.text((x1 - 28 - phone_w, y + 72), phone, font=load_font(28), fill=muted)


def draw_screen(
    *,
    query: str,
    items: list[dict[str, str]],
    dark: bool = False,
) -> Image.Image:
    if dark:
        canvas = "#111111"
        header = "#1c1c1e"
        header_text = "#ffffff"
        search_bg = "#1c1c1e"
        search_border = "#3a3a3c"
        search_text = "#ffffff"
        placeholder = "#8e8e93"
        card_bg = "#1c1c1e"
        card_border = "#3a3a3c"
        text = "#ffffff"
        muted = "#8e8e93"
    else:
        canvas = "#ffffff"
        header = "#007aff"
        header_text = "#ffffff"
        search_bg = "#ffffff"
        search_border = "#d1d1d6"
        search_text = "#111111"
        placeholder = "#8e8e93"
        card_bg = "#ffffff"
        card_border = "#d1d1d6"
        text = "#111111"
        muted = "#6c6c70"

    img = Image.new("RGB", (WIDTH, HEIGHT), canvas)
    draw = ImageDraw.Draw(img)

    draw.rectangle((0, 0, WIDTH, HEADER_H), fill=header)
    title = "AWIS Phonebook"
    title_font = load_font(40, bold=True)
    title_w = draw.textlength(title, font=title_font)
    draw.text(((WIDTH - title_w) / 2, 78), title, font=title_font, fill=header_text)

    search_y = HEADER_H + PADDING
    draw.rounded_rectangle(
        (PADDING, search_y, WIDTH - PADDING, search_y + SEARCH_H),
        radius=24,
        fill=search_bg,
        outline=search_border,
        width=2,
    )
    search_label = query if query else "Search aerodromes"
    search_color = search_text if query else placeholder
    draw.text((PADDING + 28, search_y + 28), search_label, font=load_font(32), fill=search_color)

    y = search_y + SEARCH_H + PADDING
    for item in items:
        if y + CARD_H > HEIGHT - PADDING:
            break
        draw_card(
            draw,
            y,
            item["name"],
            item["identifier"],
            item["phone"],
            bg=card_bg,
            border=card_border,
            text=text,
            muted=muted,
        )
        y += CARD_H + CARD_GAP

    return img


def make_feature_graphic() -> Image.Image:
    width, height = 1024, 500
    img = Image.new("RGB", (width, height), "#007aff")
    draw = ImageDraw.Draw(img)

    icon = Image.open(ICON_PATH).convert("RGBA")
    icon_size = 220
    icon = icon.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    img.paste(icon, (72, (height - icon_size) // 2), icon)

    title_font = load_font(64, bold=True)
    subtitle_font = load_font(30)
    draw.text((340, 170), "AWIS Phonebook", font=title_font, fill="#ffffff")
    draw.text(
        (340, 260),
        "Australian aerodrome weather phone numbers — offline",
        font=subtitle_font,
        fill="#dbeafe",
    )
    return img


def make_icon() -> Image.Image:
    icon = Image.open(ICON_PATH).convert("RGBA")
    return icon.resize((512, 512), Image.Resampling.LANCZOS)


def main() -> None:
    data = aerodromes()
    phone_dir = OUT_DIR / "phoneScreenshots"
    phone_dir.mkdir(parents=True, exist_ok=True)

    screens = [
        ("01_browse.png", "", data[:8], False),
        ("02_search_sydney.png", "Sydney", [item for item in data if "sydney" in item["name"].lower()][:6], False),
        ("03_search_melbourne_dark.png", "Melbourne", [item for item in data if "melbourne" in item["name"].lower()][:6], True),
    ]

    for filename, query, items, dark in screens:
        if not items and query:
            items = data[:6]
        draw_screen(query=query, items=items, dark=dark).save(phone_dir / filename, optimize=True)

    make_feature_graphic().save(OUT_DIR / "featureGraphic.png", optimize=True)
    make_icon().save(OUT_DIR / "icon.png", optimize=True)
    print(f"Wrote Play listing images to {OUT_DIR}")


if __name__ == "__main__":
    main()
