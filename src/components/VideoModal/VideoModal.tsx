// Modal video player. Plays a real <video> when the entry has a src; otherwise
// falls back to a poster + simulated play/progress UI (placeholder tiles awaiting
// the client's real media). Ported from design-handoff/Sound Design OddWave.dc.html.

import { useEffect, useState } from 'react';
import { colors, typography } from '@/design-system/tokens';
import type { VideoEntry } from '@/models';
import './VideoModal.css';

function durToSeconds(dur: string): number {
  const [m, s] = dur.split(':');
  return (parseInt(m, 10) || 0) * 60 + (parseInt(s, 10) || 0);
}
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

interface VideoModalProps {
  entry: VideoEntry;
  onClose: () => void;
}

export function VideoModal({ entry, onClose }: VideoModalProps) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const totalSeconds = durToSeconds(entry.dur);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Simulated progress for placeholder entries (no real video).
  useEffect(() => {
    if (entry.isPlayable || !playing) return;
    const step = 100 / ((totalSeconds || 60) * 10);
    const id = setInterval(() => {
      setProgress((p) => (p + step >= 100 ? 0 : p + step));
    }, 100);
    return () => clearInterval(id);
  }, [entry.isPlayable, playing, totalSeconds]);

  const posterGradient = `linear-gradient(180deg,rgba(11,12,15,.05),rgba(11,12,15,.1)),url('${entry.posterImg}')`;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={entry.title}
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
          maxWidth: '1040px',
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#101116',
          border: `1px solid ${colors.border.base}`,
          boxShadow: '0 40px 120px rgba(0,0,0,.7)',
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
          {entry.isPlayable ? (
            <video
              src={entry.src}
              poster={entry.posterImg}
              controls
              autoPlay
              playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
            />
          ) : (
            <>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: posterGradient, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.62)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(11,12,15,.2) 0%,transparent 35%,rgba(11,12,15,.55) 100%)' }} />
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause' : 'Lecture'}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  background: 'rgba(194,78,55,.92)',
                  border: '1.5px solid rgba(255,255,255,.3)',
                  cursor: 'pointer',
                  boxShadow: '0 12px 40px rgba(194,78,55,.4)',
                  color: colors.text.primaryWarm,
                  fontFamily: typography.font.mono,
                  fontWeight: typography.weight.bold,
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                }}
              >
                {playing ? '❙❙' : '►'}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
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
        </div>

        <div style={{ padding: '18px 22px 22px' }}>
          {!entry.isPlayable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{ position: 'relative', flex: 1, height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,.14)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progress.toFixed(1)}%`, background: colors.copper.landing, borderRadius: '2px' }} />
              </div>
              <div style={{ flex: 'none', fontFamily: typography.font.mono, fontWeight: typography.weight.semibold, fontSize: '12px', letterSpacing: '0.04em', color: colors.text.muted }}>
                {formatTime((totalSeconds * progress) / 100)} / {entry.dur}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <div style={{ fontFamily: typography.font.mono, fontWeight: typography.weight.semibold, fontSize: '11px', lineHeight: 1, letterSpacing: '0.16em', textTransform: 'uppercase', color: colors.copper.landing, marginBottom: '9px' }}>
                {entry.cat}
              </div>
              <h3 style={{ margin: 0, fontFamily: typography.font.display, fontWeight: typography.weight.extrabold, fontSize: 'clamp(22px,3vw,34px)', lineHeight: 1, letterSpacing: '-0.02em', color: colors.text.primaryWarm }}>
                {entry.title}
              </h3>
              <p style={{ margin: '9px 0 0', maxWidth: '520px', fontFamily: typography.font.body, fontWeight: typography.weight.regular, fontSize: '14px', lineHeight: 1.6, color: colors.text.muted, textWrap: 'pretty' }}>
                {entry.note}
              </p>
            </div>
            <div style={{ flex: 'none', display: 'flex', alignItems: 'flex-end', gap: '4px', height: '30px' }}>
              <span className="ow-eq-bar" style={{ animationDelay: '0s' }} />
              <span className="ow-eq-bar" style={{ animationDelay: '.15s' }} />
              <span className="ow-eq-bar" style={{ animationDelay: '.3s' }} />
              <span className="ow-eq-bar" style={{ animationDelay: '.45s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
