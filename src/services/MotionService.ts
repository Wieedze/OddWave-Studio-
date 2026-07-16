// MotionService — the shared motion engine, re-expressed from
// design-handoff/ow-motion.js as a typed class. Drives attribute-based motion:
//
//   [data-hero-img]      hero image: blur -> sharp on entry + scroll parallax
//   [data-hero-title]    hero title: appears first (blur -> sharp, rise)
//   [data-hero-eyebrow]  hero eyebrow: appears just after the title
//   [data-reveal]        reveals (intro inside the hero, otherwise on scroll)
//   [data-parallax="x"]  vertical scroll parallax (value = intensity)
//   [data-svc] / [data-svc-card]  prestation panel: card de-blurs on scroll
//
// It owns a gsap.context for clean teardown and honors prefers-reduced-motion.

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/helpers';

export interface MotionOptions {
  /** Selector for the hero section (its internal reveals run as a timed intro). */
  heroSelector?: string;
  /** Force-disable motion (defaults to the OS reduced-motion preference). */
  reduceMotion?: boolean;
  /**
   * Fired once the hero intro has visually landed (partway through the last
   * text tween, once its ease-out has settled the element; immediately under
   * reduced motion / when the page has no hero text). Lets a page defer
   * revealing below-the-hero content until the intro is done.
   */
  onHeroIntroComplete?: () => void;
}

export class MotionService {
  private ctx: ReturnType<typeof gsap.context> | null = null;
  private readonly reduce: boolean;
  private readonly heroSelector: string;
  private readonly onHeroIntroComplete?: () => void;

  constructor(
    private readonly root: HTMLElement,
    options: MotionOptions = {},
  ) {
    this.reduce = options.reduceMotion ?? prefersReducedMotion();
    this.heroSelector = options.heroSelector ?? '[data-hero]';
    this.onHeroIntroComplete = options.onHeroIntroComplete;
    gsap.registerPlugin(ScrollTrigger);
  }

  /** Build all attribute-driven animations. Returns this for chaining. */
  init(): this {
    this.ctx = gsap.context(() => {
      this.buildHeroImage();
      this.buildHeroTitleEyebrow();
      this.buildHeroReveals();
      this.buildScrollReveals();
      this.buildServicePanels();
      this.buildParallax();
      ScrollTrigger.refresh();
    }, this.root);
    return this;
  }

  /** Revert every tween/trigger created in this context. */
  destroy(): void {
    this.ctx?.revert();
    this.ctx = null;
  }

  private hero(): Element | null {
    return this.root.querySelector(this.heroSelector);
  }

  private inHero(el: Element): boolean {
    const hero = this.hero();
    return Boolean(hero && hero.contains(el));
  }

  private buildHeroImage(): void {
    const img = this.root.querySelector<HTMLElement>('[data-hero-img]');
    if (!img) return;
    gsap.set(img, { autoAlpha: 0, filter: 'blur(18px)' });
    if (this.reduce) {
      gsap.set(img, { autoAlpha: 1, filter: 'blur(0px)' });
      return;
    }
    gsap.to(img, { autoAlpha: 1, filter: 'blur(0px)', duration: 2.0, ease: 'power2.out', delay: 0.1 });
  }

  private buildHeroTitleEyebrow(): void {
    const title = this.root.querySelector<HTMLElement>('[data-hero-title]');
    const eyebrow = this.root.querySelector<HTMLElement>('[data-hero-eyebrow]');
    const done = this.onHeroIntroComplete;
    for (const el of [title, eyebrow]) {
      if (el) gsap.set(el, { autoAlpha: 0, filter: 'blur(14px)', y: 22 });
    }
    if (this.reduce) {
      for (const el of [title, eyebrow]) {
        if (el) gsap.set(el, { autoAlpha: 1, filter: 'blur(0px)', y: 0 });
      }
      done?.();
      return;
    }
    const last = eyebrow ?? title;
    if (!last) {
      done?.();
      return;
    }
    if (title) gsap.to(title, { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out', delay: 0.7 });
    if (eyebrow) gsap.to(eyebrow, { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'power2.out', delay: 1.25 });
    if (done) {
      // Hand off partway through the last tween, not at its mathematical end:
      // with power2.out the text is visually settled around 45% in, and the
      // follow-up content should overlap the invisible tail of the blur.
      const lastDelay = last === eyebrow ? 1.25 : 0.7;
      gsap.delayedCall(lastDelay + 0.65, done);
    }
  }

  private buildHeroReveals(): void {
    const hero = this.hero();
    if (!hero) return;
    hero.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
      gsap.set(el, { autoAlpha: 0, y: 26 });
      if (this.reduce) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.to(el, { autoAlpha: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.56 + i * 0.15 });
    });
  }

  private buildScrollReveals(): void {
    this.root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (this.inHero(el)) return;
      gsap.set(el, { autoAlpha: 0, y: 20 });
      if (this.reduce) {
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
  }

  private buildServicePanels(): void {
    MotionService.applyServicePanels(this.root, this.reduce);
  }

  private buildParallax(): void {
    MotionService.applyParallax(this.root, this.reduce);
  }

  /** Prestation panels ([data-svc] > [data-svc-card]): scrubbed de-blur on
      scroll, ported from the landing GSAP timeline. Static so useHomeIntro
      (which owns its own gsap context) can reuse it. */
  static applyServicePanels(root: HTMLElement, reduce: boolean): void {
    root.querySelectorAll<HTMLElement>('[data-svc]').forEach((section) => {
      const card = section.querySelector<HTMLElement>('[data-svc-card]');
      if (!card) return;
      if (reduce) {
        gsap.set(card, { autoAlpha: 1, filter: 'blur(0px)', y: 0 });
        return;
      }
      gsap.set(card, { autoAlpha: 0, filter: 'blur(18px)', y: 24 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 34%', scrub: 1 },
      });
      tl.to(card, { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 1, ease: 'power2.out' }, 0);
    });
  }

  /** Vertical scroll parallax for every [data-parallax] element. Static so
      useHomeIntro (which owns its own gsap context) can reuse it. */
  static applyParallax(root: HTMLElement, reduce: boolean): void {
    if (reduce) return;
    root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
      const amount = parseFloat(el.getAttribute('data-parallax') ?? '0.25') || 0.25;
      const container = el.parentElement ?? el;
      gsap.fromTo(
        el,
        { yPercent: -amount * 50 },
        {
          yPercent: amount * 50,
          ease: 'none',
          scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  }
}
