// Gentle instrumental "Happy Birthday to You" using the Web Audio API.
// Keeping the music synthesized avoids loading or licensing an external track.

type MelodyNote = {
  frequency: number | null;
  beats: number;
};

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let schedulerTimer: number | null = null;
let nextNoteTime = 0;
let melodyIndex = 0;
let isRunning = false;

const BEAT_SECONDS = 0.42;
const NOTES = {
  F4: 349.23,
  G4: 392,
  A4: 440,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
};

const MELODY: MelodyNote[] = [
  { frequency: NOTES.G4, beats: 0.5 },
  { frequency: NOTES.G4, beats: 0.5 },
  { frequency: NOTES.A4, beats: 1 },
  { frequency: NOTES.G4, beats: 1 },
  { frequency: NOTES.C5, beats: 1 },
  { frequency: NOTES.B4, beats: 2 },
  { frequency: null, beats: 0.5 },

  { frequency: NOTES.G4, beats: 0.5 },
  { frequency: NOTES.G4, beats: 0.5 },
  { frequency: NOTES.A4, beats: 1 },
  { frequency: NOTES.G4, beats: 1 },
  { frequency: NOTES.D5, beats: 1 },
  { frequency: NOTES.C5, beats: 2 },
  { frequency: null, beats: 0.5 },

  { frequency: NOTES.G4, beats: 0.5 },
  { frequency: NOTES.G4, beats: 0.5 },
  { frequency: NOTES.G5, beats: 1 },
  { frequency: NOTES.E5, beats: 1 },
  { frequency: NOTES.C5, beats: 1 },
  { frequency: NOTES.B4, beats: 1 },
  { frequency: NOTES.A4, beats: 2 },
  { frequency: null, beats: 0.5 },

  { frequency: NOTES.F5, beats: 0.5 },
  { frequency: NOTES.F5, beats: 0.5 },
  { frequency: NOTES.E5, beats: 1 },
  { frequency: NOTES.C5, beats: 1 },
  { frequency: NOTES.D5, beats: 1 },
  { frequency: NOTES.C5, beats: 2 },
  { frequency: null, beats: 1.5 },
];

const PHRASE_CHORDS: Record<number, number[]> = {
  0: [261.63, 329.63, 392],
  7: [392, 493.88, 587.33],
  14: [261.63, 329.63, 392],
  22: [349.23, 440, 523.25],
};

function ensureContext() {
  if (!ctx) {
    ctx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.22;
    masterGain.connect(ctx.destination);
  }

  if (ctx.state === 'suspended') void ctx.resume();
}

function playTone(frequency: number, time: number, duration: number, velocity: number) {
  if (!ctx || !masterGain) return;

  const oscillator = ctx.createOscillator();
  const harmonic = ctx.createOscillator();
  const harmonicGain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const envelope = ctx.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, time);
  harmonic.type = 'sine';
  harmonic.frequency.setValueAtTime(frequency * 2, time);
  harmonicGain.gain.value = 0.12;

  filter.type = 'lowpass';
  filter.frequency.value = 2400;

  envelope.gain.setValueAtTime(0.0001, time);
  envelope.gain.exponentialRampToValueAtTime(velocity, time + 0.025);
  envelope.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  oscillator.connect(filter);
  harmonic.connect(harmonicGain);
  harmonicGain.connect(filter);
  filter.connect(envelope);
  envelope.connect(masterGain);

  oscillator.start(time);
  harmonic.start(time);
  oscillator.stop(time + duration + 0.08);
  harmonic.stop(time + duration + 0.08);
}

function schedule() {
  if (!ctx || !isRunning) return;

  while (nextNoteTime < ctx.currentTime + 0.6) {
    const note = MELODY[melodyIndex];
    const duration = Math.max(note.beats * BEAT_SECONDS, 0.16);
    const chord = PHRASE_CHORDS[melodyIndex];

    if (chord) {
      chord.forEach((frequency) => playTone(frequency, nextNoteTime, BEAT_SECONDS * 3.5, 0.035));
    }

    if (note.frequency) {
      playTone(note.frequency, nextNoteTime, duration * 0.92, 0.21);
    }

    nextNoteTime += duration;
    melodyIndex = (melodyIndex + 1) % MELODY.length;
  }

  schedulerTimer = window.setTimeout(schedule, 180);
}

export function startMusic() {
  ensureContext();
  if (isRunning || !ctx) return;

  isRunning = true;
  melodyIndex = 0;
  nextNoteTime = ctx.currentTime + 0.08;
  schedule();
}

export function stopMusic() {
  isRunning = false;
  if (schedulerTimer !== null) {
    window.clearTimeout(schedulerTimer);
    schedulerTimer = null;
  }
}

export function setVolume(value: number) {
  if (masterGain) masterGain.gain.value = Math.max(0, Math.min(1, value));
}

export function getVolume(): number {
  return masterGain ? masterGain.gain.value : 0.22;
}

export function isMusicRunning() {
  return isRunning;
}
