// Exports — the studio's "Guide d'export" reproduced from
// oddwavestudio.com/exports. Same shape as Portfolio: a fixed animated
// FloatingLines backdrop behind the whole page, a full-height title, then the
// 6 A4 guide pages scrolling over the backdrop.

import { FloatingLines } from '@/components';
import { usePageMotion } from '@/hooks';
import { colors, typography } from '@/design-system/tokens';
import { EXPORTS } from '@/content/exports';
import './ExportsPage.css';

export function ExportsPage() {
  const ref = usePageMotion<HTMLDivElement>();

  return (
    <div ref={ref} style={{ background: colors.surface.section, color: colors.text.primary, overflowX: 'hidden', minHeight: '100vh' }}>
      {/* FIXED FLOATINGLINES BACKDROP */}
      <section
        data-hero
        style={{ position: 'fixed', top: 0, left: 0, height: '100vh', minHeight: '620px', width: '100%', overflow: 'hidden', background: colors.surface.section, zIndex: 0 }}
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

      {/* SCROLLING CONTENT — over the fixed backdrop */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* TITLE */}
        <section style={{ position: 'relative', height: '100vh', minHeight: '620px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <h1
            data-hero-title
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.black,
              fontSize: 'clamp(44px, 9.5vw, 150px)',
              lineHeight: 0.86,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: colors.heroTitle.fill,
              WebkitTextStroke: colors.heroTitle.stroke,
              textShadow: '0 4px 60px rgba(0,0,0,.55)',
            }}
          >
            {EXPORTS.title}
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
            {EXPORTS.intro}
          </p>
        </section>

        {/* DOCUMENT — the 6 guide pages, scrolling over the backdrop */}
        <section className="ow-exports" style={{ position: 'relative', zIndex: 2 }}>
          <div data-reveal className="ow-exports-card">
            <div className="ow-exports-doc">
              {EXPORTS.pages.map((page, i) => (
                <img
                  key={page.src}
                  className="ow-exports-page"
                  src={page.src}
                  alt={page.alt}
                  width={1055}
                  height={1491}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
