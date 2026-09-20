/* FILM FRXMES — home page: film-leader intro, rack-focus viewfinder hero, stacking project cards. */
(() => {
  'use strict';

  // Add / remove / reorder hero photos here. fx, fy = where the autofocus box should land (0–1 across the photo).
  const SLIDES = [
  {
    "src": "images/car3.jpeg",
    "w": 1024,
    "h": 1536,
    "cap": "McLaren Artura",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.5,
    "fy": 0.8
  },
  {
    "src": "images/lamakan.jpeg",
    "w": 1280,
    "h": 963,
    "cap": "Lamakan Streets",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.45,
    "fy": 0.55
  },
  {
    "src": "images/sankranti.jpeg",
    "w": 658,
    "h": 1040,
    "cap": "Sankranti Festival",
    "cat": "Events",
    "href": "events.html",
    "fx": 0.36,
    "fy": 0.72
  },
  {
    "src": "images/bike3.jpeg",
    "w": 960,
    "h": 1280,
    "cap": "Speed & Precision",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.5,
    "fy": 0.6
  },
  {
    "src": "images/spiti-valley.jpeg",
    "w": 963,
    "h": 1280,
    "cap": "Spiti Valley",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.66,
    "fy": 0.78
  },
  {
    "src": "portraits/lakeside-03.jpeg",
    "w": 1535,
    "h": 1024,
    "cap": "Lakeside",
    "cat": "Portraits",
    "href": "portraits.html",
    "fx": 0.5,
    "fy": 0.5
  },
  {
    "src": "images/car2.jpeg",
    "w": 1024,
    "h": 1536,
    "cap": "Precision Details",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.55,
    "fy": 0.78
  },
  {
    "src": "images/clouds.jpeg",
    "w": 1280,
    "h": 963,
    "cap": "Monsoon Sky",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.5,
    "fy": 0.5
  },
  {
    "src": "images/ganesh.jpeg",
    "w": 960,
    "h": 1280,
    "cap": "Ganesh Festival",
    "cat": "Events",
    "href": "events.html",
    "fx": 0.42,
    "fy": 0.28
  },
  {
    "src": "new-images/flower-market-child.jpeg",
    "w": 1114,
    "h": 1392,
    "cap": "Flower Market, Gudimalkapur",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.5,
    "fy": 0.74
  },
  {
    "src": "images/car1.jpeg",
    "w": 1024,
    "h": 1536,
    "cap": "Performance Engineering",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.5,
    "fy": 0.62
  },
  {
    "src": "images/hoppery.jpeg",
    "w": 1280,
    "h": 720,
    "cap": "Frames in Motion",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.4,
    "fy": 0.45
  },
  {
    "src": "images/sabarimala.jpeg",
    "w": 1040,
    "h": 1280,
    "cap": "Sabarimala Pilgrimage",
    "cat": "Events",
    "href": "events.html",
    "fx": 0.5,
    "fy": 0.45
  },
  {
    "src": "images/car6.jpeg",
    "w": 960,
    "h": 1280,
    "cap": "Supercar Lines",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.55,
    "fy": 0.7
  },
  {
    "src": "images/rain.jpeg",
    "w": 1200,
    "h": 1600,
    "cap": "Rain",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.5,
    "fy": 0.72
  },
  {
    "src": "Mahaveer/IMG_7360.JPG.jpeg",
    "w": 2400,
    "h": 1350,
    "cap": "Mahaveer Institute of Medical Sciences",
    "cat": "Events",
    "href": "events.html",
    "fx": 0.62,
    "fy": 0.3
  },
  {
    "src": "images/morning%20sun.jpeg",
    "w": 1280,
    "h": 963,
    "cap": "Morning Sun",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.55,
    "fy": 0.3
  },
  {
    "src": "images/pooja.jpeg",
    "w": 960,
    "h": 1280,
    "cap": "Sacred Rituals",
    "cat": "Events",
    "href": "events.html",
    "fx": 0.42,
    "fy": 0.68
  },
  {
    "src": "images/bike1.jpeg",
    "w": 960,
    "h": 1280,
    "cap": "Superbike Engineering",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.45,
    "fy": 0.4
  },
  {
    "src": "portraits/meadow-embrace.jpeg",
    "w": 1023,
    "h": 1537,
    "cap": "Lakeside",
    "cat": "Portraits",
    "href": "portraits.html",
    "fx": 0.5,
    "fy": 0.32
  },
  {
    "src": "images/waterfall.jpeg",
    "w": 1013,
    "h": 1350,
    "cap": "Waterfall",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.72,
    "fy": 0.5
  },
  {
    "src": "images/car.jpeg",
    "w": 1600,
    "h": 1501,
    "cap": "The Machine",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.5,
    "fy": 0.55
  },
  {
    "src": "images/god.jpeg",
    "w": 720,
    "h": 1280,
    "cap": "Devotion",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.5,
    "fy": 0.58
  },
  {
    "src": "images/car4.jpeg",
    "w": 1024,
    "h": 1536,
    "cap": "BMW M Series",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.5,
    "fy": 0.55
  },
  {
    "src": "images/football%20pitch.jpeg",
    "w": 768,
    "h": 1020,
    "cap": "The Pitch",
    "cat": "Street",
    "href": "street.html",
    "fx": 0.5,
    "fy": 0.4
  },
  {
    "src": "images/car5.jpeg",
    "w": 1024,
    "h": 1536,
    "cap": "RS Performance",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.5,
    "fy": 0.55
  },
  {
    "src": "images/bike2.jpeg",
    "w": 488,
    "h": 1046,
    "cap": "Track Ready Machine",
    "cat": "Automotive",
    "href": "automotive.html",
    "fx": 0.5,
    "fy": 0.5
  }
];

  const doc = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const pad = (n) => String(n).padStart(2, '0');
  const store = { set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } } };

  const hero = $('#top');
  const stage = $('#stage');
  const af = $('#af');
  const hud = $('#hud');
  const hudCap = $('#hudCap');
  const hudCat = $('#hudCat');
  const hudCount = $('#hudCount');
  const hudBar = $('#hudBar');
  const nav = $('.nav');
  const DURATION = 6800;
  const N = SLIDES.length;

  let cur = -1, started = false, heldByUser = reduce, heldAuto = false, busy = false;
  const els = [];

  /* ---------- slides ---------- */
  function build() {
    const first = stage.querySelector('.slide');
    SLIDES.forEach((s, i) => {
      let el = i === 0 && first ? first : null;
      if (!el) {
        el = document.createElement('div');
        el.className = 'slide';
        el.innerHTML = '<img class="bg" alt="" decoding="async"><div class="frame"><img class="sharp" decoding="async"></div>';
        stage.appendChild(el);
      }
      el.setAttribute('aria-hidden', 'true');
      el._bg = $('.bg', el);
      el._frame = $('.frame', el);
      el._sharp = $('.sharp', el);
      el._p = null;
      els.push(el);
    });
  }

  function load(i) {
    const el = els[i], s = SLIDES[i];
    if (el._p) return el._p;
    el._p = new Promise((res) => {
      const im = el._sharp;
      im.alt = `${s.cap}, ${s.cat.toLowerCase()} photograph`;
      const done = () => (im.decode ? im.decode().then(res, res) : res());
      if (im.getAttribute('src') === s.src && im.complete) return done();
      im.onload = done; im.onerror = () => res();
      im.src = s.src;
      el._bg.src = s.src;
    });
    return el._p;
  }

  /* Decide how each photo is presented: full-bleed if little is cropped, otherwise a sharp frame over its own blurred backdrop. */
  function layout(i) {
    const s = SLIDES[i], el = els[i], fr = el._frame, sh = el._sharp;
    const vw = stage.clientWidth, vh = stage.clientHeight;
    const scale = Math.max(vw / s.w, vh / s.h);
    const framed = (vw * vh) / (s.w * scale * s.h * scale) < 0.68;
    el.classList.toggle('is-framed', framed);

    if (!framed) {
      fr.style.cssText = '';
      sh.style.objectPosition = `${s.fx * 100}% ${s.fy * 100}%`;
      const dw = s.w * scale, dh = s.h * scale;
      el._af = { x: (vw - dw) * s.fx + s.fx * dw, y: (vh - dh) * s.fy + s.fy * dh };
      return;
    }
    const g = Math.min(56, Math.max(20, vw * 0.04));
    const navH = nav ? nav.offsetHeight : 70;
    const wide = vw >= 900;
    let x0, x1, y0, y1;
    if (wide) {
      x0 = vw * 0.47; x1 = vw - g; y0 = navH + 26; y1 = vh - 168;
    } else {
      const copyTop = $('.hero-copy').getBoundingClientRect().top - hero.getBoundingClientRect().top;
      x0 = g; x1 = vw - g; y0 = navH + 14; y1 = copyTop - 16;
    }
    const k = Math.min((x1 - x0) / s.w, (y1 - y0) / s.h, 1.15);
    const fw = s.w * k, fh = s.h * k;
    const left = x0 + (x1 - x0 - fw) / 2, top = y0 + (y1 - y0 - fh) / 2;
    fr.style.cssText = `inset:auto;left:${left.toFixed(1)}px;top:${top.toFixed(1)}px;width:${fw.toFixed(1)}px;height:${fh.toFixed(1)}px`;
    sh.style.objectPosition = '50% 50%';
    el._af = { x: left + s.fx * fw, y: top + s.fy * fh };
  }

  function restart(node, cls) { node.classList.remove(cls); void node.offsetWidth; node.classList.add(cls); }

  async function show(n) {
    if (busy) return;
    busy = true;
    const i = (n + N) % N, s = SLIDES[i];
    await Promise.race([load(i), sleep(3500)]);
    layout(i);
    const prev = els[cur];
    if (prev) { prev.classList.remove('is-active'); prev.setAttribute('aria-hidden', 'true'); }
    const el = els[i];
    el.classList.add('is-active');
    el.removeAttribute('aria-hidden');
    cur = i;

    hudCap.textContent = s.cap;
    hudCat.textContent = s.cat;
    hudCat.href = s.href;
    hudCount.innerHTML = `${pad(i + 1)} <span>/ ${pad(N)}</span>`;
    hudBar.style.setProperty('--dur', DURATION + 'ms');
    restart(hudBar, 'run');

    af.style.left = el._af.x.toFixed(1) + 'px';
    af.style.top = el._af.y.toFixed(1) + 'px';
    if (!reduce) { af.style.animationDelay = '.5s'; restart(af, 'is-hunting'); }

    busy = false;
    sleep(1200).then(() => { const j = (i + 1) % N; if (els[j]) load(j); });
  }

  const step = (d) => show(cur + d);
  hudBar.addEventListener('animationend', () => { if (!heldByUser && !heldAuto) step(1); });

  function setHeld() { hud.classList.toggle('is-held', heldAuto); }
  function setPaused(p) { heldByUser = p; hud.classList.toggle('is-paused', p); $('#hudPause').setAttribute('aria-label', p ? 'Play slideshow' : 'Pause slideshow'); }

  function wire() {
    $('#hudPrev').addEventListener('click', () => step(-1));
    $('#hudNext').addEventListener('click', () => step(1));
    $('#hudPause').addEventListener('click', () => setPaused(!heldByUser));
    addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea|select/i.test(e.target.tagName) || doc.classList.contains('lb-open')) return;
      const r = hero.getBoundingClientRect();
      if (r.bottom < innerHeight * 0.4 || r.top > innerHeight * 0.4) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
    let sx = null;
    hero.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' && !e.target.closest('a, button')) sx = e.clientX; });
    hero.addEventListener('pointerup', (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    });
    hero.addEventListener('pointercancel', () => { sx = null; });

    // don't burn cycles (or advance) while off-screen or in a background tab
    new IntersectionObserver((en) => { heldAuto = !en[0].isIntersecting || document.hidden; setHeld(); }, { threshold: 0.25 }).observe(hero);
    document.addEventListener('visibilitychange', () => { heldAuto = document.hidden; setHeld(); });

    let rz;
    addEventListener('resize', () => {
      clearTimeout(rz);
      rz = setTimeout(() => {
        if (cur < 0) return;
        layout(cur);
        af.style.left = els[cur]._af.x + 'px';
        af.style.top = els[cur]._af.y + 'px';
      }, 120);
    });
    hud.style.setProperty('--hud-h', hud.offsetHeight + 'px');
    hero.style.setProperty('--hud-h', hud.offsetHeight + 'px');
  }

  function start() {
    if (started) return;
    started = true;
    doc.dispatchEvent(new Event('ff:ready'));
    if (heldByUser) hud.classList.add('is-paused');
    show(0);
  }

  build();
  wire();
  load(0); // begin fetching the first photo right away

  start();

  /* ---------- stacking project cards ---------- */
  const cards = $$('.project');
  if (cards.length && !reduce) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const navH = nav ? nav.offsetHeight : 70;
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const stickTop = navH + i * 16;
        const h = c.offsetHeight;
        const start = stickTop + h, end = stickTop + 16;
        const p = Math.min(1, Math.max(0, (start - next.getBoundingClientRect().top) / (start - end)));
        c.style.setProperty('--p', p.toFixed(3));
      });
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
})();
