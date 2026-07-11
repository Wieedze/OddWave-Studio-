// Le Matériel — gear showcase. Recreated from design-handoff/Materiel OddWave.dc.html.
// Hero, featured pieces grid, full inventory by category, detail close-ups, CTA.

import type { CSSProperties } from 'react';
import { CtaLogo } from '@/components';
import { Button, MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { usePageMotion } from '@/hooks';
import { EQUIPMENT, FEATURED, DETAILS, GEAR_CATEGORIES, type GearItem, type GearCategory } from '@/content/equipment';
import { ROUTES } from '@/content/navigation';
import './EquipmentPage.css';

const captionTitle: CSSProperties = {
  fontFamily: typography.font.display,
  fontWeight: typography.weight.bold,
  color: colors.text.primaryWarm,
  textShadow: '0 1px 14px rgba(0,0,0,.7)',
};
const captionSub: CSSProperties = {
  fontFamily: typography.font.mono,
  fontWeight: typography.weight.semibold,
  fontSize: '12px',
  lineHeight: 1,
  letterSpacing: '0.06em',
  color: colors.copper.highlight,
  marginTop: '8px',
  textShadow: '0 1px 10px rgba(0,0,0,.8)',
};

function GearRow({ item }: { item: GearItem }) {
  return (
    <div className="ow-gear">
      {item.href ? (
        <a className="ow-gear-name" href={item.href} target="_blank" rel="noopener">
          {item.name}
        </a>
      ) : (
        <span className="ow-gear-name">{item.name}</span>
      )}
      <span className="ow-gear-tag">{item.tag}</span>
    </div>
  );
}

function CategoryBlock({ category }: { category: GearCategory }) {
  return (
    <div data-reveal>
      <MonoLabel as="div" size="12px" tracking="0.2em" color={colors.copper.landing} style={{ marginBottom: '6px' }}>
        {category.label}
      </MonoLabel>
      {category.items.map((item) => (
        <GearRow key={item.name} item={item} />
      ))}
    </div>
  );
}

export function EquipmentPage() {
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
            background: "url('/assets/rack-elysia.jpg') center 50% / cover no-repeat",
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
              fontSize: 'clamp(48px, 11vw, 170px)',
              lineHeight: 0.86,
              letterSpacing: '-0.03em',
              color: colors.text.primaryWarm,
              textShadow: '0 4px 60px rgba(0,0,0,.55)',
            }}
          >
            {EQUIPMENT.heroTitle}
          </h1>
          <div data-hero-eyebrow style={{ margin: '18px 0 0' }}>
            <MonoLabel size="13px" tracking="0.32em" color={colors.copper.warm} style={{ textIndent: '0.32em' }}>
              {EQUIPMENT.heroEyebrow}
            </MonoLabel>
          </div>
        </div>
      </section>

      {/* PIÈCES PHARES */}
      <section style={{ background: colors.surface.section, padding: 'clamp(40px,7vh,90px) 30px clamp(70px,10vh,120px)' }}>
        <div style={{ maxWidth: '1480px', margin: '0 auto' }}>
          <div data-phares style={{ display: 'grid', gridTemplateColumns: '1.3fr .7fr', gap: '22px' }}>
            <div data-reveal style={{ position: 'relative', height: 'min(80vh,760px)', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.5)' }}>
              <div style={{ position: 'absolute', inset: 0, background: `url('${FEATURED.main.image}') center/cover no-repeat` }} />
              <div style={{ position: 'absolute', left: '24px', bottom: '22px' }}>
                <div style={{ ...captionTitle, fontSize: '28px', lineHeight: 1 }}>{FEATURED.main.title}</div>
                <div style={captionSub}>{FEATURED.main.sub}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '2.1fr 1fr', gap: '22px' }}>
              <div data-reveal style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.5)', minHeight: '220px' }}>
                <div style={{ position: 'absolute', inset: 0, background: `url('${FEATURED.topRight.image}') center/cover no-repeat` }} />
                <div style={{ ...captionTitle, position: 'absolute', left: '20px', bottom: '18px', fontSize: '18px', lineHeight: 1, textShadow: '0 1px 12px rgba(0,0,0,.7)' }}>
                  {FEATURED.topRight.title}
                </div>
              </div>
              <div data-reveal style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.5)', minHeight: '140px' }}>
                <div style={{ position: 'absolute', inset: 0, background: `${colors.surface.section} url('${FEATURED.bottomRight.image}') center/cover no-repeat` }} />
                <div style={{ ...captionTitle, position: 'absolute', left: '14px', bottom: '14px', fontSize: '13px', lineHeight: 1.1, textShadow: '0 1px 12px rgba(0,0,0,.7)' }}>
                  {FEATURED.bottomRight.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVENTAIRE COMPLET */}
      <section style={{ background: colors.ink[900], padding: 'clamp(60px,9vh,110px) 30px clamp(80px,12vh,140px)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <h2
            data-reveal
            style={{
              margin: '0 0 8px',
              fontFamily: typography.font.display,
              fontWeight: typography.weight.bold,
              fontSize: 'clamp(30px,4vw,52px)',
              lineHeight: 1,
              letterSpacing: '-0.025em',
              color: colors.text.primaryWarm,
            }}
          >
            {EQUIPMENT.inventoryTitle}
          </h2>
          <p
            data-reveal
            style={{
              margin: '0 0 56px',
              maxWidth: '560px',
              fontFamily: typography.font.body,
              fontWeight: typography.weight.regular,
              fontSize: '16px',
              lineHeight: 1.7,
              color: colors.text.muted,
              textWrap: 'pretty',
            }}
          >
            {EQUIPMENT.inventoryBody}
          </p>
          <div data-cats style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,5vw,80px)' }}>
            {GEAR_CATEGORIES.map((category) => (
              <CategoryBlock key={category.label} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* DÉTAILS — gros plans */}
      <section style={{ background: colors.surface.section, padding: 'clamp(50px,8vh,100px) 30px clamp(40px,6vh,70px)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
          <div data-phares style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
            {DETAILS.map((detail) => (
              <div
                key={detail.title}
                data-reveal
                style={{ position: 'relative', height: 'min(40vh,340px)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.5)', background: colors.surface.section }}
              >
                <div style={{ position: 'absolute', inset: 0, background: `url('${detail.image}') center/${detail.fit} no-repeat` }} />
                <div style={{ position: 'absolute', left: '22px', bottom: '20px' }}>
                  <div style={{ ...captionTitle, fontSize: '19px', lineHeight: 1, textShadow: '0 1px 12px rgba(0,0,0,.7)' }}>{detail.title}</div>
                  <div style={{ ...captionSub, fontSize: '11px', marginTop: '7px' }}>{detail.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: colors.surface.section, padding: 'clamp(44px,6.5vh,74px) 30px clamp(56px,8.5vh,96px)', borderTop: `1px solid ${colors.border.hair}` }}>
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
            {EQUIPMENT.ctaTitle}
          </h2>
          <p
            data-reveal
            style={{
              margin: '16px auto 0',
              maxWidth: '460px',
              fontFamily: typography.font.body,
              fontWeight: typography.weight.regular,
              fontSize: '17px',
              lineHeight: 1.6,
              color: colors.text.secondary,
              textWrap: 'pretty',
            }}
          >
            {EQUIPMENT.ctaBody}
          </p>
          <div data-reveal style={{ marginTop: '24px' }}>
            <Button to={ROUTES.contact} variant="primary" style={{ padding: '16px 32px' }}>
              {EQUIPMENT.ctaLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
