// Soft piano ambient generator using Web Audio API — no external files needed.
// Plays gentle randomized arpeggios in a major key for a dreamy, romantic feel.

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let activeVoices = 0;
let schedulerTimer: number | null = null;
let nextNoteTime = 0;
let isRunning = false;

const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25]; // C major-ish
const PATTERNS = [
  [0, 2, 4, 7, 4, 2],
  [0, 4, 6, 4, 2, 0],
  [2, 4, 6, 5, 3, 1],
  [0, 3, 5, 7, 5, 3],
];

function ensureCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.25;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
}

function playNote(freq: number, time: number, duration: number, velocity = 0.5) {
  if (!ctx || !masterGain) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  // gentle attack/decay envelope
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(velocity, time + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  // soft lowpass for warmth
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2200;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + duration + 0.1);
}

function schedule() {
  if (!ctx || !isRunning) return;
  while (nextNoteTime < ctx.currentTime + 0.5) {
    const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
    const noteIdx = pattern[Math.floor(Math.random() * pattern.length)];
    const octave = Math.random() > 0.7 ? 2 : 1;
    const freq = SCALE[noteIdx % SCALE.length] * octave;
    const dur = 1.2 + Math.random() * 1.5;
    playNote(freq, nextNoteTime, dur, 0.18 + Math.random() * 0.12);

    // occasional harmony note
    if (Math.random() > 0.6) {
      const harm = SCALE[(noteIdx + 2) % SCALE.length] * octave;
      playNote(harm, nextNoteTime + 0.05, dur * 0.8, 0.1);
    }

    nextNoteTime += 0.5 + Math.random() * 0.4;
  }
  schedulerTimer = window.setTimeout(schedule, 200);
}

export function startMusic() {
  ensureCtx();
  if (isRunning) return;
  isRunning = true;
  nextNoteTime = ctx!.currentTime + 0.1;
  schedule();
}

export function stopMusic() {
  isRunning = false;
  if (schedulerTimer) {
    clearTimeout(schedulerTimer);
    schedulerTimer = null;
  }
}

export function setVolume(v: number) {
  if (masterGain) masterGain.gain.value = Math.max(0, Math.min(1, v));
}

export function getVolume(): number {
  return masterGain ? masterGain.gain.value : 0.25;
}

export function isMusicRunning() {
  return isRunning;
}
