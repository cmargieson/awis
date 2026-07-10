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
STATUS_H = 56
HEADER_H = 128
CAPTION_H = 112
SEARCH_H = 96
PADDING = 48
CARD_H = 136
CARD_GAP = 18


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


def truncate(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont, max_width: float) -> str:
    if draw.textlength(text, font=font) <= max_width:
        return text
    trimmed = text
    while trimmed and draw.textlength(f"{trimmed}…", font=font) > max_width:
        trimmed = trimmed[:-1]
    return f"{trimmed}…" if trimmed else text


def draw_status_bar(draw: ImageDraw.ImageDraw, *, dark: bool) -> None:
    bg = "#000000" if dark else "#f2f2f7"
    fg = "#ffffff" if dark else "#111111"
    draw.rectangle((0, 0, WIDTH, STATUS_H), fill=bg)
    draw.text((PADDING, 14), "9:41", font=load_font(24, bold=True), fill=fg)
    right = "5G  100%"
    right_w = draw.textlength(right, font=load_font(22))
    draw.text((WIDTH - PADDING - right_w, 16), right, font=load_font(22), fill=fg)


def draw_caption(draw: ImageDraw.ImageDraw, text: str, *, accent: str) -> None:
    y0 = HEIGHT - CAPTION_H
    draw.rectangle((0, y0, WIDTH, HEIGHT), fill=accent)
    font = load_font(30, bold=True)
    wrapped = text
    text_w = draw.textlength(wrapped, font=font)
    if text_w > WIDTH - 64:
        font = load_font(26, bold=True)
        text_w = draw.textlength(wrapped, font=font)
    draw.text(((WIDTH - text_w) / 2, y0 + 38), wrapped, font=font, fill="#ffffff")


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
    accent: str,
    highlight: bool = False,
) -> None:
    x0 = PADDING
    x1 = WIDTH - PADDING
    card_border = accent if highlight else border
    draw.rounded_rectangle((x0, y, x1, y + CARD_H), radius=24, fill=bg, outline=card_border, width=3 if highlight else 2)

    name_font = load_font(34, bold=True)
    max_name_w = x1 - x0 - 56
    draw.text((x0 + 28, y + 20), truncate(draw, name, name_font, max_name_w), font=name_font, fill=text)
    draw.text((x0 + 28, y + 74), identifier, font=load_font(28, bold=True), fill=accent if highlight else muted)

    phone_font = load_font(28)
    phone_w = draw.textlength(phone, font=phone_font)
    draw.text((x1 - 28 - phone_w, y + 74), phone, font=phone_font, fill=muted)

    if highlight:
        callout = "Tap to call"
        callout_font = load_font(22, bold=True)
        callout_w = draw.textlength(callout, font=callout_font)
        draw.rounded_rectangle(
            (x1 - 34 - callout_w - 20, y + 18, x1 - 34, y + 52),
            radius=14,
            fill=accent,
        )
        draw.text((x1 - 34 - callout_w - 10, y + 24), callout, font=callout_font, fill="#ffffff")


def draw_screen(
    *,
    query: str,
    items: list[dict[str, str]],
    caption: str,
    dark: bool = False,
    highlight_first: bool = False,
) -> Image.Image:
    if dark:
        canvas = "#000000"
        header = "#0a84ff"
        header_text = "#ffffff"
        search_bg = "#1c1c1e"
        search_border = "#3a3a3c"
        search_text = "#ffffff"
        placeholder = "#8e8e93"
        card_bg = "#1c1c1e"
        card_border = "#3a3a3c"
        text = "#ffffff"
        muted = "#aeaeb2"
        accent = "#0a84ff"
    else:
        canvas = "#f2f2f7"
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
        accent = "#007aff"

    content_bottom = HEIGHT - CAPTION_H
    img = Image.new("RGB", (WIDTH, HEIGHT), canvas)
    draw = ImageDraw.Draw(img)

    draw_status_bar(draw, dark=dark)
    draw.rectangle((0, STATUS_H, WIDTH, STATUS_H + HEADER_H), fill=header)
    title = "AWIS Phonebook"
    title_font = load_font(38, bold=True)
    title_w = draw.textlength(title, font=title_font)
    draw.text(((WIDTH - title_w) / 2, STATUS_H + 42), title, font=title_font, fill=header_text)

    search_y = STATUS_H + HEADER_H + PADDING
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
    for index, item in enumerate(items):
        if y + CARD_H > content_bottom - PADDING:
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
            accent=accent,
            highlight=highlight_first and index == 0,
        )
        y += CARD_H + CARD_GAP

    draw_caption(draw, caption, accent=header if not dark else accent)
    return img


def vertical_gradient(size: tuple[int, int], top: str, bottom: str) -> Image.Image:
    width, height = size
    top_rgb = tuple(int(top[i : i + 2], 16) for i in (1, 3, 5))
    bottom_rgb = tuple(int(bottom[i : i + 2], 16) for i in (1, 3, 5))
    img = Image.new("RGB", size)
    pixels = img.load()
    for y in range(height):
        ratio = y / max(height - 1, 1)
        color = tuple(int(top_rgb[i] + (bottom_rgb[i] - top_rgb[i]) * ratio) for i in range(3))
        for x in range(width):
            pixels[x, y] = color
    return img


def make_feature_graphic() -> Image.Image:
    width, height = 1024, 500
    img = vertical_gradient((width, height), "#004999", "#0a84ff")
    draw = ImageDraw.Draw(img)

    icon = Image.open(ICON_PATH).convert("RGBA")
    icon_size = 200
    icon = icon.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
    icon_bg = Image.new("RGBA", (icon_size + 32, icon_size + 32), (255, 255, 255, 36))
    icon_bg.paste(icon, (16, 16), icon)
    img.paste(icon_bg, (64, (height - icon_bg.size[1]) // 2), icon_bg)

    x_text = 320
    draw.text((x_text, 118), "AWIS Phonebook", font=load_font(58, bold=True), fill="#ffffff")
    draw.text(
        (x_text, 196),
        "Australian aerodrome weather phone numbers",
        font=load_font(28),
        fill="#e8f2ff",
    )
    draw.text(
        (x_text, 244),
        "Offline  •  Tap to call  •  No ads",
        font=load_font(26, bold=True),
        fill="#ffffff",
    )
    draw.text(
        (x_text, 310),
        "223 aerodromes  •  Search by name or ICAO",
        font=load_font(24),
        fill="#d7e9ff",
    )
    return img


def make_icon() -> Image.Image:
    icon = Image.open(ICON_PATH).convert("RGBA")
    canvas = Image.new("RGBA", (512, 512), (255, 255, 255, 255))
    icon = icon.resize((460, 460), Image.Resampling.LANCZOS)
    canvas.paste(icon, (26, 26), icon)
    return canvas


def filter_items(data: list[dict[str, str]], query: str) -> list[dict[str, str]]:
    needle = query.lower()
    return [
        item
        for item in data
        if needle in item["name"].lower() or needle in item["identifier"].lower()
    ]


def main() -> None:
    data = aerodromes()
    phone_dir = OUT_DIR / "phoneScreenshots"
    phone_dir.mkdir(parents=True, exist_ok=True)

    screens = [
        (
            "01_browse.png",
            "",
            data[:7],
            False,
            "223 aerodromes across Australia — no internet needed",
            False,
        ),
        (
            "02_search_name.png",
            "Sydney",
            filter_items(data, "Sydney")[:4],
            False,
            "Search by aerodrome name",
            True,
        ),
        (
            "03_search_icao.png",
            "YSSY",
            filter_items(data, "YSSY")[:3],
            False,
            "Or jump straight to the ICAO code",
            True,
        ),
        (
            "04_dark_mode.png",
            "",
            data[:7],
            True,
            "Comfortable in light or dark mode",
            False,
        ),
    ]

    for filename, query, items, dark, caption, highlight_first in screens:
        if not items and query:
            items = data[:6]
        draw_screen(
            query=query,
            items=items,
            caption=caption,
            dark=dark,
            highlight_first=highlight_first,
        ).save(phone_dir / filename, optimize=True)

    for stale in ("02_search_sydney.png", "03_search_melbourne_dark.png"):
        stale_path = phone_dir / stale
        if stale_path.exists():
            stale_path.unlink()

    make_feature_graphic().save(OUT_DIR / "featureGraphic.png", optimize=True)
    make_icon().save(OUT_DIR / "icon.png", optimize=True)
    print(f"Wrote Play listing images to {OUT_DIR}")


if __name__ == "__main__":
    main()
