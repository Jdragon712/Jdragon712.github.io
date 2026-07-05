#!/usr/bin/env python3
"""Capture study guide screenshots via Playwright (local servers must be running)."""
from __future__ import annotations

import sys
from pathlib import Path

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    print("playwright not installed", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)

SHOTS = [
    ("map-overview.png", "http://127.0.0.1:5173/", 1400, 900, 2500),
    ("map-drawer.png", "http://127.0.0.1:5173/", 1400, 900, 3500),
    ("study-toc.png", "http://127.0.0.1:5180/study/", 1200, 900, 1500),
    ("lecture-slide.png", "http://127.0.0.1:5180/", 1200, 900, 1500),
    ("pipeline-terminal.png", "http://127.0.0.1:5180/study/diagrams/pipeline-flow.html", 1100, 700, 800),
]


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for name, url, w, h, wait_ms in SHOTS:
            page = browser.new_page(viewport={"width": w, "height": h})
            try:
                page.goto(url, wait_until="networkidle", timeout=60000)
                page.wait_for_timeout(wait_ms)
                if "map-drawer" in name:
                    page.evaluate(
                        """() => {
                          const m = document.querySelector('.leaflet-marker-icon, [class*="customoverlay"]');
                          if (m) m.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                        }"""
                    )
                    page.wait_for_timeout(1200)
                dest = OUT / name
                page.screenshot(path=str(dest), full_page=False)
                print(f"ok {dest}")
            except Exception as exc:
                print(f"skip {name}: {exc}", file=sys.stderr)
            finally:
                page.close()
        browser.close()


if __name__ == "__main__":
    main()