// Portfolio — recreated from design-handoff/Portfolio OddWave.dc.html. A fixed
// FloatingLines field behind the title, the interactive "Portfolio Synth" rack
// player sitting directly under the hero text, and the CTA. The synth stays
// mounted (its space is reserved, no layout shift) but is revealed only once
// the hero intro has played, so the title/eyebrow always land first.

import { useEffect, useState } from 'react';
import { FloatingLines, CtaLogo, PortfolioSynth } from '@/components';
import { Button } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { usePageMotion } from '@/hooks';
import { cx } from '@/helpers';
import { ROUTES } from '@/content/navigation';
import { PORTFOLIO } from '@/content/portfolio';
import './PortfolioPage.css';

export function PortfolioPage() {
  const [heroDone, setHeroDone] = useState(false);
  const ref = usePageMotion<HTMLDivElement>({ onHeroIntroComplete: () => setHeroDone(true) });

  // Fast-navigation escape hatch: a visitor who scrolls before the hero intro
  // hands off should not face the synth's reserved-but-empty space — the first
  // scroll reveals it immediately.
  useEffect(() => {
    const reveal = () => setHeroDone(true);
    window.addEventListener('scroll', reveal, { once: true, passive: true });
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  return (
    <div ref={ref} style={{ background: colors.ink[900], color: colors.text.primary, overflowX: 'hidden', minHeight: '100vh' }}>
      {/* FIXED FLOATINGLINES BACKDROP */}
      <section
        data-hero
        style={{ position: 'fixed', top: 0, left: 0, height: '100vh', minHeight: '640px', width: '100%', overflow: 'hidden', background: colors.surface.section, zIndex: 0 }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <FloatingLines
            linesGradient={['#C24E37', '#D98E5A', '#8A5A3C']}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[3, 4, 3]}
            lineDistance={[9, 7, 5]}
            animationSpeed={0.7}
            interactive
            parallax={false}
            bendRadius={16.0}
            bendStrength={-1.6}
            mouseDamping={0.08}
            mixBlendMode="screen"
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg,rgba(11,12,15,.4) 0%,rgba(11,12,15,0) 32%,rgba(11,12,15,0) 70%,rgba(11,12,15,.35) 100%)' }} />
      </section>

      {/* SCROLLING CONTENT */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* TITLE */}
        <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'clamp(140px, 22vh, 220px) 24px 0' }}>
          <h1
            data-hero-title
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.black,
              fontSize: 'clamp(54px, 12vw, 170px)',
              lineHeight: 0.86,
              letterSpacing: '-0.03em',
              color: colors.heroTitle.fill,
              WebkitTextStroke: colors.heroTitle.stroke,
              textShadow: '0 2px 60px rgba(0,0,0,.5)',
            }}
          >
            {PORTFOLIO.heroTitle}
          </h1>
          <p
            data-hero-eyebrow
            style={{
              margin: '24px 0 0',
              maxWidth: '540px',
              fontFamily: typography.font.body,
              fontWeight: typography.weight.regular,
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'rgba(241,238,232,.84)',
              textWrap: 'pretty',
            }}
          >
            {PORTFOLIO.heroIntro}
          </p>
        </section>

        {/* INTERACTIVE RACK PLAYER (revealed once the hero intro is done) */}
        <section style={{ position: 'relative', zIndex: 2, padding: '15vh 14px clamp(60px,10vh,120px)' }}>
          <div className={cx('portfolio-player-enter', heroDone && 'is-in')}>
            <PortfolioSynth />
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: colors.ink[900], padding: 'clamp(40px,6vh,70px) 30px clamp(52px,8vh,90px)', borderTop: `1px solid ${colors.border.hair}` }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <CtaLogo />
            <h2
              data-reveal
              style={{
                margin: 0,
                fontFamily: typography.font.display,
                fontWeight: typography.weight.bold,
                fontSize: 'clamp(34px,5.2vw,72px)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: colors.text.primaryWarm,
                textWrap: 'balance',
              }}
            >
              {PORTFOLIO.ctaTitle}
            </h2>
            <div data-reveal style={{ marginTop: '24px' }}>
              <Button to={ROUTES.contact} variant="primary" style={{ padding: '16px 32px' }}>
                {PORTFOLIO.ctaLabel}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
