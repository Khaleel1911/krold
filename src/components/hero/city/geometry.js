// Isometric (2:1) projection for the hero city.
// Grid coordinates (gx, gy) sit on the ground plate; z is height in SVG px.
// Colours come from CSS custom properties (see `.krold-city` in index.css) so the
// whole scene re-themes for dark mode without re-rendering.

export const U = 26
export const OX = 380
export const OY = 175
export const GRID = 13
export const VIEW_W = 760
export const VIEW_H = 560

export const iso = (gx, gy, z = 0) => [OX + (gx - gy) * U, OY + ((gx + gy) * U) / 2 - z]

export const pts = (list) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

export const toneOf = (tone) => ({
  top: `var(--city-${tone}-top)`,
  left: `var(--city-${tone}-left)`,
  right: `var(--city-${tone}-right)`,
})
