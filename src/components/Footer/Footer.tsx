// Site footer — sitemap grid + monogram + legal caption + the FR/EN switch
// (a real one since September 2026; it used to be decorative markup).
// Mirrors the landing footer (design-handoff/Landing OddWave GSAP.dc.html).


import { Logo } from '@/components/Logo';
import { LocaleLink } from '@/design-system/primitives';
import { LocaleSwitch } from '@/components/LocaleSwitch';
import { MonoLabel } from '@/design-system/primitives';
import { colors, typography, spacing } from '@/design-system/tokens';
import { useText } from '@/hooks';
import { SITE, SITE_NAME } from '@/content/site';
import { ROUTES } from '@/content/navigation';

export function Footer() {
  const site = useText(SITE);

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
        aria-label={site.sitemapLabel}
        style={{
          maxWidth: spacing.layout.contentMax,
          margin: '0 auto 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '36px 24px',
        }}
      >
        {site.columns.map((column) => (
          <div key={column.heading} style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <MonoLabel as="div" color={colors.text.fainter} size="11px" tracking="0.16em" style={{ marginBottom: '4px' }}>
              {column.heading}
            </MonoLabel>
            {column.links.map((link) => {
              const linkStyle = {
                fontFamily: typography.font.body,
                fontWeight: typography.weight.medium,
                fontSize: '14px',
                lineHeight: 1,
                color: 'rgba(241,238,232,.78)',
                textDecoration: 'none',
              } as const;
              return link.external ? (
                <a key={link.label} href={link.to} target="_blank" rel="noreferrer" style={linkStyle}>
                  {link.label}
                </a>
              ) : (
                <LocaleLink key={link.label} to={link.to} style={linkStyle}>
                  {link.label}
                </LocaleLink>
              );
            })}
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
        <LocaleLink to={ROUTES.home} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
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
            {SITE_NAME}
          </span>
        </LocaleLink>

        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <LocaleSwitch label={site.languageLabel} place="footer" />
          <MonoLabel as="div" color={colors.text.fainter} size="12px" tracking="0.08em" style={{ textTransform: 'none' }}>
            {site.copyright}
          </MonoLabel>
        </div>
      </div>
    </footer>
  );
}
