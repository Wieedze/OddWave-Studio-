// Official Spotify embed in a modal. The audio streams from Spotify (nothing is
// hosted or owned here), so featuring public tracks this way is allowed.
// Accepts a track id or any open.spotify.com/track/<id> URL.

import { useEffect } from 'react';
import { colors, typography } from '@/design-system/tokens';

interface SpotifyEmbedModalProps {
  /** A Spotify URL/URI (track, album, playlist, episode) or a bare track id. */
  track: string;
  title?: string;
  onClose: () => void;
}

/** Build the embed path "<type>/<id>" from a Spotify URL/URI, or a bare track id. */
function embedPath(input: string): string {
  const m = input.match(/(track|album|playlist|episode|show)[/:]([A-Za-z0-9]+)/);
  if (m) return `${m[1]}/${m[2]}`;
  return `track/${input}`;
}

export function SpotifyEmbedModal({ track, title, onClose }: SpotifyEmbedModalProps) {
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
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '560px' }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          style={{
            position: 'absolute',
            top: '-46px',
            right: 0,
            width: '40px',
            height: '40px',
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>
        <iframe
          title={title ?? 'Spotify'}
          src={src}
          width="100%"
          height="352"
          style={{ border: 0, borderRadius: '14px', boxShadow: '0 40px 120px rgba(0,0,0,.7)' }}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>
    </div>
  );
}
