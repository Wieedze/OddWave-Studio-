// Site footer — sitemap grid + monogram + legal caption + FR/EN switch.
// Mirrors the landing footer (design-handoff/Landing OddWave GSAP.dc.html).

import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { MonoLabel } from '@/design-system/primitives';
import { colors, typography, spacing } from '@/design-system/tokens';
import { FOOTER_COLUMNS, SITE } from '@/content/site';
import { ROUTES } from '@/content/navigation';

export function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        background: colors.surface.section,
        padding: '64px 30px 46px',
        borderTop: `1px solid ${colors.border.hair}`,
      }}
    >
      <nav
        aria-label="Plan du site"
        style={{
          maxWidth: spacing.layout.contentMax,
          margin: '0 auto 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '36px 24px',
        }}
      >
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.heading} style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <MonoLabel as="div" color={colors.text.fainter} size="11px" tracking="0.16em" style={{ marginBottom: '4px' }}>
              {column.heading}
            </MonoLabel>
            {column.links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                style={{
                  fontFamily: typography.font.body,
                  fontWeight: typography.weight.medium,
                  fontSize: '14px',
                  lineHeight: 1,
                  color: 'rgba(241,238,232,.78)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div
        style={{
          maxWidth: '100%',
          margin: '0',
          paddingTop: '34px',
          borderTop: `1px solid ${colors.border.hair}`,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '18px',
        }}
      >
        <Link to={ROUTES.home} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Logo size={43} stroke={colors.text.primary} />
          <span
            style={{
              fontFamily: typography.font.display,
              fontWeight: typography.weight.bold,
              fontSize: '14px',
              lineHeight: 1,
              letterSpacing: '-0.01em',
              color: colors.text.primary,
            }}
          >
            {SITE.name}
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: typography.font.mono,
              fontWeight: typography.weight.semibold,
              fontSize: '12px',
              lineHeight: 1,
              letterSpacing: '0.06em',
              color: 'rgba(241,238,232,.45)',
            }}
          >
            <span style={{ color: colors.text.primary, cursor: 'pointer' }}>FR</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ cursor: 'pointer' }}>EN</span>
          </span>
          <MonoLabel as="div" color={colors.text.fainter} size="12px" tracking="0.08em" style={{ textTransform: 'none' }}>
            {SITE.copyright}
          </MonoLabel>
        </div>
      </div>
    </footer>
  );
}
