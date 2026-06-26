# Swan's 400-Day Birthday Gift — Project Brief for Claude Code

## What this is
A romantic interactive single-page website, a birthday + graduation gift for "Swan."
Built originally as a Claude.ai Artifact, now split into a normal web project so Claude Code
can extend it properly with git, a dev server, and multi-file editing.

## Current structure
```
swan-project/
├── index.html       — main page, all 9 sections, currently a linear scroll
├── css/styles.css    — full styling (dark gold/black theme + navy "academic" phase)
├── js/script.js       — gate unlock logic, scroll reveals, generative ambient audio (Tone.js)
└── images/
    ├── childhood.jpg  — her as a kid at a birthday party
    ├── boat.jpg       — a boat ride together
    ├── kiss.jpg       — a quiet kiss in an elevator
    ├── mirror.jpg     — mirror selfie, shopping trip
    └── night.jpg      — a night out, winter sweaters
```

## Current sections (in scroll order)
1. **Gate** — entry password screen, code `29-06` (her birthday DD-MM), balloon theme
2. **Hero** — LIVE day counter (computed in JS from `RELATIONSHIP_START = 2025-05-16`, increments
   automatically every day — see `getDaysTogether()` in script.js). No longer asks her to leave
   for YouTube here.
3. **Childhood** — the old photo, "Before I knew you"
4. **Wish** — blow-out-the-candle interaction + private wish textarea
5. **Timeline** — now 6 story moments (first meeting at the mall, sea nights, boat ride, movie
   theater hand-holding, "becoming a better man" reflection, looking-forward-to-her-future,
   today/her growth)
6. **License/Graduation** — certificate-style honor card for her psychology license, background
   shifts from warm gold to a navy "academic" palette here
7. **Gallery** — 4 real photos (boat, kiss, mirror, night) in a 2x2 grid — MORE PHOTOS PENDING,
   he intends to add additional ones
8. **Reasons** — now 7 "why I love you" cards (added one about becoming a better person because
   of her)
9. **Letter** — typewriter-animated closing letter, now includes a wish for her podcast's success
   next year; signature changed to "To always loving you"
10. **Final** — "401", new closing line about discovering next chapters together with love and
    excitement; the song button (now titled "This song sings my heart") moved here as the very
    last element, no longer gates the rest of the page

## Note on the day counter
`RELATIONSHIP_START` is hardcoded as `2025-05-16` in `js/script.js` (`getDaysTogether()`).
This was back-calculated from "400 days as of June 20, 2026." If that's off by a day or two
once he confirms the exact date, just adjust that one constant — both the hero number
(`#dayCounter`) and the timeline heading number (`#dayCounterTimeline`) read from it
automatically, no other text needs to change.

## THE TASK: merge in a second reference concept

He found a TikTok template (by `htm_creates`) with a different, stronger interaction model and
wants to merge its best ideas INTO this site — not replace it. Keep all current content
(photos, the 400-day story, the license/graduation honor, the gate code) but restructure
around these borrowed mechanics:

### 1. Hub-and-spoke navigation (biggest structural change)
Instead of one long linear scroll, make a **central home screen** after the gate with tappable
cards that branch into each section, then return home. Reference layout: a 2x2 (or 2x3) grid of
icon cards — e.g. 📷 Photos, 💌 Letter, 🎀 Wish, 🌹 Reasons, 📜 Our Story, 🎓 The License —
each opens its content as an overlay/sub-page with a "home" button to go back, rather than
requiring a scroll through everything in sequence.

### 2. Soft consent step before reveal
Reference pattern: "Hey beautiful, do you want to see your gift? [Yes please] [No thanks]"
Add a similar warm, low-pressure beat — could live right after the gate unlocks, before the
home screen, or as the transition into hero.

### 3. Mystery/teaser cards
Reference pattern: "Our Future Plans" with 3 flippable cards reading "One day... / You'll see...
/ Trust me..." — this fits naturally as a NEW small section using the "dreams we haven't lived
yet" material already implied in this project (travel goals, future together). Could be its own
home-screen card.

### 4. Quote bubbles scattered around a central image
Reference pattern: a bouquet image in the center, 4 short quote bubbles floating around it
("Every day with you feels like a blessing", "Your smile is my favorite place", etc).
Apply this same composition to the "Reasons" section — replace (or supplement) the current
plain card grid with quotes arranged around a central visual (could use the mirror.jpg or
a generated floral/balloon graphic, matching the existing gold/black palette, NOT pink).

### 5. Final name-gated surprise
Reference pattern: "One last surprise... type your name to unlock the final surprise."
Could gate the Letter or Final section this way instead of (or in addition to) the existing
flow — typing her name ("Swan" or "Ola") to unlock the closing letter.

### 6. In-page "Play Our Song" button
Reference pattern: a persistent small "Play Our Song" pill button. Current implementation
sends her OUT to YouTube before she can continue. Consider whether a button that's always
accessible (not blocking) fits better — open question, ask him.

## Design constraints — DO NOT change
- **Palette stays black/gold** (`--gold: #e8b923`, `--ink: #0a0a08`, etc. — see `:root` in
  styles.css). Do NOT adopt the pink/cream palette from the reference video — that's a
  different aesthetic, he explicitly wants to keep his current identity.
- **Fonts stay Cormorant Garamond (display) + Inter (body)** — already swapped from the
  original Arabic fonts.
- **Gate code stays `29-06`**.
- **All English** — site was fully translated from Arabic already, keep it that way unless he
  says otherwise.
- The **license/graduation honor section** and its gold→navy background transition is a
  signature feature he specifically requested — preserve it, don't let the hub-and-spoke
  refactor break that visual transition.
- **The Letter content is a placeholder** — he intends to write his own final version. Don't
  overwrite it with new copy; flag clearly where it goes if restructuring that section.

## Suggested approach
1. Set up git, make an initial commit of the current working state before touching anything
2. Build the new home-screen hub as the structural backbone first, get it navigating correctly
   to existing sections with no content changes — verify nothing breaks
3. Layer in the new interactive bits (consent step, mystery cards, quote-bubble reasons layout,
   name-gated letter) one at a time, with a checkpoint commit after each
4. Keep testing on a mobile viewport (390x844) throughout — this is a phone-first gift
5. Run a local dev server (`python3 -m http.server` or similar) to preview live

## Deadline context
This is a birthday gift — there's a hard deadline (her birthday). Prioritize a working,
polished version over perfect coverage of every reference idea if time runs short.
