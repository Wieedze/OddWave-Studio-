// Services — the three "prestations" glass panels, moved here from the landing
// (client feedback, July 2026: the landing now presents the studio; the
// services get their own page). The FloatingLines backdrop is FIXED like on
// Portfolio (client request): it stays put while the title, panels and CTA
// scroll over it. Motion runs through the shared MotionService (hero
// title/eyebrow intro, panel de-blur, reveals).

import { useState, type CSSProperties } from 'react';
import { FloatingLines, CtaLogo } from '@/components';
import { Button, MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { usePageMotion } from '@/hooks';
import { cx } from '@/helpers';
import { SERVICES, SERVICES_PAGE } from '@/content/services';
import { ROUTES } from '@/content/navigation';
import type { ServiceItem } from '@/models';
import './ServicesPage.css';

function PrestationPanel({ service }: { service: ServiceItem }) {
  const imageRight = service.imageSide === 'right';
  const columns = imageRight ? '.96fr 1.04fr' : '1.04fr .96fr';

  const textBlock = (
    <div
      data-svc-text
      style={{
        padding: 'clamp(34px, 3.4vw, 62px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left',
      }}
    >
      <h3
        style={{
          margin: '0 0 24px',
          fontFamily: typography.font.display,
          fontWeight: typography.weight.bold,
          fontSize: 'clamp(34px, 3.4vw, 56px)',
          lineHeight: 1,
          letterSpacing: '-0.025em',
          color: colors.text.surfaceBright,
        }}
      >
        {service.title}
      </h3>
      {service.body.map((paragraph, i) => (
        <p
          key={i}
          style={{
            margin: i === 0 ? 0 : '14px 0 0',
            fontFamily: typography.font.body,
            fontWeight: typography.weight.regular,
            fontSize: '16.5px',
            lineHeight: 1.85,
            color: colors.text.mutedCool,
            textWrap: 'pretty',
            maxWidth: '60ch',
          }}
        >
          {paragraph}
        </p>
      ))}
      <a
        href={service.ctaHref}
        style={{
          marginTop: '32px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '9px',
          fontFamily: typography.font.body,
          fontWeight: typography.weight.semibold,
          fontSize: '14px',
          lineHeight: 1,
          color: colors.text.primary,
          textDecoration: 'none',
          borderBottom: '1px solid rgba(194,142,87,.85)',
          paddingBottom: '5px',
          alignSelf: 'flex-start',
        }}
      >
        {service.ctaLabel}
      </a>
    </div>
  );

  const mediaBlock = (
    <div data-svc-img style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(440px, 64vh, 720px)' }}>
      <div style={{ position: 'absolute', inset: 0, willChange: 'transform, opacity, filter' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `url('${service.image}') ${service.imageFocus} / cover no-repeat`,
          }}
        />
      </div>
    </div>
  );

  return (
    <section
      data-svc
      style={{
        position: 'relative',
        background: 'transparent',
        padding: '0 clamp(20px, 4vw, 64px)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        data-svc-card
        style={{
          width: '100%',
          maxWidth: '1500px',
          display: 'grid',
          gridTemplateColumns: columns,
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'rgba(14,15,18,.62)',
          backdropFilter: 'blur(28px) saturate(120%)',
          WebkitBackdropFilter: 'blur(28px) saturate(120%)',
          border: '1px solid rgba(246,238,230,.10)',
          boxShadow: '0 50px 130px rgba(0,0,0,.55)',
        }}
      >
        {imageRight ? (
          <>
            {textBlock}
            {mediaBlock}
          </>
        ) : (
          <>
            {mediaBlock}
            {textBlock}
          </>
        )}
      </div>
    </section>
  );
}

const spacer = (height: string): CSSProperties => ({ height });

export function ServicesPage() {
  const [heroDone, setHeroDone] = useState(false);
  const ref = usePageMotion<HTMLDivElement>({ onHeroIntroComplete: () => setHeroDone(true) });

  return (
    <div ref={ref} style={{ background: colors.ink[900], color: colors.text.primary, overflowX: 'hidden', minHeight: '100vh' }}>
      {/* FIXED FLOATINGLINES BACKDROP (same behavior as Portfolio) */}
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

      {/* SCROLLING CONTENT — over the fixed backdrop */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* TITLE — top padding instead of a full-height section (same shape as
            Portfolio) so the first panel sits within reach of the first scroll */}
        <section
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: 'clamp(140px, 22vh, 220px) 24px 0',
          }}
        >
          <h1
            data-hero-title
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.black,
              fontSize: 'clamp(48px, 11vw, 170px)',
              lineHeight: 0.86,
              letterSpacing: '-0.03em',
              color: colors.heroTitle.fill,
              WebkitTextStroke: colors.heroTitle.stroke,
              textShadow: '0 4px 60px rgba(0,0,0,.55)',
            }}
          >
            {SERVICES_PAGE.heroTitle}
          </h1>
          <div data-hero-eyebrow style={{ margin: '18px 0 0' }}>
            <MonoLabel size="13px" tracking="0.32em" color={colors.copper.warm} style={{ textIndent: '0.32em' }}>
              {SERVICES_PAGE.heroEyebrow}
            </MonoLabel>
          </div>
        </section>

        <div aria-hidden style={spacer('min(16vh, 160px)')} />

        {/* Panels stay mounted (space reserved) but are revealed only once the
            hero intro has played, so the SERVICES title always lands first. */}
        <div className={cx('services-panels-enter', heroDone && 'is-in')}>
          {SERVICES.map((service, i) => (
            <div key={service.id}>
              <PrestationPanel service={service} />
              {i < SERVICES.length - 1 && <div aria-hidden style={spacer('min(32vh, 360px)')} />}
            </div>
          ))}
        </div>

        <div aria-hidden style={spacer('min(28vh, 300px)')} />

        {/* CTA */}
        <section
          style={{ background: colors.ink[900], padding: '44px 30px 60px', borderTop: `1px solid ${colors.border.hairMid}` }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <CtaLogo />
            <h2
              data-reveal
              style={{
                margin: 0,
                fontFamily: typography.font.display,
                fontWeight: typography.weight.bold,
                fontSize: 'clamp(40px, 6.5vw, 88px)',
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
                color: colors.text.primaryWarm,
                textWrap: 'balance',
              }}
            >
              {SERVICES_PAGE.ctaTitle}
            </h2>
            <p
              data-reveal
              style={{
                margin: '18px auto 0',
                maxWidth: '480px',
                fontFamily: typography.font.body,
                fontWeight: typography.weight.regular,
                fontSize: '17px',
                lineHeight: 1.6,
                color: colors.text.secondary,
                textWrap: 'pretty',
              }}
            >
              {SERVICES_PAGE.ctaBody}
            </p>
            <div data-reveal style={{ marginTop: '26px' }}>
              <Button to={ROUTES.contact} variant="primary" style={{ padding: '17px 34px' }}>
                {SERVICES_PAGE.ctaLabel}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
