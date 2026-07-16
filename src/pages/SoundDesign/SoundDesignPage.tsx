// Sound Design — recreated from design-handoff/Sound Design OddWave.dc.html.
// Cinematic hero video (clip-path open, sound toggle, text reveal after the
// video plays in), the réalisations grid, the modal player, and the CTA.

import { useEffect, useRef, useState } from 'react';
import { CtaLogo, VideoModal } from '@/components';
import { Button } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { usePageMotion } from '@/hooks';
import { prefersReducedMotion } from '@/helpers';
import { SOUND_DESIGN, SD_VIDEOS, VIDEO_SRC } from '@/content/soundDesign';
import { ROUTES } from '@/content/navigation';
import type { VideoEntry } from '@/models';
import './SoundDesignPage.css';

const HERO_REVEAL_AT = 0.6; // delay (s) before the title reveals — matches the other pages' hero intro

function GalleryCard({ entry, onOpen }: { entry: VideoEntry; onOpen: () => void }) {
  const posterGradient = `linear-gradient(180deg,rgba(11,12,15,.05),rgba(11,12,15,.1)),url('${entry.posterImg}')`;
  return (
    <div className="ow-card" onClick={onOpen}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
        <div className="ow-poster" style={{ position: 'absolute', inset: 0, backgroundImage: posterGradient, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(11,12,15,.05) 0%,rgba(11,12,15,.12) 50%,rgba(11,12,15,.78) 100%)' }} />
        <div
          className="ow-play"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(20,21,26,.5)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1.5px solid rgba(255,255,255,.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="17" height="19" viewBox="0 0 17 19" style={{ fill: colors.text.primaryWarm, marginLeft: '3px' }}>
            <path d="M0 0 L17 9.5 L0 19 Z" />
          </svg>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '13px',
            right: '13px',
            padding: '5px 9px',
            borderRadius: '7px',
            background: 'rgba(11,12,15,.6)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            fontFamily: typography.font.mono,
            fontWeight: typography.weight.semibold,
            fontSize: '11px',
            lineHeight: 1,
            letterSpacing: '0.04em',
            color: colors.text.primary,
          }}
        >
          {entry.dur}
        </div>
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ fontFamily: typography.font.mono, fontWeight: typography.weight.semibold, fontSize: '10px', lineHeight: 1, letterSpacing: '0.16em', textTransform: 'uppercase', color: colors.copper.landing, marginBottom: '9px' }}>
          {entry.cat}
        </div>
        <div style={{ fontFamily: typography.font.display, fontWeight: typography.weight.bold, fontSize: '18px', lineHeight: 1.15, letterSpacing: '-0.01em', color: colors.text.primary }}>
          {entry.title}
        </div>
        <div style={{ marginTop: '5px', fontFamily: typography.font.body, fontWeight: typography.weight.regular, fontSize: '13px', lineHeight: 1.5, color: colors.text.mutedSoft, textWrap: 'pretty' }}>
          {entry.note}
        </div>
      </div>
    </div>
  );
}

export function SoundDesignPage() {
  const ref = usePageMotion<HTMLDivElement>();
  const heroVidRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [heroShown, setHeroShown] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const openEntry = openId ? SD_VIDEOS.find((v) => v.id === openId) ?? null : null;

  // Hero video: start muted + autoplay; reveal the title once it has played in.
  useEffect(() => {
    const video = heroVidRef.current;
    if (!video) return;
    video.muted = true;
    void video.play().catch(() => {});

    if (prefersReducedMotion()) {
      setHeroShown(true);
      return;
    }

    // Reveal the title/eyebrow shortly after mount (same intro timing as the
    // other pages) rather than waiting for the video to play in.
    const timer = window.setTimeout(() => setHeroShown(true), HERO_REVEAL_AT * 1000);
    return () => clearTimeout(timer);
  }, []);

  function toggleSound(): void {
    const video = heroVidRef.current;
    const next = !soundOn;
    if (video) {
      video.muted = !next;
      if (next) void video.play().catch(() => {});
    }
    setSoundOn(next);
  }

  const heroTextClass = heroShown ? 'ow-hero-text show' : 'ow-hero-text';

  return (
    <div ref={ref} style={{ background: colors.ink[900], color: colors.text.primary, overflowX: 'hidden' }}>
      {/* HERO */}
      <section data-hero style={{ position: 'relative', height: '100vh', minHeight: '640px', width: '100%', overflow: 'hidden', background: colors.surface.section }}>
        <video
          ref={heroVidRef}
          className="ow-hero-vid"
          data-parallax="0.18"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/showreel-poster.jpg"
          style={{ position: 'absolute', inset: '-6% 0 0 0', width: '100%', height: '112%', objectFit: 'cover', objectPosition: 'center 28%', willChange: 'transform, clip-path' }}
        >
          {/* IPFS source (same pinned mp4 as the gallery): /assets/*.mp4 are
              gitignored AND above the 25 MiB Workers static-asset limit, so a
              local path can never resolve in prod. */}
          <source src={VIDEO_SRC.showreel} type="video/mp4" />

        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(11,12,15,.32) 0%,rgba(11,12,15,.05) 20%,transparent 46%,rgba(11,12,15,.5) 82%,rgba(11,12,15,.86) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 95% at 18% 92%,rgba(11,12,15,.6) 0%,transparent 52%)' }} />

        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? 'Couper le son' : 'Activer le son'}
          style={{
            position: 'absolute',
            top: 'calc(22px + 64px)',
            right: 'clamp(20px,4vw,46px)',
            zIndex: 8,
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            padding: '10px 16px',
            borderRadius: '999px',
            background: 'rgba(20,21,26,.5)',
            backdropFilter: 'blur(10px) saturate(1.3)',
            WebkitBackdropFilter: 'blur(10px) saturate(1.3)',
            border: `1px solid ${colors.border.strong}`,
            color: colors.text.primary,
            cursor: 'pointer',
            fontFamily: typography.font.mono,
            fontWeight: typography.weight.semibold,
            fontSize: '11px',
            lineHeight: 1,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ display: 'block', width: '14px', height: '14px' }}>
            <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%', display: 'block' }}>
              <path d="M3 9v6h4l5 5V4L7 9H3z" fill={colors.text.primary} />
              {soundOn ? (
                <>
                  <path d="M16 8a5 5 0 0 1 0 8" fill="none" stroke={colors.copper.landing} strokeWidth={2} strokeLinecap="round" />
                  <path d="M18.5 5.5a8.5 8.5 0 0 1 0 13" fill="none" stroke={colors.copper.landing} strokeWidth={2} strokeLinecap="round" />
                </>
              ) : (
                <path d="M16 9l5 6M21 9l-5 6" fill="none" stroke={colors.text.muted} strokeWidth={2} strokeLinecap="round" />
              )}
            </svg>
          </span>
          <span>{SOUND_DESIGN.soundLabel}</span>
        </button>

        <div style={{ position: 'absolute', left: 'clamp(22px,5vw,84px)', bottom: 'clamp(40px,8vh,96px)', right: 'clamp(22px,5vw,84px)' }}>
          <div className={heroTextClass} style={{ margin: '0 0 16px', fontFamily: typography.font.mono, fontWeight: typography.weight.semibold, fontSize: '13px', lineHeight: 1, letterSpacing: '0.32em', textTransform: 'uppercase', color: colors.copper.warm, textIndent: '0.32em' }}>
            {SOUND_DESIGN.heroEyebrow}
          </div>
          <h1
            className={heroTextClass}
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.black,
              fontSize: 'clamp(44px, 9.5vw, 168px)',
              lineHeight: 0.86,
              letterSpacing: '-0.03em',
              color: colors.heroTitle.fill,
              WebkitTextStroke: colors.heroTitle.stroke,
              textShadow: '0 4px 60px rgba(0,0,0,.55)',
            }}
          >
            {SOUND_DESIGN.heroTitle}
          </h1>
          <p
            className={heroTextClass}
            style={{
              margin: '22px 0 0',
              maxWidth: '640px',
              fontFamily: typography.font.body,
              fontWeight: typography.weight.regular,
              fontSize: '17px',
              lineHeight: 1.7,
              color: 'rgba(241,238,232,.84)',
              textWrap: 'pretty',
            }}
          >
            {SOUND_DESIGN.heroIntro}
          </p>
        </div>
      </section>

      {/* GALLERY */}
      <section id="reel" style={{ background: colors.surface.section, padding: 'clamp(20px,3vh,40px) 30px clamp(70px,11vh,130px)' }}>
        <div style={{ maxWidth: '1780px', margin: '0 auto' }}>
          <div data-reveal style={{ marginBottom: '34px' }}>
          </div>
          <div data-grid style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '28px' }}>
            {SD_VIDEOS.map((entry) => (
              <div data-reveal key={entry.id}>
                <GalleryCard entry={entry} onOpen={() => setOpenId(entry.id)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: colors.surface.section, padding: 'clamp(40px,6vh,70px) 30px clamp(52px,8vh,90px)', borderTop: `1px solid ${colors.border.hair}` }}>
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
            {SOUND_DESIGN.ctaTitle}
          </h2>
          <p data-reveal style={{ margin: '16px auto 0', maxWidth: '460px', fontFamily: typography.font.body, fontWeight: typography.weight.regular, fontSize: '17px', lineHeight: 1.6, color: colors.text.secondary, textWrap: 'pretty' }}>
            {SOUND_DESIGN.ctaBody}
          </p>
          <div data-reveal style={{ marginTop: '24px' }}>
            <Button to={ROUTES.contact} variant="primary" style={{ padding: '16px 32px' }}>
              {SOUND_DESIGN.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      {openEntry && <VideoModal entry={openEntry} onClose={() => setOpenId(null)} />}
    </div>
  );
}
