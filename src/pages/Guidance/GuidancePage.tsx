// Accompagnement — artist guidance. Recreated from
// design-handoff/Accompagnement OddWave.dc.html. Hero, 4-phase method, clickable
// formules table that pre-fills the request form, and the request form itself.

import { useState } from 'react';
import { Logo } from '@/components';
import { MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { usePageMotion } from '@/hooks';
import { GUIDANCE_INTRO, GUIDANCE_PHASES, GUIDANCE_FORMULAS } from '@/content/guidance';
import { GuidanceForm } from './GuidanceForm';
import './GuidancePage.css';

const SECTION_TOP_RULE = `1px solid ${colors.border.hair}`;

export function GuidancePage() {
  const ref = usePageMotion<HTMLDivElement>();
  const [formule, setFormule] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function pickFormula(name: string): void {
    setFormule(name);
    const el = ref.current?.querySelector('#demande');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 8, behavior: 'smooth' });
  }

  const chosen = formule ? `la formule ${formule}` : 'votre accompagnement';

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
            background: "url('/assets/eleve-hero.jpg') center 46% / cover no-repeat",
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(120% 95% at 50% 80%,rgba(11,12,15,.55) 0%,transparent 56%)',
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
            data-hero-title
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.black,
              fontSize: 'clamp(44px, 9.5vw, 150px)',
              lineHeight: 0.86,
              letterSpacing: '-0.03em',
              color: colors.text.primaryWarm,
              textShadow: '0 4px 60px rgba(0,0,0,.55)',
            }}
          >
            ACCOMPAGNEMENT
          </h1>
          <div data-hero-eyebrow style={{ margin: '18px 0 0' }}>
            <MonoLabel size="13px" tracking="0.32em" color={colors.copper.warm} style={{ textIndent: '0.32em' }}>
              Suivi personnalisé &amp; pédagogique
            </MonoLabel>
          </div>
        </div>
      </section>

      {/* INTRO MÉTHODE */}
      <section id="methode" style={{ background: colors.surface.section, padding: 'clamp(50px,8vh,110px) 30px clamp(20px,4vh,50px)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div data-reveal style={{ marginBottom: '16px' }}>
            <MonoLabel size="12px" tracking="0.2em" color={colors.copper.landing}>
              {GUIDANCE_INTRO.eyebrow}
            </MonoLabel>
          </div>
          <h2
            data-reveal
            className="ow-method-h2"
            style={{
              margin: '0 0 14px',
              fontFamily: typography.font.display,
              fontWeight: typography.weight.extrabold,
              fontSize: 'clamp(28px, 4.6vw, 58px)',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: colors.text.primaryWarm,
              textWrap: 'balance',
              maxWidth: '760px',
            }}
          >
            {GUIDANCE_INTRO.title}
          </h2>
          <p
            data-reveal
            style={{
              margin: '18px 0 0',
              maxWidth: '720px',
              fontFamily: typography.font.body,
              fontWeight: typography.weight.regular,
              fontSize: 'clamp(18px, 1.9vw, 22px)',
              lineHeight: 1.6,
              color: '#D6D2CA',
              textWrap: 'pretty',
            }}
          >
            {GUIDANCE_INTRO.body}
          </p>
        </div>
      </section>

      {/* LES 4 PHASES */}
      <section id="phases" style={{ background: colors.surface.section, padding: 'clamp(18px,3.5vh,40px) 30px clamp(60px,9vh,110px)' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(18px,2.6vh,30px)' }}>
          {GUIDANCE_PHASES.map((phase) => (
            <article key={phase.number} data-reveal className="ow-phase">
              <div className="ow-phase-num" aria-hidden="true">
                {phase.number}
              </div>
              <div className="ow-phase-body">
                <p className="ow-phase-eyebrow">{phase.eyebrow}</p>
                <h3 className="ow-phase-title">{phase.title}</h3>
                <div className="ow-phase-rule" />
                <ul className="ow-phase-list">
                  {phase.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FORMULES */}
      <section id="formules" style={{ background: colors.ink[900], padding: 'clamp(60px,9vh,120px) 30px clamp(80px,12vh,140px)', borderTop: SECTION_TOP_RULE }}>
        <div style={{ maxWidth: '1480px', margin: '0 auto' }}>
          <div data-reveal style={{ marginBottom: '16px' }}>
            <MonoLabel size="12px" tracking="0.2em" color={colors.copper.landing}>
              Les formules
            </MonoLabel>
          </div>
          <h2
            data-reveal
            style={{
              margin: '0 0 12px',
              fontFamily: typography.font.display,
              fontWeight: typography.weight.bold,
              fontSize: 'clamp(28px, 4vw, 52px)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              color: colors.text.primaryWarm,
              textWrap: 'balance',
              maxWidth: '680px',
            }}
          >
            Une formule par ambition.
          </h2>
          <p
            data-reveal
            style={{
              margin: '0 0 46px',
              maxWidth: '520px',
              fontFamily: typography.font.body,
              fontWeight: typography.weight.regular,
              fontSize: '16px',
              lineHeight: 1.7,
              color: colors.text.muted,
              textWrap: 'pretty',
            }}
          >
            Pas de tarif figé : chaque accompagnement se construit autour de votre projet. On en parle ensemble.
          </p>

          <div data-reveal className="ow-formula-grid">
            {GUIDANCE_FORMULAS.map((f) => (
              <article key={f.id} className="ow-formula" data-pick onClick={() => pickFormula(f.name)}>
                <div className="ow-formula-head">
                  <span className="ow-formula-tag">{f.tag}</span>
                  <h3 className="ow-formula-name">{f.name}</h3>
                  <div className="ow-formula-rule" />
                </div>
                <ul className="ow-formula-list">
                  {f.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="ow-formula-foot">
                  <span className="ow-formula-go">Choisir →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEMANDE */}
      <section id="demande" style={{ background: colors.surface.section, padding: 'clamp(70px,11vh,140px) 30px clamp(90px,13vh,150px)', borderTop: SECTION_TOP_RULE }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <Logo size={38} stroke={colors.copper.landing} />
            <MonoLabel size="12px" tracking="0.2em" color={colors.copper.landing}>
              Demande d'accompagnement
            </MonoLabel>
          </div>
          <h2
            data-reveal
            style={{
              margin: '0 0 14px',
              fontFamily: typography.font.display,
              fontWeight: typography.weight.bold,
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: colors.text.primaryWarm,
              textWrap: 'balance',
            }}
          >
            Parlons de votre projet.
          </h2>
          <p
            data-reveal
            style={{
              margin: '0 0 40px',
              maxWidth: '540px',
              fontFamily: typography.font.body,
              fontWeight: typography.weight.regular,
              fontSize: '17px',
              lineHeight: 1.6,
              color: colors.text.secondary,
              textWrap: 'pretty',
            }}
          >
            Choisissez une formule, dites-nous où vous en êtes : on définit ensemble ce qui vous fera avancer. Réponse sous 48h.
          </p>

          <div data-reveal>
            {sent ? (
              <div style={{ padding: '44px 38px', borderRadius: '16px', background: 'rgba(194,78,55,.07)', border: '1px solid rgba(194,78,55,.3)' }}>
                <div style={{ width: '44px', height: '44px', marginBottom: '20px' }}>
                  <Logo size={44} stroke={colors.copper.landing} />
                </div>
                <h3
                  style={{
                    margin: '0 0 12px',
                    fontFamily: typography.font.display,
                    fontWeight: typography.weight.bold,
                    fontSize: '26px',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: colors.text.primaryWarm,
                  }}
                >
                  Demande envoyée.
                </h3>
                <p
                  style={{
                    margin: 0,
                    maxWidth: '440px',
                    fontFamily: typography.font.body,
                    fontWeight: typography.weight.regular,
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: colors.text.secondary,
                    textWrap: 'pretty',
                  }}
                >
                  Merci ! On a bien reçu votre demande pour{' '}
                  <strong style={{ color: colors.copper.highlight, fontWeight: typography.weight.semibold }}>{chosen}</strong>. On revient vers vous très vite.
                </p>
              </div>
            ) : (
              <GuidanceForm formule={formule} onSelectFormule={setFormule} onSubmitted={() => setSent(true)} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
