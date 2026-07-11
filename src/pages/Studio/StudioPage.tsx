// Le Studio — the space and the engineer. Recreated from
// design-handoff/Studio OddWave.dc.html. Hero, two bio/residence splits, a
// parallax pedagogy band, and the CTA back to the home contact section.

import type { CSSProperties } from 'react';
import { CtaLogo } from '@/components';
import { Button, MonoLabel } from '@/design-system/primitives';
import { colors, typography, shadow } from '@/design-system/tokens';
import { usePageMotion } from '@/hooks';
import { STUDIO } from '@/content/studio';
import { ROUTES } from '@/content/navigation';
import './StudioPage.css';

function SplitMedia({ image, focus, height }: { image: string; focus: string; height: string }) {
  return (
    <div
      data-split-media
      data-reveal
      style={{ position: 'relative', height, borderRadius: '18px', overflow: 'hidden', boxShadow: shadow.media }}
    >
      <div style={{ position: 'absolute', inset: 0, background: `url('${image}') ${focus}/cover no-repeat` }} />
    </div>
  );
}

const bodyParagraph: CSSProperties = {
  fontFamily: typography.font.body,
  fontWeight: typography.weight.regular,
  color: colors.text.secondary,
  textWrap: 'pretty',
};

export function StudioPage() {
  const ref = usePageMotion<HTMLDivElement>();

  return (
    <div ref={ref} style={{ background: colors.ink[900], color: colors.text.primary, overflowX: 'hidden' }}>
      {/* HERO */}
      <section
        data-hero
        style={{ position: 'relative', height: '100vh', minHeight: '640px', width: '100%', overflow: 'hidden', background: colors.surface.section }}
      >
        <div
          data-hero-img
          data-parallax="0.18"
          style={{
            position: 'absolute',
            inset: '-6% 0 0 0',
            height: '112%',
            background: "url('/assets/studio-hero-ssl.jpg') center 50% / cover no-repeat",
            willChange: 'transform, filter, opacity',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg,rgba(11,12,15,.32) 0%,rgba(11,12,15,.05) 20%,transparent 46%,rgba(11,12,15,.5) 82%,rgba(11,12,15,.86) 100%)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 95% at 50% 80%,rgba(11,12,15,.55) 0%,transparent 56%)' }} />
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
            data-hero-title
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.black,
              fontSize: 'clamp(48px, 11vw, 180px)',
              lineHeight: 0.86,
              letterSpacing: '-0.03em',
              color: colors.text.primaryWarm,
              textShadow: '0 4px 60px rgba(0,0,0,.55)',
            }}
          >
            {STUDIO.heroTitle}
          </h1>
          <div data-hero-eyebrow style={{ margin: '18px 0 0' }}>
            <MonoLabel size="13px" tracking="0.32em" color={colors.copper.warm} style={{ textIndent: '0.32em' }}>
              {STUDIO.heroEyebrow}
            </MonoLabel>
          </div>
        </div>
      </section>

      {/* THÉO GROZDANIC */}
      <section style={{ background: colors.surface.section, padding: 'clamp(36px,5vh,64px) 30px clamp(80px,12vh,140px)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div data-split style={{ display: 'grid', gridTemplateColumns: '.92fr 1.08fr', gap: 'clamp(40px,5vw,72px)', alignItems: 'center' }}>
            <SplitMedia image="/assets/theo-portrait.jpg" focus="center 28%" height="min(72vh,640px)" />
            <div data-split-text>
              <h2
                data-reveal
                style={{
                  margin: '0 0 10px',
                  fontFamily: typography.font.display,
                  fontWeight: typography.weight.bold,
                  fontSize: 'clamp(36px,4.6vw,64px)',
                  lineHeight: 1,
                  letterSpacing: '-0.025em',
                  color: colors.text.primaryWarm,
                }}
              >
                {STUDIO.engineerName}
              </h2>
              <div data-reveal style={{ marginBottom: '26px' }}>
                <MonoLabel as="div" size="13px" tracking="0.06em" color={colors.copper.warm} style={{ textTransform: 'none', lineHeight: 1.5 }}>
                  {STUDIO.engineerRole}
                </MonoLabel>
              </div>
              <p data-reveal style={{ ...bodyParagraph, margin: '0 0 20px', maxWidth: '520px', fontSize: '16px', lineHeight: 1.75 }}>
                D'une passion devenue expertise : à 18 ans, il enregistre et mixe les groupes locaux dans son propre studio.
                Technicien son sur scène, puis producteur, il lance <span style={{ color: colors.copper.highlight }}>OddWave</span> et{' '}
                <span style={{ color: colors.copper.highlight }}>Earthworm</span>, signe sur des labels reconnus et tourne à travers le monde.
              </p>
              <p data-reveal style={{ ...bodyParagraph, margin: 0, maxWidth: '520px', fontSize: '16px', lineHeight: 1.75 }}>
                {STUDIO.bioParagraph2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENVIRONNEMENT */}
      <section style={{ background: colors.ink[900], padding: 'clamp(80px,12vh,140px) 30px' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div data-split style={{ display: 'grid', gridTemplateColumns: '1.08fr .92fr', gap: 'clamp(40px,5vw,72px)', alignItems: 'center' }}>
            <div data-split-text style={{ order: 1 }}>
              <h2
                data-reveal
                style={{
                  margin: '0 0 24px',
                  maxWidth: '520px',
                  fontFamily: typography.font.display,
                  fontWeight: typography.weight.bold,
                  fontSize: 'clamp(34px,4.6vw,60px)',
                  lineHeight: 1.04,
                  letterSpacing: '-0.025em',
                  color: colors.text.primaryWarm,
                  textWrap: 'pretty',
                }}
              >
                {STUDIO.envTitle}
              </h2>
              <p data-reveal style={{ ...bodyParagraph, margin: '0 0 20px', maxWidth: '500px', fontSize: '17px', lineHeight: 1.75 }}>
                {STUDIO.envParagraph1}
              </p>
              <p data-reveal style={{ ...bodyParagraph, margin: 0, maxWidth: '500px', fontSize: '17px', lineHeight: 1.75 }}>
                {STUDIO.envParagraph2}
              </p>
            </div>
            <div style={{ order: 2 }}>
              <SplitMedia image="/assets/cabin-mic.jpg" focus="center" height="min(64vh,560px)" />
            </div>
          </div>
        </div>
      </section>

      {/* APPROCHE PÉDAGOGIQUE — parallax band */}
      <section style={{ position: 'relative', padding: 'clamp(100px,15vh,170px) 30px', overflow: 'hidden' }}>
        <div
          data-parallax="0.14"
          style={{
            position: 'absolute',
            inset: '-10% 0',
            height: '120%',
            background: "url('/assets/session.jpg') center/cover no-repeat",
            willChange: 'transform',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 6%, rgba(0,0,0,.35) 36%, #000 66%)',
            maskImage: 'linear-gradient(90deg, transparent 6%, rgba(0,0,0,.35) 36%, #000 66%)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#0B0C0F 0%,rgba(11,12,15,.86) 40%,rgba(11,12,15,.32) 78%,transparent 100%)' }} />
        <div style={{ position: 'relative', maxWidth: '1180px', margin: '0 auto' }}>
          <h2
            data-reveal
            style={{
              margin: 0,
              maxWidth: '760px',
              fontFamily: typography.font.display,
              fontWeight: typography.weight.bold,
              fontSize: 'clamp(32px,4.6vw,58px)',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              color: colors.text.primaryWarm,
              textWrap: 'pretty',
            }}
          >
            {STUDIO.pedagogyTitle}
          </h2>
          <p data-reveal style={{ ...bodyParagraph, margin: '26px 0 0', maxWidth: '540px', fontSize: '17px', lineHeight: 1.75, color: '#C8C4BC' }}>
            {STUDIO.pedagogyBody}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: colors.ink[900], padding: 'clamp(44px,6.5vh,74px) 30px clamp(56px,8.5vh,96px)', borderTop: `1px solid ${colors.border.hairMid}` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <CtaLogo />
          <h2
            data-reveal
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.bold,
              fontSize: 'clamp(36px,5.5vw,76px)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: colors.text.primaryWarm,
              textWrap: 'balance',
            }}
          >
            {STUDIO.ctaTitle}
          </h2>
          <p data-reveal style={{ ...bodyParagraph, margin: '16px auto 0', maxWidth: '460px', fontSize: '17px', lineHeight: 1.6 }}>
            {STUDIO.ctaBody}
          </p>
          <div data-reveal style={{ marginTop: '24px' }}>
            <Button to={ROUTES.contact} variant="primary" style={{ padding: '16px 32px' }}>
              {STUDIO.ctaLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
