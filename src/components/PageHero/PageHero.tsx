// Shared hero used by the inner pages. Big display title + mono eyebrow over an
// optional full-bleed photo, with the standard hero veils. Motion is driven by
// the page-level usePageMotion via data-hero-* attributes.

import { MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';

interface PageHeroProps {
  title: string;
  eyebrow: string;
  /** Optional background image under /assets. */
  image?: string;
  /** CSS background-position. */
  focus?: string;
}

export function PageHero({ title, eyebrow, image, focus = 'center 40%' }: PageHeroProps) {
  return (
    <section
      id="top"
      data-hero
      style={{ position: 'relative', height: '78vh', minHeight: '560px', width: '100%', overflow: 'hidden', background: colors.ink[900] }}
    >
      {image && (
        <div
          data-hero-img
          style={{
            position: 'absolute',
            inset: '-22% 0 -22% 0',
            height: '144%',
            background: `url('${image}') ${focus} / cover no-repeat`,
            willChange: 'transform',
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg,rgba(8,9,12,.7) 0%,rgba(8,9,12,.25) 38%,rgba(8,9,12,.4) 70%,#0B0C0F 100%)',
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
          gap: '18px',
        }}
      >
        <h1
          data-hero-title
          style={{
            margin: 0,
            fontFamily: typography.font.display,
            fontWeight: typography.weight.black,
            fontSize: 'clamp(44px, 9vw, 150px)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: colors.text.primaryWarm,
            textShadow: '0 2px 40px rgba(0,0,0,.35)',
          }}
        >
          {title}
        </h1>
        <div data-hero-eyebrow>
          <MonoLabel size="13px" tracking="0.32em" color={colors.copper.warm}>
            {eyebrow}
          </MonoLabel>
        </div>
      </div>
    </section>
  );
}
