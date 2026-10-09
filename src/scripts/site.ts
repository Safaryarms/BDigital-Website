// Kleine interacties: mobiel menu, case-drawer, scroll-tellers en tekenende lijnen.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Mobiel menu ---------- */
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('mobiel-menu');
function setMenu(open: boolean) {
  if (!toggle || !menu) return;
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
}
toggle?.addEventListener('click', () => setMenu(menu?.hidden ?? false));
document.querySelectorAll('[data-menu-close]').forEach((a) => a.addEventListener('click', () => setMenu(false)));
window.matchMedia('(min-width: 1020px)').addEventListener('change', (e) => e.matches && setMenu(false));

/* ---------- Case-drawer ---------- */
const drawer = document.querySelector<HTMLElement>('[data-case-drawer]');
let lastTrigger: HTMLElement | null = null;
function openCase(i: string, trigger: HTMLElement) {
  if (!drawer) return;
  const panel = drawer.querySelector<HTMLElement>(`[data-case-panel="${i}"]`);
  if (!panel) return;
  lastTrigger = trigger;
  drawer.hidden = false;
  panel.hidden = false;
  document.body.classList.add('no-scroll');
  panel.querySelector<HTMLElement>('[data-case-close]')?.focus();
}
function closeCase() {
  if (!drawer || drawer.hidden) return;
  drawer.hidden = true;
  drawer.querySelectorAll<HTMLElement>('[data-case-panel]').forEach((p) => (p.hidden = true));
  document.body.classList.remove('no-scroll');
  lastTrigger?.focus();
}
document.querySelectorAll<HTMLElement>('[data-case]').forEach((btn) =>
  btn.addEventListener('click', () => openCase(btn.dataset.case!, btn)),
);
drawer?.querySelectorAll('[data-case-close]').forEach((el) => el.addEventListener('click', closeCase));

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeCase();
  setMenu(false);
});

/* ---------- Scroll-tellers & tekenende lijnen ---------- */
function play(el: HTMLElement) {
  if (el.dataset.draw !== undefined) {
    const a = el.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
      duration: 900,
      delay: +(el.dataset.delay || 0),
      easing: 'cubic-bezier(.2,.7,.2,1)',
      fill: 'forwards',
    });
    a.onfinish = () => {
      el.style.transform = 'none';
      a.cancel();
    };
    return;
  }
  const target = parseFloat(el.dataset.count!);
  const dec = +(el.dataset.dec || 0);
  const pre = el.dataset.pre || '';
  const suf = el.dataset.suf || '';
  const final = el.textContent;
  const t0 = performance.now();
  const dur = 1400;
  const tick = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const v = target * (1 - Math.pow(1 - p, 3));
    el.textContent = p < 1 ? pre + v.toFixed(dec).replace('.', ',') + suf : final;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        play(e.target as HTMLElement);
      }),
    { threshold: 0.3 },
  );
  document.querySelectorAll<HTMLElement>('[data-count],[data-draw]').forEach((el) => {
    if (el.dataset.draw !== undefined) {
      el.style.transformOrigin = 'left center';
      el.style.transform = 'scaleX(0)';
    }
    io.observe(el);
  });
}
