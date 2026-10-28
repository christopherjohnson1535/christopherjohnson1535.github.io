// Small helpers shared by the page scripts.
//
// With the client router, a script only runs once, on the first page load.
// `onPage` runs `setup` on every page (including the first) and calls the
// cleanup it returns right before the next page swaps in, so animation loops
// and listeners don't pile up as you click around.

type Cleanup = void | (() => void);

export function onPage(setup: () => Cleanup) {
  let cleanup: Cleanup;
  document.addEventListener('astro:page-load', () => {
    cleanup = setup();
  });
  document.addEventListener('astro:before-swap', () => {
    if (typeof cleanup === 'function') cleanup();
    cleanup = undefined;
  });
}

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
export const reducedMotion = () => reduce.matches;

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
export const hasMouse = () => finePointer.matches;

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// The intro plays on the first home page view of a visit. The head script in
// Base.astro decides and sets html.intro; this just reads it.
export const introPlaying = () => document.documentElement.classList.contains('intro');
