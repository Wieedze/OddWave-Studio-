// ============================================================================
// OddWave — moteur d'animation partagé (GSAP + ScrollTrigger)
// ----------------------------------------------------------------------------
// Toutes les pages utilisent CE module pour garantir un comportement uniforme.
// Piloté par attributs data-* dans le HTML (aucune ref React requise) :
//
//   [data-hero-img]                  image de hero : flou->net à l'arrivée + parallaxe scroll
//   [data-hero-title]                titre de hero : apparaît en 1er (flou->net)
//   [data-hero-eyebrow]              eyebrow de hero : apparaît juste après le titre
//   [data-reveal]                    élément qui se révèle (intro si dans le hero, sinon au scroll)
//   [data-parallax="0.28"]           parallaxe verticale au scroll (valeur = intensité)
//
// API :  OWMotion.init(rootEl, options)   -> renvoie un "controller" {destroy()}
//        options = { heroSelector, reduceMotion }
// ============================================================================
(function (global) {
  'use strict';

  var GSAP_URL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
  var ST_URL = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';

  // -- chargement unique de GSAP + ScrollTrigger (dédupliqué pour toute la page) --
  function ensureGsap() {
    return new Promise(function (resolve, reject) {
      if (global.gsap && global.ScrollTrigger) { resolve(); return; }
      if (!global.__owGsapState) {
        global.__owGsapState = 'loading';
        global.__owGsapWaiters = [];
        var add = function (src, onload) {
          var s = document.createElement('script');
          s.src = src; s.async = false; s.onload = onload;
          s.onerror = function () {
            global.__owGsapState = 'error';
            (global.__owGsapWaiters || []).forEach(function (w) { w.reject(); });
          };
          document.head.appendChild(s);
        };
        add(GSAP_URL, function () {
          add(ST_URL, function () {
            global.__owGsapState = 'ready';
            (global.__owGsapWaiters || []).forEach(function (w) { w.resolve(); });
          });
        });
      }
      if (global.__owGsapState === 'ready') { resolve(); return; }
      if (global.__owGsapState === 'error') { reject(); return; }
      (global.__owGsapWaiters = global.__owGsapWaiters || []).push({ resolve: resolve, reject: reject });
    });
  }

  // -- filet de sécurité : si GSAP ne charge pas, on rend TOUT visible immédiatement --
  function showEverything(root) {
    root.querySelectorAll('[data-reveal],[data-hero-title],[data-hero-eyebrow]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.filter = 'none';
      el.style.transform = 'none';
    });
    root.querySelectorAll('[data-hero-img]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.filter = 'none';
    });
  }

  function init(root, options) {
    options = options || {};
    var controller = { _sts: [], _tweens: [], _dead: false };
    var reduce = options.reduceMotion ||
      (global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches);

    var heroSel = options.heroSelector || 'section[data-screen-label$="Hero"]';

    var timer = setTimeout(function () {
      if (!controller._ready) showEverything(root); // ~5s sans GSAP -> on affiche tout
    }, 5000);

    ensureGsap().then(function () {
      clearTimeout(timer);
      if (controller._dead) return;
      controller._ready = true;
      build(root, controller, heroSel, reduce);
    }).catch(function () {
      clearTimeout(timer);
      showEverything(root);
    });

    controller.destroy = function () {
      controller._dead = true;
      clearTimeout(timer);
      controller._tweens.forEach(function (t) { try { t.kill(); } catch (e) {} });
      controller._sts.forEach(function (s) { try { s.kill(); } catch (e) {} });
    };
    return controller;
  }

  function build(root, controller, heroSel, reduce) {
    var gsap = global.gsap;
    var ST = global.ScrollTrigger;
    gsap.registerPlugin(ST);

    var heroSec = root.querySelector(heroSel);
    var inHero = function (el) { return heroSec && heroSec.contains(el); };

    // ---------- HERO : image flou -> net ----------
    var heroImg = root.querySelector('[data-hero-img]');
    if (heroImg) {
      gsap.set(heroImg, { autoAlpha: 0, filter: 'blur(18px)' });
      if (reduce) {
        gsap.set(heroImg, { autoAlpha: 1, filter: 'blur(0px)' });
      } else {
        controller._tweens.push(
          gsap.to(heroImg, { autoAlpha: 1, filter: 'blur(0px)', duration: 2.0, ease: 'power2.out', delay: 0.1 })
        );
      }
    }

    // ---------- HERO : titre puis eyebrow ----------
    var hTitle = root.querySelector('[data-hero-title]');
    var hEye = root.querySelector('[data-hero-eyebrow]');
    [hTitle, hEye].forEach(function (el) {
      if (el) gsap.set(el, { autoAlpha: 0, filter: 'blur(14px)', y: 22 });
    });
    if (reduce) {
      [hTitle, hEye].forEach(function (el) { if (el) gsap.set(el, { autoAlpha: 1, filter: 'blur(0px)', y: 0 }); });
    } else {
      if (hTitle) controller._tweens.push(
        gsap.to(hTitle, { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out', delay: 0.7 })
      );
      if (hEye) controller._tweens.push(
        gsap.to(hEye, { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out', delay: 1.25 })
      );
    }

    // ---------- HERO : reveals internes (intro minutée, indépendante du scroll) ----------
    if (heroSec) {
      var heroReveals = heroSec.querySelectorAll('[data-reveal]');
      heroReveals.forEach(function (el, i) {
        gsap.set(el, { autoAlpha: 0, y: 26 });
        if (reduce) { gsap.set(el, { autoAlpha: 1, y: 0 }); return; }
        controller._tweens.push(
          gsap.to(el, { autoAlpha: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.56 + i * 0.15 })
        );
      });
    }

    // ---------- REVEALS au scroll (hors hero) ----------
    root.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (inHero(el)) return;
      gsap.set(el, { autoAlpha: 0, y: 20 });
      if (reduce) { gsap.set(el, { autoAlpha: 1, y: 0 }); return; }
      controller._tweens.push(
        gsap.to(el, {
          autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        })
      );
    });

    // ---------- PARALLAXE au scroll ----------
    if (!reduce) {
      root.querySelectorAll('[data-parallax]').forEach(function (el) {
        var amt = parseFloat(el.getAttribute('data-parallax')) || 0.25;
        var container = el.parentElement || el;
        var flip = el.hasAttribute('data-flip') ? -1 : 1;
        var tw = gsap.fromTo(el,
          { yPercent: -amt * 50, scaleX: flip },
          {
            yPercent: amt * 50, scaleX: flip, ease: 'none',
            scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
        controller._tweens.push(tw);
        if (tw.scrollTrigger) controller._sts.push(tw.scrollTrigger);
      });
    }

    ST.refresh();
  }

  global.OWMotion = { init: init, ensureGsap: ensureGsap };
})(typeof window !== 'undefined' ? window : this);
