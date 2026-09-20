/* FILM FRXMES — shared behaviour. No dependencies. */
(() => {
  'use strict';

  const doc = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };

  /* ---------- page transition: shutter ---------- */
  if (doc.classList.contains('shutter-closed')) {
    const open = () => requestAnimationFrame(() => requestAnimationFrame(() => doc.classList.remove('shutter-closed')));
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', open, { once: true }); else open();
    setTimeout(() => doc.classList.remove('shutter-closed'), 2500); // failsafe
  }

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || reduce) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download') || a.closest('.g-item')) return;
    let url;
    try { url = new URL(a.href, location.href); } catch (err) { return; }
    if (!/^(https?|file):$/.test(url.protocol) || url.origin !== location.origin) return;
    if (/\.(jpe?g|png|webp|gif|svg)$/i.test(url.pathname)) return;
    if (url.pathname === location.pathname && (url.hash || url.href === location.href)) return; // same-page anchor
    e.preventDefault();
    store.set('ffT', '1');
    doc.classList.add('is-leaving');
    setTimeout(() => { location.href = a.href; }, 440);
  });
  addEventListener('pageshow', (e) => { if (e.persisted) doc.classList.remove('is-leaving', 'shutter-closed'); });

  /* ---------- nav, progress, back-to-top ---------- */
  const nav = $('.nav');
  const bar = $('.progress');
  const toTop = $('.to-top');
  let lastY = scrollY, ticking = false;

  function onScroll() {
    ticking = false;
    const y = scrollY;
    const max = doc.scrollHeight - innerHeight;
    if (nav) {
      nav.classList.toggle('is-solid', y > 40);
      const dy = y - lastY;
      if (Math.abs(dy) > 6 && !doc.classList.contains('menu-open')) nav.classList.toggle('is-hidden', dy > 0 && y > 320);
    }
    if (bar && max > 0) bar.style.transform = `scaleX(${Math.min(1, y / max)})`;
    if (toTop) toTop.classList.toggle('show', y > 800);
    lastY = y;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  /* ---------- mobile menu ---------- */
  const burger = $('.burger');
  const menu = $('#menu');
  function setMenu(open) {
    doc.classList.toggle('menu-open', open);
    if (nav && open) nav.classList.remove('is-hidden');
    if (burger) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }
  if (burger && menu) {
    burger.addEventListener('click', () => setMenu(!doc.classList.contains('menu-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a[href^="#"], a[href*="#"]')) setMenu(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && doc.classList.contains('menu-open')) { setMenu(false); burger.focus(); } });
    matchMedia('(min-width: 901px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });
  }

  /* ---------- rack-focus reveal ---------- */
  function startReveal() {
    const targets = $$('[data-focus]');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window) || reduce) { targets.forEach((t) => t.removeAttribute('data-focus')); return; }
    const io = new IntersectionObserver((entries) => {
      let n = 0;
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        el.style.setProperty('--d', Math.min(n++, 6) * 70 + 'ms');
        el.classList.add('is-in');
        // once settled, release the compositing layer
        setTimeout(() => { el.removeAttribute('data-focus'); el.classList.remove('is-in'); el.style.removeProperty('--d'); }, 2400);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((t) => io.observe(t));
  }
  if (doc.classList.contains('shutter-closed')) setTimeout(startReveal, 430); else startReveal();

  /* ---------- count-up stats ---------- */
  $$('[data-count]').forEach((el) => {
    if (reduce || !('IntersectionObserver' in window)) return;
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    el.textContent = '0' + suffix;
    new IntersectionObserver((entries, o) => {
      if (!entries[0].isIntersecting) return;
      o.disconnect();
      const t0 = performance.now(), dur = 1500;
      (function step(t) {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }, { threshold: 0.6 }).observe(el);
  });

  /* ---------- copy email ---------- */
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    requestAnimationFrame(() => toastEl.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const text = b.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e2) { /* ignore */ }
      ta.remove();
    }
    toast('Email copied');
  }));

  /* ---------- gallery: thumbnail fallback + lightbox ---------- */
  const items = $$('a.g-item');
  items.forEach((a) => {
    const img = $('img', a);
    if (!img) return;
    const fallback = () => { if (img.getAttribute('src') !== a.getAttribute('href')) img.src = a.getAttribute('href'); };
    img.addEventListener('error', fallback, { once: true });
    if (img.complete && img.naturalWidth === 0) fallback();
  });

  if (items.length && typeof HTMLDialogElement === 'function') {
    const ICON = {
      x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"><path d="M5 5l14 14M19 5L5 19"/></svg>',
      l: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"><path d="M15 4l-8 8 8 8"/></svg>',
      r: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"><path d="M9 4l8 8-8 8"/></svg>',
    };
    const lb = document.createElement('dialog');
    lb.className = 'lb';
    lb.setAttribute('aria-label', 'Photo viewer');
    lb.innerHTML =
      `<div class="lb-top"><p class="lb-count" aria-live="polite"></p><button class="lb-x" type="button" aria-label="Close viewer">${ICON.x}</button></div>` +
      `<div class="lb-stage"><button class="lb-nav lb-prev" type="button" aria-label="Previous photo">${ICON.l}</button><img alt="" decoding="async"><button class="lb-nav lb-next" type="button" aria-label="Next photo">${ICON.r}</button></div>` +
      '<p class="lb-cap"></p>';
    document.body.appendChild(lb);

    const img = $('.lb-stage img', lb);
    const stage = $('.lb-stage', lb);
    const count = $('.lb-count', lb);
    const cap = $('.lb-cap', lb);
    const pad = (n) => String(n).padStart(2, '0');
    let idx = 0, token = 0, opener = null;

    function show(i) {
      idx = (i + items.length) % items.length;
      const a = items[idx];
      const my = ++token;
      img.classList.remove('is-sharp');
      img.alt = ($('img', a) || {}).alt || a.dataset.cap || '';
      count.innerHTML = `${pad(idx + 1)} <span>/ ${pad(items.length)}</span>`;
      cap.textContent = a.dataset.cap || '';
      img.src = a.getAttribute('href');
      const sharp = () => { if (my === token) requestAnimationFrame(() => img.classList.add('is-sharp')); };
      if (img.decode) img.decode().then(sharp, sharp); else img.onload = sharp;
      [idx + 1, idx - 1].forEach((j) => { new Image().src = items[(j + items.length) % items.length].getAttribute('href'); });
    }
    function open(i, from) {
      opener = from;
      show(i);
      lb.showModal();
      doc.classList.add('lb-open');
      doc.style.overflow = 'hidden';
      $('.lb-x', lb).focus({ preventScroll: true });
    }
    function close() {
      if (!lb.open || lb.classList.contains('is-closing')) return;
      if (reduce) { lb.close(); return; }
      lb.classList.add('is-closing');
      setTimeout(() => { lb.close(); lb.classList.remove('is-closing'); }, 220);
    }
    lb.addEventListener('close', () => {
      doc.classList.remove('lb-open');
      doc.style.overflow = '';
      if (opener) opener.focus({ preventScroll: true });
    });
    lb.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target === stage || e.target.classList.contains('lb-top') || e.target.classList.contains('lb-cap')) close(); });
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
    $('.lb-x', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', () => show(idx - 1));
    $('.lb-next', lb).addEventListener('click', () => show(idx + 1));

    let sx = null;
    stage.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') sx = e.clientX; });
    stage.addEventListener('pointerup', (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    });
    stage.addEventListener('pointercancel', () => { sx = null; });

    items.forEach((a, i) => a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      open(i, a);
    }));
  }
})();
