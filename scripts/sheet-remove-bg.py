#!/usr/bin/env python3
"""
Remove near-white / low-saturation background from a sprite sheet by flooding
from image edges (character + fire never touches the outer border as sheet bg).
"""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image


def is_background(r: int, g: int, b: int) -> bool:
    mx, mn = max(r, g, b), min(r, g, b)
    if mx < 236:
        return False
    if mx - mn > 30:
        return False
    return True


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    inp = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "pages/sprites/flame-runner.png"
    out = Path(sys.argv[2]) if len(sys.argv) > 2 else inp

    img = Image.open(inp).convert("RGBA")
    w, h = img.size
    px = img.load()

    reach = bytearray(w * h)

    def ixy(x: int, y: int) -> int:
        return y * w + x

    q: deque[tuple[int, int]] = deque()

    def try_seed(x: int, y: int) -> None:
        if x < 0 or x >= w or y < 0 or y >= h:
            return
        i = ixy(x, y)
        if reach[i]:
            return
        r, g, b, _ = px[x, y]
        if is_background(r, g, b):
            reach[i] = 1
            q.append((x, y))

    for x in range(w):
        try_seed(x, 0)
        try_seed(x, h - 1)
    for y in range(h):
        try_seed(0, y)
        try_seed(w - 1, y)

    while q:
        x, y = q.popleft()
        for dx, dy in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            nx, ny = x + dx, y + dy
            if nx < 0 or nx >= w or ny < 0 or ny >= h:
                continue
            i = ixy(nx, ny)
            if reach[i]:
                continue
            r, g, b, _ = px[nx, ny]
            if is_background(r, g, b):
                reach[i] = 1
                q.append((nx, ny))

    out_img = Image.new("RGBA", (w, h))
    opx = out_img.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if reach[ixy(x, y)]:
                opx[x, y] = (0, 0, 0, 0)
            else:
                opx[x, y] = (r, g, b, a)

    tmp = out.with_name(out.stem + "-tmp.png")
    out_img.save(tmp, optimize=True)
    tmp.replace(out)
    print(f"Wrote {out} ({w}x{h}), transparent pixels from edge flood.")


if __name__ == "__main__":
    main()
