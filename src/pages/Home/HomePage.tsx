// Home — the GSAP landing, restructured per client feedback (July 2026): it now
// presents the studio. Letter-by-letter hero (from design-handoff/Landing
// OddWave GSAP.dc.html), then the studio presentation + history, the engineer
// and environment splits, the pedagogy band (all from design-handoff/Studio
// OddWave.dc.html) and the contact CTA. The three prestation panels moved to
// /services. Motion is wired by useHomeIntro.

import type { CSSProperties } from 'react';
import { CtaLogo } from '@/components';
import { Button, MonoLabel } from '@/design-system/primitives';
import { colors, typography, shadow } from '@/design-system/tokens';
import { useHomeIntro } from '@/hooks';
import { HOME } from '@/content/home';
import { STUDIO } from '@/content/studio';
import { ROUTES } from '@/content/navigation';
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

function SplitMedia({ image, focus, height, order }: { image: string; focus: string; height: string; order?: number }) {
  // `order` must live on this root (the grid item), or the mobile
  // [data-split-media] override cannot re-stack the image first.
  return (
    <div
      data-split-media
      data-reveal
      style={{ position: 'relative', height, borderRadius: '18px', overflow: 'hidden', boxShadow: shadow.media, order }}
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

export function HomePage() {
  const rootRef = useHomeIntro<HTMLDivElement>();
  const [introLead, ...introRest] = HOME.intro;

  return (
    <div ref={rootRef} style={{ background: colors.ink[900], color: colors.text.primary, overflowX: 'hidden' }}>
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
              color: colors.heroTitle.fill,
              WebkitTextStroke: colors.heroTitle.stroke,
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
            {HOME.heroEyebrow}
          </MonoLabel>
        </div>
      </section>

      {/* PRÉSENTATION + HISTORIQUE */}
      <section style={{ background: colors.surface.section, padding: 'clamp(70px,11vh,130px) 30px clamp(36px,5vh,64px)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div data-split style={{ display: 'grid', gridTemplateColumns: '1.08fr .92fr', gap: 'clamp(40px,5vw,72px)', alignItems: 'center' }}>
            <div data-split-text style={{ order: 1 }}>
              <div data-reveal style={{ marginBottom: '16px' }}>
                <MonoLabel size="12px" tracking="0.2em" color={colors.copper.landing}>
                  {HOME.introEyebrow}
                </MonoLabel>
              </div>
              <p
                data-reveal
                style={{
                  margin: 0,
                  maxWidth: '560px',
                  fontFamily: typography.font.display,
                  fontWeight: typography.weight.bold,
                  fontSize: 'clamp(22px,2.4vw,32px)',
                  lineHeight: 1.3,
                  letterSpacing: '-0.02em',
                  color: colors.text.primaryWarm,
                  textWrap: 'pretty',
                }}
              >
                {introLead}
              </p>
              {introRest.map((paragraph, i) => (
                <p
                  key={i}
                  data-reveal
                  style={{ ...bodyParagraph, margin: '20px 0 0', maxWidth: '520px', fontSize: '17px', lineHeight: 1.75 }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <SplitMedia image={HOME.introImage} focus="center 50%" height="min(64vh,560px)" order={2} />
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
            <SplitMedia image="/assets/cabin-mic.jpg" focus="center" height="min(64vh,560px)" order={2} />
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
            {STUDIO.ctaTitle}
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
            {STUDIO.ctaBody}
          </p>
          <div data-reveal style={{ marginTop: '26px' }}>
            <Button to={ROUTES.contact} variant="primary" style={{ padding: '17px 34px' }}>
              {STUDIO.ctaLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
