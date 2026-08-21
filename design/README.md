# AERgO Design System — canvas

Working files for the AERgO design-system canvas (built with the `/design` skill).

## Files

- `Main.dc.html` — **Foundations** artboard (palette, type, radii, tokens)
- `Components.dc.html` — **Components** artboard (buttons, cards, tags, nav)
- `Patterns.dc.html` — **In context** artboard (the system on real layouts)
- `canvas.json` — artboard layout, positions, and launch view
- `hero.jpg`, `cardA.jpg`, `cardB.jpg` — imagery used in the artboards
- `aergo-design-system.html` — the **seeded, publishable canvas** (self-contained; open in a browser to view / export PNG–PDF)

Each `.dc.html` is one artboard. Google Sans Flex is embedded (base64 woff2) in each
so the specimens render in the real brand face. Values are lifted straight from the
live stylesheet: Runway `#314E67` · Sky `#37AEE4` · flat (no shadows) · 4 / 8 / 12 radii.

## Published canvas

https://claude.ai/code/artifact/f164a434-031c-490b-b60b-0001b0d44923

## Re-seeding

`aergo-design-system.html` is generated from the `.dc.html` sources + `canvas.json` via
the `/design` skill's `seed-canvas.mjs` helper. To change the design, edit the `.dc.html`
working files, re-seed a fresh copy, and republish to the same artifact URL.
