// Contact — request form + direct channels. Recreated from
// design-handoff/Contact OddWave.dc.html. Hero with bottom-left title, a two
// column grid (form / channels), and the "Message envoyé." confirmation state.

import { useState } from 'react';
import { Logo } from '@/components';
import { MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { usePageMotion } from '@/hooks';
import { CONTACT, CONTACT_CHANNELS, type ContactChannel } from '@/content/contact';
import { ContactForm } from './ContactForm';
import './ContactPage.css';

function ChannelRow({ channel, first }: { channel: ContactChannel; first: boolean }) {
  const inner = (
    <>
      <div style={{ flex: 1, minWidth: 0 }}>
        <MonoLabel as="div" size="11px" tracking="0.1em" color={colors.text.faint} style={{ marginBottom: '7px' }}>
          {channel.label}
        </MonoLabel>
        <div className="ow-channel-val" style={{ wordBreak: 'break-word' }}>
          {channel.value}
        </div>
      </div>
      {channel.href && (
        <span className="ow-channel-arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  const firstStyle = first ? { borderTop: 'none', paddingTop: '18px' } : undefined;

  if (!channel.href) {
    return (
      <div className="ow-channel" style={{ cursor: 'default', ...firstStyle }}>
        {inner}
      </div>
    );
  }
  return (
    <a
      className="ow-channel"
      href={channel.href}
      style={firstStyle}
      {...(channel.external ? { target: '_blank', rel: 'noopener' } : {})}
    >
      {inner}
    </a>
  );
}

export function ContactPage() {
  const ref = usePageMotion<HTMLDivElement>();
  const [sent, setSent] = useState(false);

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
            background: "url('/assets/session.jpg') center 40% / cover no-repeat",
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
            background: 'radial-gradient(120% 95% at 18% 92%,rgba(11,12,15,.6) 0%,transparent 52%)',
          }}
        />
        <div style={{ position: 'absolute', left: 'clamp(22px,5vw,84px)', bottom: 'clamp(40px,8vh,96px)', right: 'clamp(22px,5vw,84px)' }}>
          <div data-hero-eyebrow style={{ margin: '0 0 16px' }}>
            <MonoLabel size="13px" tracking="0.32em" color={colors.copper.warm} style={{ textIndent: '0.32em' }}>
              {CONTACT.heroEyebrow}
            </MonoLabel>
          </div>
          <h1
            data-hero-title
            style={{
              margin: 0,
              fontFamily: typography.font.display,
              fontWeight: typography.weight.black,
              fontSize: 'clamp(44px, 9vw, 150px)',
              lineHeight: 0.86,
              letterSpacing: '-0.03em',
              color: colors.text.primaryWarm,
              textWrap: 'balance',
              textShadow: '0 4px 60px rgba(0,0,0,.55)',
            }}
          >
            {CONTACT.heroTitle}
          </h1>
        </div>
      </section>

      {/* GRID : FORM + CHANNELS */}
      <section style={{ padding: 'clamp(56px,9vh,110px) 30px clamp(80px,12vh,140px)', background: colors.surface.section }}>
        <div
          data-contact-grid
          style={{
            maxWidth: '1180px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.25fr .75fr',
            gap: 'clamp(50px,7vw,110px)',
            alignItems: 'start',
          }}
        >
          {/* FORM / CONFIRMATION */}
          <div data-reveal>
            {sent ? (
              <div style={{ padding: '48px 40px', borderRadius: '16px', background: 'rgba(194,78,55,.07)', border: '1px solid rgba(194,78,55,.3)' }}>
                <div style={{ width: '46px', height: '46px', marginBottom: '22px' }}>
                  <Logo size={46} stroke={colors.copper.landing} />
                </div>
                <h3
                  style={{
                    margin: '0 0 12px',
                    fontFamily: typography.font.display,
                    fontWeight: typography.weight.bold,
                    fontSize: '28px',
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: colors.text.primaryWarm,
                  }}
                >
                  {CONTACT.confirmTitle}
                </h3>
                <p
                  style={{
                    margin: 0,
                    maxWidth: '420px',
                    fontFamily: typography.font.body,
                    fontWeight: typography.weight.regular,
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: colors.text.secondary,
                    textWrap: 'pretty',
                  }}
                >
                  {CONTACT.confirmBody}
                </p>
              </div>
            ) : (
              <ContactForm onSubmitted={() => setSent(true)} />
            )}
          </div>

          {/* CHANNELS */}
          <div data-reveal>
            <MonoLabel as="div" size="12px" tracking="0.2em" color={colors.copper.landing} style={{ marginBottom: '8px' }}>
              {CONTACT.channelsLabel}
            </MonoLabel>
            {CONTACT_CHANNELS.map((channel, i) => (
              <ChannelRow key={channel.label} channel={channel} first={i === 0} />
            ))}
            <div style={{ borderTop: `1px solid ${colors.border.base}` }} />
            <p
              style={{
                margin: '26px 0 0',
                fontFamily: typography.font.body,
                fontWeight: typography.weight.regular,
                fontSize: '14px',
                lineHeight: 1.7,
                color: colors.text.faint,
                textWrap: 'pretty',
              }}
            >
              {CONTACT.note}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
