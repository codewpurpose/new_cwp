#!/usr/bin/env python3
"""Rebrand copied ML lesson static assets from MLU to CodeWithPurpose."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public" / "learn" / "ml"

CWP_LOGO_SVG = (
    '<svg class="cwp-lesson-logo" width="46" height="32" viewBox="0 0 46 32" '
    'fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" '
    'stroke-linejoin="round" aria-hidden="true">'
    '<path d="M10 7 2.5 16 10 25"/>'
    '<path d="M36 7l7.5 9L36 25"/>'
    '<path d="M23 24.5s-7-4.3-7-9.3c0-2.7 2-4.4 4.1-4.4 1.2 0 2.3.6 2.9 1.6.6-1 1.7-1.6 2.9-1.6 '
    '2.1 0 4.1 1.7 4.1 4.4 0 5-7 9.3-7 9.3Z" stroke-width="1.8"/></svg>'
)

CWP_BRAND_NAME = '<h2 class="logo cwp-brand-name">CodeWithPurpose</h2>'

CHROME_LINK = '<link rel="stylesheet" href="/learn/ml/assets/cwp-chrome.css" />'

CHROME_SCRIPT = (
    '<script defer src="/learn/ml/assets/cwp-lesson-chrome.js"></script>'
)

TEXT_REPLACEMENTS = [
    ("MLU-EXPL<span id=\"ai\">AI</span>N", "CodeWithPurpose"),
    ("MLU-EXPL<span id='ai'>AI</span>N", "CodeWithPurpose"),
    ('MLU-EXPL<span id="ai" class="svelte-2pipsy">AI</span>N', "CodeWithPurpose"),
    ("MLU-expl<span id=\"ai\">AI</span>n", "CodeWithPurpose"),
    ("MLU-expl<span id='ai'>AI</span>n", "CodeWithPurpose"),
    ('MLU-expl<span id="ai" class="svelte-2pipsy">AI</span>n', "CodeWithPurpose"),
    ("MLU-EXPLAIN", "CodeWithPurpose"),
    ("MLU-Explain", "CodeWithPurpose"),
    ("MLU-explAIn", "CodeWithPurpose"),
    ("mlu-explain", "codewithpurpose"),
    ("MLU-Explain article", "CodeWithPurpose lesson"),
    ("MLU-Explain articles", "CodeWithPurpose lessons"),
    ("more MLU-Explain articles", "more CodeWithPurpose lessons"),
    ("Stay tuned for more MLU-Explain articles", "Stay tuned for more CodeWithPurpose lessons"),
    ("Machine Learning University (MLU)", "CodeWithPurpose"),
    ("Machine Learning University (<span id=\"mlu-acronym\">MLU</span>)", "CodeWithPurpose"),
    ("<span class=\"havy\">MLU-Explain</span>", "CodeWithPurpose"),
    ("MLU-Explain:", "CodeWithPurpose:"),
    ("MLU-Explain exists", "CodeWithPurpose exists"),
    ("og:site_name\" content=\"MLU-Explain\"", 'og:site_name" content="CodeWithPurpose"'),
    ("https://aws.amazon.com/machine-learning/mlu/", "/learn/ml/"),
    ("https://aws.amazon.com/machine-learning/mlu", "/learn/ml"),
    ("https://aws.amazon.com/machine-learning/", "/learn/ml/"),
    ("https://aws.amazon.com/machine-learning", "/learn/ml"),
    ("https://mlu-explain.github.io/", "/learn/ml/"),
    ("https://mlu-explain.github.io", "/learn/ml"),
    ("https://github.com/aws-samples/aws-mlu-explain", "/learn/ml/"),
    ("mlu_robot.5a492771.png", "/icon.svg"),
    ("assets/mlu_robot.png", "/icon.svg"),
    ('content="MLU-Explain"', 'content="CodeWithPurpose"'),
    ("id=\"mlu_robot 1\"", 'id="cwp_logo"'),
    ("id='mlu_robot 1'", "id='cwp_logo'"),
    ("#ff8f00", "#3e7f5c"),
    ("#FF8F00", "#3e7f5c"),
    ("#08b7b7", "#397554"),
]

TRAIN_TEST_HEADER = re.compile(
    r"<span class=\"cardSpan\" onclick=\"location\.href='[^']*';\">\s*"
    r"<span class=\"icon\">\s*<object data=\"robot\.cb528be1\.svg\" type=\"image/svg\+xml\"></object>\s*"
    r"</span>\s*<span class=\"text\"><h2>MLU-EXPL<span id=\"ai\">AI</span>N</h2></span>\s*</span>",
    re.S,
)

TRAIN_TEST_HEADER_REPL = (
    '<span class="cardSpan" onclick="location.href=\'/learn/ml/\';">'
    f'<span class="icon">{CWP_LOGO_SVG}</span>'
    f'<span class="text">{CWP_BRAND_NAME}</span></span>'
)

INTRO_ICON_BLOCK = re.compile(
    r"<div id=\"intro-icon\">\s*<a href=\"[^\"]*\">.*?</a>\s*</div>",
    re.S,
)

INTRO_ICON_SPLIT = re.compile(
    r"<div id=\"intro-icon\">\s*<a href=\"[^\"]*\">\s*"
    r"<svg width=\"50\" height=\"50\" viewBox=\"0 0 234 216\".*?</svg>\s*</a>\s*"
    r"<h2 class=\"logo\"[^>]*>.*?</h2>\s*</div>",
    re.S,
)

ROBOT_SVG = re.compile(
    r"<svg width=\"50\" height=\"50\" viewBox=\"0 0 234 216\".*?</svg>",
    re.S,
)

INTRO_ICON_REPL = (
    f'<div id="intro-icon"><a href="/learn/ml/" class="cwp-lesson-brand">'
    f"{CWP_LOGO_SVG}{CWP_BRAND_NAME}</a></div>"
)


def apply_text_replacements(text: str) -> str:
    for old, new in TEXT_REPLACEMENTS:
        text = text.replace(old, new)
    return text


def inject_chrome_css(html: str) -> str:
    if "cwp-chrome.css" in html:
        return html
    if "</head>" in html:
        return html.replace("</head>", f"  {CHROME_LINK}\n</head>", 1)
    return html


def inject_chrome_script(html: str) -> str:
    if "cwp-lesson-chrome.js" in html:
        return html
    marker = CHROME_LINK
    if marker in html:
        return html.replace(marker, f"{marker}\n  {CHROME_SCRIPT}", 1)
    if "</head>" in html:
        return html.replace("</head>", f"  {CHROME_SCRIPT}\n</head>", 1)
    return html


def process_html(path: Path) -> bool:
    original = path.read_text(encoding="utf-8", errors="ignore")
    text = original
    text = TRAIN_TEST_HEADER.sub(TRAIN_TEST_HEADER_REPL, text)
    text = INTRO_ICON_SPLIT.sub(INTRO_ICON_REPL, text)
    text = INTRO_ICON_BLOCK.sub(INTRO_ICON_REPL, text)
    text = ROBOT_SVG.sub(CWP_LOGO_SVG, text)
    text = apply_text_replacements(text)
    text = inject_chrome_css(text)
    text = inject_chrome_script(text)
    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def process_text_file(path: Path) -> bool:
    original = path.read_text(encoding="utf-8", errors="ignore")
    text = apply_text_replacements(original)
    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed: list[str] = []
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix == ".html":
            if process_html(path):
                changed.append(str(path.relative_to(ROOT)))
        elif path.suffix in {".css", ".js"}:
            if process_text_file(path):
                changed.append(str(path.relative_to(ROOT)))

    print(f"Updated {len(changed)} files")
    for item in changed:
        print(f"  - {item}")


if __name__ == "__main__":
    main()
