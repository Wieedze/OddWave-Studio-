// Portfolio rack — skeuomorphic chassis from design-handoff/Portfolio Synth.dc.html.
// The real release covers live on the "screen"; clicking one opens the official
// Spotify embed (the audio streams from Spotify). The VU meters keep an ambient
// idle motion; the GAIN knob is decorative (drag still rotates the needle).

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from 'react';
import { Logo } from '@/components/Logo';
import { SpotifyEmbedModal } from '@/components/SpotifyEmbedModal';
import { SYNTH, SYNTH_COVERS, SYNTH_FILTERS, matchesFilter, type ChannelFilter, type SynthCover } from '@/content/portfolioSynth';
import './PortfolioSynth.css';

const MONO = "'JetBrains Mono', monospace";

function gainAngle(gain: number): number {
  return gain * 270 - 135;
}

export function PortfolioSynth() {
  const needleL = useRef<HTMLSpanElement>(null);
  const needleR = useRef<HTMLSpanElement>(null);
  const gainNeedle = useRef<HTMLSpanElement>(null);
  const gainRef = useRef<number>(SYNTH.defaultGain);

  const [filter, setFilter] = useState<ChannelFilter['key']>('all');
  const [hover, setHover] = useState<{ title: string; artist: string; tag: string } | null>(null);
  const [open, setOpen] = useState<SynthCover | null>(null);

  // Ambient VU motion (client only) — no audio engine; Spotify handles playback.
  useEffect(() => {
    if (gainNeedle.current) gainNeedle.current.style.transform = `rotate(${gainAngle(gainRef.current).toFixed(1)}deg)`;

    let raf = 0;
    let cl = 0.2;
    let cr = 0.2;
    const t0 = performance.now();
    const ang = (v: number) => -32 + Math.min(1, v) * 62;

    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const env = 0.17 + 0.08 * Math.sin(t * 1.3) + 0.04 * Math.sin(t * 3.1 + 1.0);
      const tl = Math.max(0.04, env * (0.95 + 0.05 * Math.sin(t * 4.0)));
      const tr = Math.max(0.04, env * (0.95 + 0.05 * Math.sin(t * 4.0 + 0.7)));
      cl += (tl - cl) * (tl > cl ? 0.42 : 0.085);
      cr += (tr - cr) * (tr > cr ? 0.42 : 0.085);
      if (needleL.current) needleL.current.style.transform = `rotate(${ang(cl).toFixed(2)}deg)`;
      if (needleR.current) needleR.current.style.transform = `rotate(${ang(cr).toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function openTrack(cover: SynthCover): void {
    if (cover.spotify) setOpen(cover);
  }

  function onGainDown(e: ReactPointerEvent): void {
    e.preventDefault();
    const startY = e.clientY;
    const startG = gainRef.current;
    const move = (ev: globalThis.PointerEvent) => {
      const g = Math.max(0, Math.min(1, startG + (startY - ev.clientY) / 160));
      gainRef.current = g;
      if (gainNeedle.current) gainNeedle.current.style.transform = `rotate(${gainAngle(g).toFixed(1)}deg)`;
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  const covers = SYNTH_COVERS.filter((c) => matchesFilter(c.tag, filter)).map((c) => ({ ...c, isOpen: c.title === open?.title }));

  let nowShowing: string;
  if (hover) nowShowing = `${hover.title.toUpperCase()} · ${hover.artist}  ·  ${hover.tag.toUpperCase()}`;
  else nowShowing = SYNTH.readoutIdle;

  const knob = (rotate: number, label: string, draggable = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '9px' }}>
      <span
        onPointerDown={draggable ? onGainDown : undefined}
        style={{
          position: 'relative',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: draggable ? 'conic-gradient(from 210deg,#42454C,#1A1B1F,#42454C)' : 'conic-gradient(from 120deg,#42454C,#1A1B1F,#42454C)',
          boxShadow: 'inset 0 2px 3px rgba(255,255,255,.18),inset 0 -3px 6px rgba(0,0,0,.6),0 3px 7px rgba(0,0,0,.6)',
          cursor: draggable ? 'ns-resize' : 'default',
          touchAction: 'none',
        }}
      >
        <span style={{ position: 'absolute', inset: '8px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 30%,#3A3D44,#202227)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.5)' }} />
        <span
          ref={draggable ? gainNeedle : undefined}
          style={{ position: 'absolute', top: '9px', left: '50%', width: '3px', height: '9px', marginLeft: '-1.5px', background: '#C28E57', borderRadius: '2px', boxShadow: '0 0 4px rgba(194,142,87,.7)', transformOrigin: '50% 15px', transform: `rotate(${rotate}deg)` }}
        />
      </span>
      <span style={{ font: `700 8px/1 ${MONO}`, letterSpacing: '0.22em', color: '#8A8C92' }}>{label}</span>
    </div>
  );

  const seam = <div style={{ height: '1px', margin: '22px 0 18px', background: 'linear-gradient(90deg,transparent,rgba(0,0,0,.55) 12%,rgba(0,0,0,.55) 88%,transparent)', boxShadow: '0 1px 0 rgba(255,255,255,.06)' }} />;

  const vuMeter = (label: string, ref: RefObject<HTMLSpanElement | null>, initial: number) => (
    <div style={{ position: 'relative', width: '120px', height: '58px', borderRadius: '8px', overflow: 'hidden', background: 'linear-gradient(180deg,#EFE7D2,#DFD3B6)', boxShadow: 'inset 0 2px 6px rgba(120,90,50,.4),inset 0 0 0 1px rgba(120,90,50,.35)' }}>
      <span style={{ position: 'absolute', top: '7px', left: '10px', font: `700 7px/1 ${MONO}`, letterSpacing: '0.14em', color: '#8A6A3C' }}>{label}</span>
      <span style={{ position: 'absolute', bottom: '-6px', right: '14px', font: `700 7px/1 ${MONO}`, color: '#9A2B1C' }}>+3</span>
      <span ref={ref} style={{ position: 'absolute', left: '50%', bottom: '8px', width: '1.5px', height: '40px', marginLeft: '-.75px', background: '#9A2B1C', transformOrigin: 'bottom', transform: `rotate(${initial}deg)`, willChange: 'transform', boxShadow: '0 0 3px rgba(154,43,28,.5)' }} />
      <span style={{ position: 'absolute', left: '50%', bottom: '6px', width: '8px', height: '8px', marginLeft: '-4px', borderRadius: '50%', background: '#2A2018' }} />
    </div>
  );

  const ear = (side: 'left' | 'right') => (
    <div
      style={{
        position: 'relative',
        borderRadius: side === 'left' ? '18px 0 0 18px' : '0 18px 18px 0',
        backgroundColor: '#5A3318',
        backgroundImage:
          'repeating-linear-gradient(' + (side === 'left' ? '91deg' : '89deg') + ',rgba(28,14,6,0) 0px,rgba(28,14,6,0) 4px,rgba(28,14,6,.5) 5px,rgba(28,14,6,0) 7px,rgba(120,76,40,.3) 10px,rgba(120,76,40,0) 13px),linear-gradient(180deg,#7C4C2A 0%,#5A3318 55%,#3F230E 100%)',
        boxShadow: (side === 'left' ? 'inset 1px 0 0 rgba(231,201,175,.22)' : 'inset -1px 0 0 rgba(231,201,175,.22)') + ',inset ' + (side === 'left' ? '-3px' : '3px') + ' 0 9px rgba(0,0,0,.55)',
      }}
    >
      <span style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)', width: '13px', height: '13px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%,#F0D6B4,#7A4720)', boxShadow: 'inset 0 1px 1px rgba(0,0,0,.45),0 1px 0 rgba(255,255,255,.1)' }} />
      <span style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', width: '13px', height: '13px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%,#F0D6B4,#7A4720)', boxShadow: 'inset 0 1px 1px rgba(0,0,0,.45),0 1px 0 rgba(255,255,255,.1)' }} />
      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '3px', height: '150px', borderRadius: '3px', background: 'linear-gradient(90deg,rgba(0,0,0,.42),rgba(0,0,0,.55))', boxShadow: '1px 0 0 rgba(231,201,175,.12),inset 0 0 2px rgba(0,0,0,.6)' }} />
    </div>
  );

  return (
    <>
    <div className="ow-synth-stage" style={{ height: '90vh', minHeight: '760px', display: 'flex', alignItems: 'stretch', justifyContent: 'center', fontFamily: MONO }}>
      <div className="ow-synth-rack" style={{ position: 'relative', width: '100%', maxWidth: '1640px', height: '100%', display: 'grid', gridTemplateColumns: '36px 1fr 36px', borderRadius: '18px', background: '#0B0C0F', boxShadow: '0 50px 120px rgba(0,0,0,.72)' }}>
        {ear('left')}

        {/* MAIN FACEPLATE */}
        <div className="ow-synth-face" style={{ position: 'relative', padding: '32px 48px 30px', background: 'linear-gradient(180deg,#34363C 0%,#26282D 46%,#1D1F23 100%)', backgroundImage: 'repeating-linear-gradient(180deg,rgba(255,255,255,.04) 0px,rgba(255,255,255,.04) 1px,transparent 1px,transparent 3px)', boxShadow: 'inset 0 2px 0 rgba(255,255,255,.16),inset 0 -14px 34px rgba(0,0,0,.6)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(180deg,rgba(255,255,255,.07),transparent)', pointerEvents: 'none' }} />

          {/* HEADER */}
          <div className="ow-synth-head" style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ flex: 'none', width: 'clamp(46px,5.4vw,66px)', height: 'clamp(46px,5.4vw,66px)', display: 'block' }}>
                  <Logo stroke="#C28E57" strokeWidth={24} size="100%" style={{ filter: 'drop-shadow(0 0 6px rgba(194,142,87,.45))' }} />
                </span>
                <div style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: 'clamp(38px,4.8vw,60px)', lineHeight: 0.86, letterSpacing: '0.012em', color: '#EFE8D8', textShadow: '0 2px 0 rgba(0,0,0,.55),0 -1px 0 rgba(255,255,255,.12)' }}>{SYNTH.brand}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                <span style={{ width: '54px', height: '2px', background: 'linear-gradient(90deg,#C28E57,transparent)', borderRadius: '2px' }} />
                <span style={{ font: `700 10px/1 ${MONO}`, letterSpacing: '0.4em', color: '#C28E57' }}>{SYNTH.subtitle}</span>
              </div>
            </div>
            <div style={{ flex: 'none', display: 'flex', alignItems: 'flex-end', gap: '22px', paddingBottom: '4px' }}>
              {knob(gainAngle(SYNTH.defaultGain), 'GAIN', true)}
              {knob(58, 'TONE')}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '9px', paddingBottom: '5px' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%,#FFD9A6,#C28E57)', boxShadow: '0 0 10px rgba(194,142,87,.9),inset 0 -1px 2px rgba(120,70,20,.6)', animation: 'owLedPulse 2.4s ease-in-out infinite' }} />
                <span style={{ font: `700 8px/1 ${MONO}`, letterSpacing: '0.22em', color: '#8A8C92' }}>PWR</span>
              </div>
            </div>
          </div>

          {seam}

          {/* CHANNEL SELECTOR + READOUT */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginBottom: '18px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ font: `700 8px/1 ${MONO}`, letterSpacing: '0.22em', color: '#6E7077', marginRight: '2px' }}>CANAL</span>
              {SYNTH_FILTERS.map((f) => {
                const active = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFilter(f.key)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '7px 13px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      font: `700 9px/1 ${MONO}`,
                      letterSpacing: '0.14em',
                      transition: 'all .2s',
                      ...(active
                        ? { background: 'linear-gradient(180deg,#33363C,#222428)', color: '#EFE8D8', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18),0 2px 5px rgba(0,0,0,.5)' }
                        : { background: 'linear-gradient(180deg,#202227,#191A1E)', color: '#7C7E84', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.05),inset 0 -2px 4px rgba(0,0,0,.5)' }),
                    }}
                  >
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', ...(active ? { background: 'radial-gradient(circle at 38% 32%,#FFD9A6,#C28E57)', boxShadow: '0 0 7px rgba(194,142,87,.95)' } : { background: '#15161A', boxShadow: 'inset 0 1px 1px rgba(0,0,0,.8)' }) }} />
                    {f.label}
                  </button>
                );
              })}
            </div>
            <div style={{ flex: 1, minWidth: '230px', maxWidth: '400px', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 14px', borderRadius: '7px', background: '#0A0B0D', boxShadow: 'inset 0 2px 6px rgba(0,0,0,.9)', border: '1px solid #000' }}>
              <span style={{ flex: 'none', width: '7px', height: '7px', borderRadius: '50%', background: '#C28E57', boxShadow: '0 0 7px rgba(194,142,87,.9)', animation: open ? 'owLedPulse 1s ease-in-out infinite' : undefined }} />
              <span style={{ font: `700 10px/1.3 ${MONO}`, letterSpacing: '0.12em', color: '#C9A878', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nowShowing}</span>
            </div>
          </div>

          {/* SCREEN */}
          <div style={{ position: 'relative', borderRadius: '14px', padding: '11px', background: 'linear-gradient(180deg,#101114,#0A0B0D)', boxShadow: 'inset 0 3px 10px rgba(0,0,0,.9),0 1px 0 rgba(255,255,255,.1)', border: '1px solid #000', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ position: 'absolute', top: '9px', left: '9px', right: '9px', bottom: '9px', borderRadius: '8px', pointerEvents: 'none', zIndex: 3, background: 'linear-gradient(180deg,rgba(194,142,87,.05),transparent 26%)', boxShadow: 'inset 0 0 40px rgba(0,0,0,.6)' }} />
            <div className="ow-synth-scr" style={{ position: 'relative', zIndex: 1, flex: 1, minHeight: 0, overflowY: 'auto', borderRadius: '6px', padding: '2px', backgroundImage: 'radial-gradient(rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '22px 22px' }}>
              <div className="ow-synth-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px', alignContent: 'start' }}>
                {covers.map((cover) => (
                  <div
                    key={cover.title}
                    className="cov"
                    onClick={() => openTrack(cover)}
                    onMouseEnter={() => setHover({ title: cover.title, artist: cover.artist, tag: cover.tag })}
                    onMouseLeave={() => setHover(null)}
                  >
                    <div className="cov-art" style={{ backgroundImage: cover.image ? `url('${cover.image}')` : cover.art }} />
                    <div className="cov-tag">{cover.tag}</div>
                    <div className="cov-play">▶</div>
                    {cover.isOpen && (
                      <div style={{ position: 'absolute', top: '9px', right: '9px', display: 'flex', alignItems: 'flex-end', gap: '2.5px', height: '14px', padding: '4px 5px', borderRadius: '4px', background: 'rgba(11,12,15,.72)', backdropFilter: 'blur(4px)', zIndex: 5 }}>
                        <span className="ow-eq-mini" />
                        <span className="ow-eq-mini" style={{ animationDelay: '-.23s' }} />
                        <span className="ow-eq-mini" style={{ animationDelay: '-.46s' }} />
                      </div>
                    )}
                    <div className="cov-meta">
                      <div style={{ font: "700 13px/1.1 'Cabinet Grotesk'", letterSpacing: '-.01em', color: '#F6EEE6' }}>{cover.title}</div>
                      <div style={{ marginTop: '3px', font: "500 10px/1.2 'Manrope'", color: 'rgba(241,238,232,.72)' }}>{cover.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {seam}

          {/* FOOTER : VU meters + output */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            {vuMeter('VU · L', needleL, -30)}
            {vuMeter('VU · R', needleR, -22)}
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ font: `700 9px/1 ${MONO}`, letterSpacing: '0.06em', color: '#C9A878', minWidth: '28px' }}>0:00</span>
                <span style={{ position: 'relative', flex: 1, height: '6px', borderRadius: '5px', background: '#101114', boxShadow: 'inset 0 2px 4px rgba(0,0,0,.9)', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '0%', borderRadius: '5px', background: 'linear-gradient(90deg,#8A5A2C,#C28E57 70%,#E7C9AF)' }} />
                </span>
                <span style={{ font: `700 9px/1 ${MONO}`, letterSpacing: '0.06em', color: '#5E6066', minWidth: '28px', textAlign: 'right' }}>0:30</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '11px' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%,#3A3D44,#0E0F12)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,.9),0 1px 0 rgba(255,255,255,.1)' }} />
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%,#3A3D44,#0E0F12)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,.9),0 1px 0 rgba(255,255,255,.1)' }} />
                <span style={{ font: `700 9px/1 ${MONO}`, letterSpacing: '0.18em', color: '#5E6066' }}>L · R</span>
              </div>
            </div>
          </div>
        </div>

        {ear('right')}
      </div>
    </div>
    {open?.spotify && (
      <SpotifyEmbedModal track={open.spotify} title={open.title} artist={open.artist} work={open.tag} type={open.type} onClose={() => setOpen(null)} />
    )}
    </>
  );
}
