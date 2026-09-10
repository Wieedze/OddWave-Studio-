// Fullscreen photo viewer. Opens from a gallery tile, steps through the set with
// the side arrows, the ← / → keys or a horizontal swipe, and closes on backdrop,
// × or Escape. Shares VideoModal's modal language (blurred overlay, round
// controls) so both readers feel like the same object.

import { useCallback, useEffect, useRef } from 'react';
import type { CSSProperties, TouchEvent } from 'react';
import { colors, typography } from '@/design-system/tokens';
import type { Photo } from '@/models';
import './PhotoLightbox.css';

/** Horizontal travel, in px, past which a swipe counts as a step. */
const SWIPE_THRESHOLD = 44;

const control: CSSProperties = {
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '46px',
  height: '46px',
  borderRadius: '50%',
  background: 'rgba(11,12,15,.55)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  border: `1px solid ${colors.border.strong}`,
  color: colors.text.primary,
  fontFamily: typography.font.body,
  fontSize: '20px',
  lineHeight: 1,
  cursor: 'pointer',
  zIndex: 1,
};

interface PhotoLightboxProps {
  photos: readonly Photo[];
  /** Index of the photo on screen. */
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export function PhotoLightbox({ photos, index, onIndexChange, onClose }: PhotoLightboxProps) {
  const count = photos.length;
  const photo = photos[index];
  const swipeStartX = useRef<number | null>(null);

  /** Steps through the set, wrapping at both ends. */
  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + count) % count),
    [index, count, onIndexChange],
  );

  // Escape closes; the arrow keys step through the set.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Warm both neighbours so stepping never shows an empty frame.
  useEffect(() => {
    if (count < 2) return;
    for (const i of [(index + 1) % count, (index - 1 + count) % count]) {
      const preload = new Image();
      preload.src = photos[i].large;
    }
  }, [index, count, photos]);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    swipeStartX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = swipeStartX.current;
    swipeStartX.current = null;
    if (start === null) return;
    const travel = e.changedTouches[0].clientX - start;
    if (Math.abs(travel) > SWIPE_THRESHOLD) go(travel < 0 ? 1 : -1);
  };

  return (
    <div
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        padding: 'clamp(20px,4vw,44px) clamp(20px,7vw,112px)',
        background: 'rgba(8,9,11,.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* The stage owns the free space; the image sizes itself inside it so the
          radius and shadow hug the photo instead of an oversized flex box.
          Clicks on the stage (the empty margin around the photo) still close. */}
      <div style={{ flex: '1 1 auto', minHeight: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          // Keyed on the source so each step remounts the element and replays the
          // entrance; without it React would reuse the node and nothing would move.
          key={photo.large}
          className="ow-lightbox-img"
          src={photo.large}
          alt={photo.alt}
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'block',
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '10px',
            boxShadow: '0 40px 120px rgba(0,0,0,.7)',
          }}
        />
      </div>

      {count > 1 && (
        <div
          style={{
            flex: 'none',
            fontFamily: typography.font.mono,
            fontWeight: typography.weight.semibold,
            fontSize: '12px',
            lineHeight: 1,
            letterSpacing: '0.16em',
            color: colors.text.muted,
          }}
        >
          {index + 1} / {count}
        </div>
      )}

      <button
        type="button"
        className="ow-lightbox-ctrl"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Fermer"
        style={{ ...control, top: 'clamp(16px,3vw,28px)', right: 'clamp(16px,3vw,28px)' }}
      >
        ×
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            className="ow-lightbox-ctrl"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Photo précédente"
            style={{ ...control, left: 'clamp(12px,2.4vw,34px)', top: '50%', transform: 'translateY(-50%)' }}
          >
            ←
          </button>
          <button
            type="button"
            className="ow-lightbox-ctrl"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Photo suivante"
            style={{ ...control, right: 'clamp(12px,2.4vw,34px)', top: '50%', transform: 'translateY(-50%)' }}
          >
            →
          </button>
        </>
      )}
    </div>
  );
}
