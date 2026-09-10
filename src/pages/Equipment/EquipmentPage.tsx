// Le Matériel — gear showcase. Recreated from design-handoff/Materiel OddWave.dc.html,
// lightened per client feedback (July 2026): no caption subtitles, no inventory
// intro paragraph, no detail close-ups section. Client feedback (September 2026):
// the three captioned "pièces phares" gave way to a five-photo atmosphere mosaic,
// so the room is felt before the list is read, and every tile opens the
// PhotoLightbox. Hero, mosaic, inventory, CTA.

import { useState } from 'react';
import { CtaLogo, PhotoLightbox, ReviewBadge, Seo } from '@/components';
import { Button, MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';
import { usePageMotion, useText } from '@/hooks';
import { EQUIPMENT, STUDIO_GALLERY, GEAR_CATEGORIES, type GearItem, type GearCategory } from '@/content/equipment';
import { ROUTES } from '@/content/navigation';
import './EquipmentPage.css';

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
  const equipment = useText(EQUIPMENT);
  const gallery = useText(STUDIO_GALLERY);
  const gear = useText(GEAR_CATEGORIES);
  // Index of the photo open in the lightbox; null when it is closed.
  const [openPhoto, setOpenPhoto] = useState<number | null>(null);

  return (
    <div ref={ref} style={{ background: colors.ink[900], color: colors.text.primary, overflowX: 'hidden' }}>
      <Seo page="equipment" />
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
              color: colors.heroTitle.fill,
              WebkitTextStroke: colors.heroTitle.stroke,
              textShadow: '0 4px 60px rgba(0,0,0,.55)',
            }}
          >
            {equipment.heroTitle}
          </h1>
          <div data-hero-eyebrow style={{ margin: '18px 0 0' }}>
            <MonoLabel size="13px" tracking="0.32em" color={colors.copper.warm} style={{ textIndent: '0.32em' }}>
              {equipment.heroEyebrow}
            </MonoLabel>
          </div>
        </div>
      </section>

      {/* AMBIANCE DU STUDIO — mosaic, no captions (client feedback, September 2026) */}
      <section style={{ background: colors.surface.section, padding: 'clamp(40px,7vh,90px) 30px clamp(70px,10vh,120px)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {/* The container ratio sets the track heights: the lead tile spans both
              rows and lands on 4:3 (its source ratio), which leaves the four
              others at ~3:2 — the ratio the other photos were shot at. */}
          <div
            data-mosaic
            style={{
              display: 'grid',
              gridTemplateColumns: '1.9fr 1fr 1fr',
              gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
              gap: '22px',
              aspectRatio: '2.81',
            }}
          >
            {gallery.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                className="ow-photo-tile"
                data-reveal
                onClick={() => setOpenPhoto(index)}
                aria-label={equipment.enlargeLabel(photo.alt)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: 0,
                  border: 0,
                  background: 'none',
                  cursor: 'zoom-in',
                  borderRadius: index === 0 ? '18px' : '16px',
                  boxShadow: '0 30px 70px rgba(0,0,0,.5)',
                  gridRow: index === 0 ? 'span 2' : undefined,
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
            ))}
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
            {equipment.inventoryTitle}
          </h2>
          <div data-cats style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,5vw,80px)' }}>
            {gear.map((category) => (
              <CategoryBlock key={category.label} category={category} />
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
            {equipment.ctaTitle}
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
            {equipment.ctaBody}
          </p>
          <ReviewBadge />
          <div data-reveal style={{ marginTop: '24px' }}>
            <Button to={ROUTES.contact} variant="primary" style={{ padding: '16px 32px' }}>
              {equipment.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      {openPhoto !== null && (
        <PhotoLightbox
          photos={gallery}
          index={openPhoto}
          onIndexChange={setOpenPhoto}
          onClose={() => setOpenPhoto(null)}
        />
      )}
    </div>
  );
}
