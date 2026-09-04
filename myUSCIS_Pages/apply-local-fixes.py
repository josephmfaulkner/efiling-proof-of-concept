#!/usr/bin/env python3
"""
apply-local-fixes.py  —  make the saved myUSCIS form pages render offline.

For every "USCIS - <form>*.html" under each form directory (I-130/, N-400/, …)
this script:

  1. Neutralises the React/Webpack SPA entry chunks (runtime-*, 2288-*,
     index-*). Run from disk their API/session calls fail, React throws while
     hydrating and unmounts, and the captured markup inside <div id="root">
     is wiped — that's why the pages currently show only a bare header/footer.
     Turning the chunks into inert <script type="text/plain"> keeps the
     server-rendered snapshot on screen.

  2. Injects local-fixes.css (inline, as <style id="local-render-fixes">)
     right before </head>. The app styles its UI with MUI + Emotion +
     tss-react, which inject CSS at runtime into <style data-emotion> tags
     that "Save Page As" serialises empty. local-fixes.css rebuilds that lost
     component layer (grid, inputs, labels, sidebar accordion, icons, radios).

The script is idempotent: re-running it refreshes the injected <style> and
leaves already-disabled chunks alone.
"""
from __future__ import annotations
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent
CSS_FILE = ROOT / "local-fixes.css"
# form directories whose saved "USCIS - *.html" pages get the offline fixes
PAGES_DIRS = [ROOT / "I-130", ROOT / "N-400"]

# the <script src> for a Webpack chunk — `(?<![-\w])` so we never match the
# `src=` inside an already-rewritten `data-local-disabled-src=`
# runtime-*, index-*, and any numbered Webpack vendor chunk (2288-*, 1424-*, …);
# `application-*.js` is intentionally left enabled. `(?<![-\w])` so we never match
# the `src=` inside an already-rewritten `data-local-disabled-src=`
CHUNK_SRC_RE = re.compile(
    r'(?<![-\w])src="(\.[^"]*?/(?:runtime-[0-9a-f]+|[0-9]+-[0-9a-f]+|index-[0-9a-f]+)\.js)"'
)
STYLE_BLOCK_RE = re.compile(
    r'[ \t]*<style id="local-render-fixes">.*?</style>\n?', re.S
)


def transform(html: str, css: str) -> tuple[str, int, bool]:
    # 1. disable SPA entry chunks (idempotent — already-disabled tags no
    #    longer carry a bare src="…" so they won't re-match)
    new_html, n_disabled = CHUNK_SRC_RE.subn(
        r'type="text/plain" data-local-disabled-src="\1"', html
    )

    # 2. (re)inject the fix stylesheet just before </head>
    new_html = STYLE_BLOCK_RE.sub("", new_html)
    style_block = '<style id="local-render-fixes">\n' + css + "\n</style>\n"
    lower = new_html.lower()
    idx = lower.rfind("</head>")
    injected = False
    if idx != -1:
        new_html = new_html[:idx] + style_block + new_html[idx:]
        injected = True

    return new_html, n_disabled, injected


def main(argv: list[str]) -> int:
    if not CSS_FILE.is_file():
        print(f"error: {CSS_FILE} not found", file=sys.stderr)
        return 1
    css = CSS_FILE.read_text(encoding="utf-8")

    targets = [p for p in argv[1:]]
    if not targets:
        for d in PAGES_DIRS:
            targets.extend(str(p) for p in d.glob("*/USCIS - *.html"))
        targets.sort()
    if not targets:
        print("no HTML pages found", file=sys.stderr)
        return 1

    total = 0
    for path in targets:
        p = pathlib.Path(path)
        html = p.read_text(encoding="utf-8")
        new_html, n_disabled, injected = transform(html, css)
        if new_html != html:
            p.write_text(new_html, encoding="utf-8")
        total += 1
        rel = p.relative_to(ROOT) if ROOT in p.parents else p
        print(f"  chunks_off={n_disabled}  css={'yes' if injected else 'NO'}  {rel}")
    print(f"done: {total} page(s) processed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
