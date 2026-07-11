// Home landing intro — ported from the GSAP timeline in
// design-handoff/Landing OddWave GSAP.dc.html. Letter-by-letter title, nav
// appear + auto-open, eyebrow, "studio", hero parallax, nav auto-close on first
// scroll, reveals, and the prestation cards de-blurring on scroll.
//
// Selectors (set on the markup by HomePage):
//   #top                      hero section
//   [data-hero-img]           hero background image
//   [data-ltr]                each title letter
//   [data-intro-el="studio"]  the "studio" sub-label
//   [data-intro-el="cta"]     the bottom eyebrow line
//   .ow-nav                   the floating nav pill
//   [data-reveal]             generic reveals
//   [data-svc] / [data-svc-card]  prestation section / its text card

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/helpers';
import { motion } from '@/design-system/tokens';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export function useHomeIntro<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = prefersReducedMotion();
    const speed = motion.gsap.cadence.lent;

    const ctx = gsap.context(() => {
      const heroSection = root.querySelector('#top');
      const img = root.querySelector<HTMLElement>('[data-hero-img]');
      // Nav lives in the shared layout (outside this page root), so query the
      // document for the single floating pill.
      const nav = document.querySelector<HTMLElement>('.ow-nav');
      const letters = Array.from(root.querySelectorAll<HTMLElement>('#top [data-ltr]'));
      const studio = root.querySelector<HTMLElement>('[data-intro-el="studio"]');
      const cta = root.querySelector<HTMLElement>('[data-intro-el="cta"]');

      // ---- Intro timeline ----
      if (reduce) {
        gsap.set([...letters, studio, cta].filter(Boolean), { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
        if (nav) gsap.set(nav, { autoAlpha: 1, y: 0 });
        if (img) gsap.set(img, { filter: 'blur(7px)' });
      } else {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.05 });
        if (nav) gsap.set(nav, { autoAlpha: 0, y: -8 });
        if (cta) gsap.set(cta, { autoAlpha: 0, y: 14 });
        if (letters.length) gsap.set(letters, { autoAlpha: 0, y: 40, filter: 'blur(12px)' });
        if (studio) gsap.set(studio, { autoAlpha: 0, y: 24, filter: 'blur(12px)' });
        if (img) gsap.set(img, { filter: 'blur(0px)' });

        // Timing: the nav still leads, but ODDWAVE / studio / eyebrow now arrive
        // close behind it instead of lagging a full step after the nav opens.
        const step = 0.85 * speed;
        const gNav = step; // nav appears
        const gTitle = gNav + 0.42 * speed; // ODDWAVE comes in just as the nav opens
        const gStudio = gTitle + 0.5 * speed; // "studio" shortly after the title

        if (img) tl.to(img, { filter: 'blur(7px)', duration: 1.5 * speed, ease: 'power1.inOut' }, 0);
        if (nav) tl.to(nav, { autoAlpha: 1, y: 0, duration: 0.64 * speed, ease: 'power2.out' }, gNav);
        if (letters.length)
          tl.to(letters, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.8 * speed, ease: 'power2.out' }, gTitle);

        // eyebrow lands together with the title rather than trailing the nav open
        const ebDur = 1.1 * speed;
        if (cta) tl.to(cta, { autoAlpha: 1, y: 0, duration: ebDur, ease: 'power2.out' }, Math.max(gNav, gTitle - 0.15 * speed));
        if (studio)
          tl.to(studio, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.8 * speed, ease: 'power2.out' }, gStudio);
      }

      // ---- Hero parallax (scrubbed) ----
      if (img && !reduce && heroSection) {
        gsap.to(img, {
          y: () => window.innerHeight * 0.5,
          ease: 'none',
          scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      // ---- Generic reveals ----
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.set(el, { autoAlpha: 0, y: 12 });
        if (reduce) {
          gsap.set(el, { autoAlpha: 1, y: 0 });
          return;
        }
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });

      // ---- Prestation cards de-blur on scroll ----
      root.querySelectorAll<HTMLElement>('[data-svc]').forEach((section) => {
        const card = section.querySelector<HTMLElement>('[data-svc-card]');
        if (!card) return;
        if (reduce) {
          gsap.set(card, { autoAlpha: 1, filter: 'blur(0px)', y: 0 });
          return;
        }
        gsap.set(card, { autoAlpha: 0, filter: 'blur(18px)', y: 24 });
        const stl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 34%', scrub: 1 },
        });
        stl.to(card, { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 1, ease: 'power2.out' }, 0);
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return ref;
}
