// Effects that apply to every page: the intro, the text decode, borders
// tracing in on scroll, screenshot parallax, and the grid lighting up under
// the mouse. The sphere and the work panel have their own scripts.

import { onPage, reducedMotion, hasMouse, introPlaying, clamp } from './motion';

/* ---------- intro ---------- */

const INTRO_MS = 2600;

onPage(() => {
  if (!introPlaying()) return;
  const t = setTimeout(() => document.documentElement.classList.remove('intro'), INTRO_MS);
  return () => {
    clearTimeout(t);
    document.documentElement.classList.remove('intro');
  };
});

/* ---------- decode ---------- */

// Small monospace labels scramble through random characters, then settle.
const DECODE = [
  '.hero-side .mono',
  '.work-blank .mono',
  '.work-info .mono',
  '.project-head .mono',
  '.facts dt',
  '.shots figcaption',
  '.index-list .year',
  '.lost .mono',
].join(',');

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789/._-+';
const randomGlyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

function textNodes(el: Element) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) {
    const n = walker.currentNode as Text;
    if (n.data.trim()) nodes.push(n);
  }
  return nodes;
}

function decode(el: Element, delay = 0) {
  const nodes = textNodes(el).map((node) => {
    const text = node.data;
    // each character settles at its own moment, roughly left to right
    const settle = [...text].map((_, i) => (i / text.length) * 0.65 + Math.random() * 0.35);
    return { node, text, settle };
  });
  const length = nodes.reduce((sum, n) => sum + n.text.length, 0);
  const duration = clamp(400 + length * 14, 500, 1100);
  let start = 0;
  let timer = 0;

  const scramble = (progress: number) => {
    for (const { node, text, settle } of nodes) {
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += ch === ' ' || progress >= settle[i] ? ch : randomGlyph();
      }
      node.data = out;
    }
  };

  const restore = () => nodes.forEach(({ node, text }) => (node.data = text));

  const step = (now: number) => {
    if (!start) start = now;
    const progress = (now - start) / duration;
    if (progress >= 1) return restore();
    scramble(progress);
    timer = requestAnimationFrame(step);
  };

  scramble(0);
  const wait = setTimeout(() => (timer = requestAnimationFrame(step)), delay);

  return () => {
    clearTimeout(wait);
    cancelAnimationFrame(timer);
    restore();
  };
}

onPage(() => {
  if (reducedMotion()) return;
  const stops: (() => void)[] = [];

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        // during the intro, wait for the labels to fade in first
        stops.push(decode(e.target, introPlaying() ? 1000 : 0));
      }
    },
    { threshold: 0.5 },
  );
  document.querySelectorAll(DECODE).forEach((el) => io.observe(el));

  return () => {
    io.disconnect();
    stops.forEach((stop) => stop());
  };
});

/* ---------- borders draw in ---------- */

const OUTLINED = '.work-panel, .index-list, .facts, .shots, .writeup, .site-footer';

onPage(() => {
  if (reducedMotion()) return;
  const boxes = [...document.querySelectorAll(OUTLINED)];
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        e.target.classList.add('drawn');
      }
    },
    // fire once the top edge is a little way up the screen, however tall the box is
    { rootMargin: '0px 0px -12% 0px' },
  );
  boxes.forEach((box) => {
    box.classList.add('draw');
    io.observe(box);
  });
  return () => io.disconnect();
});

/* ---------- screenshot parallax ---------- */

// The image sits slightly oversized in its frame and drifts as the frame
// scrolls through the viewport.
onPage(() => {
  if (reducedMotion()) return;
  const frames = [...document.querySelectorAll<HTMLElement>('.shot-frame')];
  if (!frames.length) return;

  let queued = false;
  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    for (const frame of frames) {
      const r = frame.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      // -1 when the frame is entering at the bottom, 1 when leaving at the top
      const t = clamp((vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2), -1, 1);
      frame.style.setProperty('--drift', `${(t * 14).toFixed(1)}px`);
    }
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
});

/* ---------- grid glow ---------- */

// The glow layer persists across page changes, so this is set up once.
const glow = document.querySelector<HTMLElement>('.lattice-glow');
if (glow && hasMouse() && !reducedMotion()) {
  let x = 0;
  let y = 0;
  let queued = false;
  const paint = () => {
    queued = false;
    glow.style.setProperty('--mx', `${x}px`);
    glow.style.setProperty('--my', `${y}px`);
  };
  window.addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      glow.classList.add('on');
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => glow.classList.remove('on'));
}
