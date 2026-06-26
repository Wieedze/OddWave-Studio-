// AudioSynthService — the Web Audio engine behind the Portfolio rack player.
// Ported from design-handoff/Portfolio Synth.dc.html. Clicking a cover generates
// a short looping track (sustained pad + a step sequencer of kick/hat/snare/pluck)
// seeded from the title, routed through a master gain and stereo analysers for the
// VU meters. No real audio files — everything is synthesized live.

export interface SynthTrack {
  title: string;
}

export class AudioSynthService {
  private actx: AudioContext | null = null;
  private master: GainNode | null = null;
  private anaL: AnalyserNode | null = null;
  private anaR: AnalyserNode | null = null;
  private tdL: Uint8Array = new Uint8Array(0);
  private tdR: Uint8Array = new Uint8Array(0);
  private voices: Array<OscillatorNode> | null = null;
  private scheduleTimer: number | null = null;

  private playStart = 0;
  private nextTime = 0;
  private step = 0;
  private root = 55;
  private scale: number[] = [0, 3, 5, 7, 10];
  private beatDur = 0.5;
  private leadSeed = 0;

  previewDur: number;
  gain: number;
  playingTitle: string | null = null;

  constructor(previewDur = 30, gain = 0.9) {
    this.previewDur = previewDur;
    this.gain = gain;
  }

  private ensureAudio(): void {
    if (this.actx) return;
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const actx = new Ctor();
    this.actx = actx;
    this.master = actx.createGain();
    this.master.gain.value = 0;
    this.master.connect(actx.destination);
    const splitter = actx.createChannelSplitter(2);
    this.master.connect(splitter);
    this.anaL = actx.createAnalyser();
    this.anaL.fftSize = 512;
    this.anaL.smoothingTimeConstant = 0.3;
    this.anaR = actx.createAnalyser();
    this.anaR.fftSize = 512;
    this.anaR.smoothingTimeConstant = 0.3;
    splitter.connect(this.anaL, 0);
    splitter.connect(this.anaR, 1);
    this.tdL = new Uint8Array(this.anaL.fftSize);
    this.tdR = new Uint8Array(this.anaR.fftSize);
  }

  private hash(s: string): number {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  private rms(buf: Uint8Array): number {
    let s = 0;
    for (let i = 0; i < buf.length; i++) {
      const v = (buf[i] - 128) / 128;
      s += v * v;
    }
    return Math.min(1, Math.sqrt(s / buf.length) * 3.1);
  }

  play(track: SynthTrack): void {
    this.ensureAudio();
    const actx = this.actx;
    const master = this.master;
    if (!actx || !master) return;
    if (actx.state === 'suspended') void actx.resume();
    this.stopVoices();
    const t = actx.currentTime;
    this.playStart = t;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), t);
    master.gain.linearRampToValueAtTime(this.gain, t + 0.25);

    const seed = this.hash(track.title);
    const roots = [55, 58.27, 61.74, 65.41, 49, 73.42, 69.3, 77.78];
    this.root = roots[seed % roots.length];
    const scales = [
      [0, 3, 5, 7, 10],
      [0, 2, 3, 7, 9],
      [0, 2, 4, 7, 9],
      [0, 3, 5, 6, 10],
    ];
    this.scale = scales[(seed >> 3) % scales.length];
    const tempos = [96, 108, 116, 124, 132, 140];
    this.beatDur = 60 / tempos[(seed >> 5) % tempos.length];
    this.leadSeed = seed;

    // Sustained pad: 3 detuned voices through a lowpass with an LFO.
    this.voices = [];
    [1, 1.5, 2].forEach((mult, i) => {
      const o = actx.createOscillator();
      o.type = i === 0 ? 'sawtooth' : 'triangle';
      o.frequency.value = this.root * mult;
      o.detune.value = (i - 1) * 7;
      const f = actx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = 540;
      f.Q.value = 6;
      const g = actx.createGain();
      g.gain.value = i === 0 ? 0.05 : 0.034;
      const p = actx.createStereoPanner();
      p.pan.value = (i - 1) * 0.5;
      o.connect(f);
      f.connect(g);
      g.connect(p);
      p.connect(master);
      const lfo = actx.createOscillator();
      lfo.frequency.value = 0.07 + 0.05 * i;
      const lg = actx.createGain();
      lg.gain.value = 240;
      lfo.connect(lg);
      lg.connect(f.frequency);
      o.start();
      lfo.start();
      this.voices!.push(o, lfo);
    });

    this.step = 0;
    this.nextTime = t + 0.08;
    this.scheduleTimer = window.setInterval(() => this.scheduler(), 25);
    this.playingTitle = track.title;
  }

  private scheduler(): void {
    const actx = this.actx;
    if (!actx) return;
    const six = this.beatDur / 4;
    while (this.nextTime < actx.currentTime + 0.12) {
      this.scheduleStep(this.step, this.nextTime);
      this.nextTime += six;
      this.step++;
    }
  }

  private scheduleStep(step: number, time: number): void {
    const s = step % 16;
    if (s % 4 === 0) this.kick(time, s === 0 ? 1 : 0.78);
    if (s % 2 === 0) this.hat(time, s % 4 === 0 ? 0.16 : 0.3, (s / 2) % 2 ? 0.55 : -0.55);
    if (s === 4 || s === 12) this.snare(time);
    if ((this.leadSeed >> (s % 24)) & 1 && s % 2 === 1) {
      const deg = this.scale[(this.leadSeed + s) % this.scale.length];
      this.pluck(time, this.root * 4 * Math.pow(2, deg / 12), 0.55);
    }
  }

  private kick(time: number, amp: number): void {
    const a = this.actx!;
    const o = a.createOscillator();
    const g = a.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(150, time);
    o.frequency.exponentialRampToValueAtTime(45, time + 0.12);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(0.95 * amp, time + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.32);
    o.connect(g);
    g.connect(this.master!);
    o.start(time);
    o.stop(time + 0.36);
  }

  private noise(time: number, dur: number): AudioBufferSourceNode {
    const a = this.actx!;
    const buf = a.createBuffer(1, Math.ceil(a.sampleRate * dur), a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource();
    src.buffer = buf;
    return src;
  }

  private hat(time: number, amp: number, pan: number): void {
    const a = this.actx!;
    const dur = 0.05;
    const src = this.noise(time, dur);
    const hp = a.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7200;
    const g = a.createGain();
    g.gain.setValueAtTime(amp, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    const p = a.createStereoPanner();
    p.pan.value = pan;
    src.connect(hp);
    hp.connect(g);
    g.connect(p);
    p.connect(this.master!);
    src.start(time);
    src.stop(time + dur);
  }

  private snare(time: number): void {
    const a = this.actx!;
    const dur = 0.18;
    const src = this.noise(time, dur);
    const bp = a.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1900;
    bp.Q.value = 0.7;
    const g = a.createGain();
    g.gain.setValueAtTime(0.45, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.master!);
    src.start(time);
    src.stop(time + dur);
  }

  private pluck(time: number, freq: number, amp: number): void {
    const a = this.actx!;
    const o = a.createOscillator();
    const f = a.createBiquadFilter();
    const g = a.createGain();
    const p = a.createStereoPanner();
    o.type = 'triangle';
    o.frequency.value = freq;
    f.type = 'lowpass';
    f.frequency.setValueAtTime(3600, time);
    f.frequency.exponentialRampToValueAtTime(700, time + 0.25);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(0.17 * amp, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.45);
    p.pan.value = 0.38;
    o.connect(f);
    f.connect(g);
    g.connect(p);
    p.connect(this.master!);
    o.start(time);
    o.stop(time + 0.5);
  }

  private stopVoices(): void {
    if (this.scheduleTimer !== null) {
      clearInterval(this.scheduleTimer);
      this.scheduleTimer = null;
    }
    if (this.voices) {
      this.voices.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* already stopped */
        }
      });
      this.voices = null;
    }
  }

  stop(): void {
    if (this.actx && this.master) {
      const t = this.actx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.setValueAtTime(Math.max(0.0001, this.master.gain.value), t);
      this.master.gain.linearRampToValueAtTime(0, t + 0.15);
    }
    this.stopVoices();
    this.playingTitle = null;
  }

  toggle(track: SynthTrack): void {
    if (this.playingTitle === track.title) this.stop();
    else this.play(track);
  }

  setGain(g: number): void {
    this.gain = Math.max(0, Math.min(1, g));
    if (this.actx && this.master && this.playingTitle) {
      this.master.gain.setTargetAtTime(this.gain, this.actx.currentTime, 0.03);
    }
  }

  /** RMS levels (0..1) from the L/R analysers while playing, else null. */
  readLevels(): { l: number; r: number } | null {
    if (!this.playingTitle || !this.anaL || !this.anaR) return null;
    this.anaL.getByteTimeDomainData(this.tdL);
    this.anaR.getByteTimeDomainData(this.tdR);
    return { l: this.rms(this.tdL), r: this.rms(this.tdR) };
  }

  /** Elapsed seconds within the current looping preview, or null when idle. */
  getElapsed(): number | null {
    if (!this.playingTitle || !this.actx) return null;
    return (this.actx.currentTime - this.playStart) % this.previewDur;
  }

  dispose(): void {
    this.stopVoices();
    try {
      this.stop();
      void this.actx?.close();
    } catch {
      /* noop */
    }
    this.actx = null;
  }
}
