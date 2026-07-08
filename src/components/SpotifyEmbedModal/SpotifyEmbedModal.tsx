// Official Spotify embed in a small framed card, with a header stating the work
// the studio did on the release (mix, master, stem master, prod…). The audio
// streams from Spotify — nothing is hosted or owned here.

import { useEffect } from 'react';
import { MonoLabel } from '@/design-system/primitives';
import { colors, typography } from '@/design-system/tokens';

interface SpotifyEmbedModalProps {
  /** A Spotify URL/URI (track, album, playlist, episode) or a bare track id. */
  track: string;
  title?: string;
  artist?: string;
  /** The prestation the studio did, e.g. "Mix & Mastering". */
  work?: string;
  /** Release type, e.g. "Album" / "Ep" / "Single". */
  type?: string;
  onClose: () => void;
}

/** Build the embed path "<type>/<id>" from a Spotify URL/URI, or a bare track id. */
function embedPath(input: string): string {
  const m = input.match(/(track|album|playlist|episode|show)[/:]([A-Za-z0-9]+)/);
  if (m) return `${m[1]}/${m[2]}`;
  return `track/${input}`;
}

export function SpotifyEmbedModal({ track, title, artist, work, type, onClose }: SpotifyEmbedModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const src = `https://open.spotify.com/embed/${embedPath(track)}?theme=0`;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? 'Lecteur Spotify'}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'rgba(8,9,11,.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
          background: '#101116',
          border: `1px solid ${colors.border.base}`,
          borderRadius: '18px',
          padding: 'clamp(16px, 2.2vw, 24px)',
          boxShadow: '0 40px 120px rgba(0,0,0,.7)',
        }}
      >
        {/* Header: what the studio did */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <MonoLabel size="11px" tracking="0.18em" color={colors.copper.landing}>
                {work ?? 'Réalisation'}
              </MonoLabel>
              {type && (
                <MonoLabel size="11px" tracking="0.14em" color={colors.text.faint}>
                  · {type}
                </MonoLabel>
              )}
            </div>
            {(title || artist) && (
              <div
                style={{
                  marginTop: '8px',
                  fontFamily: typography.font.display,
                  fontWeight: typography.weight.bold,
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: colors.text.primaryWarm,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {title}
                {artist && <span style={{ color: colors.text.muted, fontWeight: typography.weight.medium }}> · {artist}</span>}
              </div>
            )}
            <div style={{ marginTop: '6px', fontFamily: typography.font.body, fontWeight: typography.weight.regular, fontSize: '12.5px', lineHeight: 1.4, color: colors.text.mutedSoft }}>
              Réalisé chez OddWave Studio
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            style={{
              flex: 'none',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,.04)',
              border: `1px solid ${colors.border.strong}`,
              color: colors.text.primary,
              fontFamily: typography.font.body,
              fontSize: '20px',
              lineHeight: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        <iframe
          title={title ?? 'Spotify'}
          src={src}
          width="100%"
          height="452"
          style={{ border: 0, borderRadius: '12px', display: 'block' }}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>
    </div>
  );
}
