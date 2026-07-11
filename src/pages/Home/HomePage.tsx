// Home — the GSAP landing. Recreated from design-handoff/Landing OddWave GSAP.dc.html.
// Letter-by-letter hero, sticky FloatingLines mid-section, alternating prestation
// glass panels, final CTA. Motion is wired by useHomeIntro.

import type { CSSProperties } from 'react';
import { FloatingLines } from '@/components';
import { CtaLogo } from '@/components';
import { Button, MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { useHomeIntro } from '@/hooks';
import { HOME_SERVICES, HOME_CTA } from '@/content/homeServices';
import { ROUTES } from '@/content/navigation';
import type { ServiceItem } from '@/models';
import './HomePage.css';

const HERO_WORD_LEFT = ['O', 'D', 'D'];
const HERO_WORD_RIGHT = ['W', 'A', 'V', 'E'];

function Letter({ char }: { char: string }) {
  return (
    <span data-ltr style={{ display: 'inline-block' }}>
      {char}
    </span>
  );
}

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
        justifyContent: imageRight ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        data-reveal
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

export function HomePage() {
  const rootRef = useHomeIntro<HTMLDivElement>();

  return (
    <div ref={rootRef} style={{ background: colors.ink[900], color: colors.text.primary }}>
      {/* HERO */}
      <section
        id="top"
        data-hero
        style={{ position: 'relative', height: '100vh', minHeight: '680px', width: '100%', overflow: 'hidden' }}
      >
        <div
          data-hero-img
          style={{
            position: 'absolute',
            inset: '-22% 0 -22% 0',
            height: '144%',
            background: "url('/assets/hero.jpg') center 40% / cover no-repeat",
            willChange: 'transform',
            filter: 'blur(7px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg,rgba(8,9,12,.74) 0%,rgba(8,9,12,.2) 32%,rgba(8,9,12,.18) 55%,rgba(11,12,15,.85) 86%,#0B0C0F 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(120% 80% at 50% 42%,transparent 40%,rgba(8,9,12,.55) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.black,
              fontSize: 'clamp(64px, 15vw, 236px)',
              lineHeight: 0.92,
              letterSpacing: '0.01em',
              color: 'rgba(255,253,251,.9)',
              WebkitTextStroke: '1.4px rgba(194,78,55,.85)',
              textShadow: '0 2px 40px rgba(0,0,0,.3)',
            }}
          >
            <span style={{ whiteSpace: 'nowrap' }}>
              {HERO_WORD_LEFT.map((c, i) => (
                <Letter key={`l-${i}`} char={c} />
              ))}
            </span>
            <wbr />
            <span style={{ whiteSpace: 'nowrap' }}>
              {HERO_WORD_RIGHT.map((c, i) => (
                <Letter key={`r-${i}`} char={c} />
              ))}
            </span>
          </h1>
          <div
            data-intro-el="studio"
            style={{
              display: 'inline-block',
              marginTop: '10px',
              fontFamily: typography.font.clash,
              fontWeight: 300,
              fontSize: 'clamp(20px, 4.4vw, 64px)',
              lineHeight: 0.9,
              letterSpacing: '0.16em',
              color: colors.text.primaryWarm,
              textShadow: '0 2px 40px rgba(0,0,0,.4)',
            }}
          >
            studio
          </div>
        </div>

        <div
          data-intro-el="cta"
          style={{ position: 'absolute', bottom: '46px', left: 0, right: 0, display: 'flex', justifyContent: 'center', padding: '0 20px' }}
        >
          <MonoLabel
            size="clamp(9px, 2.4vw, 16px)"
            tracking="clamp(0.16em, 1vw, 0.42em)"
            color={colors.copper.warm}
            style={{ textIndent: '0.16em', textAlign: 'center', lineHeight: 1.7, maxWidth: '100%' }}
          >
            {HOME_CTA.eyebrow}
          </MonoLabel>
        </div>
      </section>

      {/* MID SECTION + PRESTATIONS */}
      <div style={{ position: 'relative', background: colors.surface.section }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <FloatingLines
              linesGradient={['#C24E37', '#D98E5A', '#8A5A3C']}
              enabledWaves={['top', 'middle', 'bottom']}
              lineCount={[3, 4, 3]}
              lineDistance={[9, 7, 5]}
              animationSpeed={0.7}
              interactive
              parallax
              bendRadius={16.0}
              bendStrength={-1.6}
              mouseDamping={0.08}
              mixBlendMode="screen"
            />
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(120% 90% at 50% 50%,transparent 30%,rgba(11,12,15,.55) 100%)',
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 2, marginTop: '-100vh' }}>
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '420px',
              zIndex: 1,
              pointerEvents: 'none',
              backdropFilter: 'blur(52px)',
              WebkitBackdropFilter: 'blur(52px)',
              WebkitMaskImage: 'linear-gradient(180deg,#000 0%,#000 30%,transparent 100%)',
              maskImage: 'linear-gradient(180deg,#000 0%,#000 30%,transparent 100%)',
              background: 'linear-gradient(180deg,rgba(11,12,15,.85) 0%,rgba(11,12,15,.35) 45%,transparent 100%)',
            }}
          />
          <div aria-hidden style={spacer('min(34vh, 380px)')} />

          {HOME_SERVICES.map((service, i) => (
            <div key={service.id}>
              <PrestationPanel service={service} />
              {i < HOME_SERVICES.length - 1 && <div aria-hidden style={spacer('min(32vh, 360px)')} />}
            </div>
          ))}

          <div aria-hidden style={spacer('min(28vh, 300px)')} />
        </div>
      </div>

      {/* CONTACT / CTA */}
      <section
        id="contact"
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
            {HOME_CTA.title}
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
            {HOME_CTA.body}
          </p>
          <div data-reveal style={{ marginTop: '26px' }}>
            <Button to={ROUTES.contact} variant="primary" style={{ padding: '17px 34px' }}>
              {HOME_CTA.buttonLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
