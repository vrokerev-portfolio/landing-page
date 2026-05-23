# Optimization and visual update notes

## Previous optimization pass
- Mobile now uses native scroll instead of Lenis to reduce scroll jank on canvas-heavy sections.
- Hero and Skills canvas animations were reduced on mobile, FPS-limited, DPR-limited, and paused outside the viewport.
- The old section 03 was removed and the remaining sections were renumbered.
- Section accent colors now transition in the requested order.
- VS Code-style project tabs and scrollbars were restyled to match the dark/neon UI.
- Project `.md` files in the sidebar were indented further to make the hierarchy clearer.

## This update
- Added the new portrait image at `public/images/yo-portafolio.png`.
- Placed the portrait in the About area instead of the Hero terminal so the first impression stays clean and the About block feels less flat.
- Redesigned the About section with:
  - A glass/profile visual panel.
  - A subtle grid background.
  - Soft orbit rings.
  - Floating metadata chips.
  - A scanline effect inside `about.md`.
  - Updated stat cards.
- Reworked Professional Experience so it reads like actual experience rather than duplicating the Projects section.
- Replaced the old glow-card implementation with a thinner animated halo border that travels around the perimeter and inherits each card's own dot/accent color.
- Removed the requestAnimationFrame fallback inside `BorderGlowCard` to avoid adding extra JS work per card.

## Validation note
I attempted to run `npm ci` and `npm run build` in the sandbox, but dependency installation stalled and left empty package folders. The code changes were checked statically, but the full Vite build should be validated locally with:

```bash
npm install
npm run build
npm run dev
```
