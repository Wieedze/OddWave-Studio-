// Portfolio — discography cover wall. Recreated from
// design-handoff/Portfolio OddWave.dc.html. A fixed FloatingLines field behind a
// full-height title, the cover grid scrolling over it, and the CTA.
// (The standalone "Portfolio Synth" experiment is intentionally out of scope.)

import { FloatingLines, Logo } from '@/components';
import { Button } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { usePageMotion } from '@/hooks';
import { ROUTES } from '@/content/navigation';
import { PORTFOLIO, COVERS, type Cover } from '@/content/portfolio';
import './PortfolioPage.css';

function CoverTile({ cover }: { cover: Cover }) {
  return (
    <div data-reveal>
      <div className="ow-cover">
        <div className="ow-cover-art" style={{ background: cover.art }} />
        <div className="ow-cover-tag">{cover.tag}</div>
        <div className="ow-cover-meta">
          <div style={{ fontFamily: typography.font.display, fontWeight: typography.weight.bold, fontSize: '16px', lineHeight: 1.2, letterSpacing: '-0.01em', color: colors.text.primaryWarm }}>
            {cover.title}
          </div>
          <div style={{ marginTop: '4px', fontFamily: typography.font.body, fontWeight: typography.weight.medium, fontSize: '12px', lineHeight: 1.3, color: 'rgba(241,238,232,.7)' }}>
            {cover.artist}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioPage() {
  const ref = usePageMotion<HTMLDivElement>();

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
        <section style={{ position: 'relative', height: '100vh', minHeight: '640px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <h1
            data-reveal
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.black,
              fontSize: 'clamp(54px, 12vw, 170px)',
              lineHeight: 0.86,
              letterSpacing: '-0.03em',
              color: colors.text.primaryWarm,
              textShadow: '0 2px 60px rgba(0,0,0,.5)',
            }}
          >
            {PORTFOLIO.heroTitle}
          </h1>
          <p
            data-reveal
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

        {/* COVER WALL */}
        <section style={{ position: 'relative', zIndex: 2, background: colors.ink[900], padding: 'clamp(40px,7vh,90px) 30px clamp(70px,11vh,130px)' }}>
          <div
            data-cover-grid
            style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(14px,1.4vw,20px)' }}
          >
            {COVERS.map((cover) => (
              <CoverTile key={`${cover.title}-${cover.artist}`} cover={cover} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: colors.ink[900], padding: 'clamp(80px,12vh,140px) 30px', borderTop: `1px solid ${colors.border.hair}` }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div data-reveal style={{ display: 'inline-block', width: '44px', height: '44px', marginBottom: '28px' }}>
              <Logo size={44} stroke={colors.copper.landing} />
            </div>
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
            <div data-reveal style={{ marginTop: '34px' }}>
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
