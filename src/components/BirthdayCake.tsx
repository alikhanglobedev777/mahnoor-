import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { fireConfetti, fireworks } from '@/utils/confetti';

type Stage = 'idle' | 'lit' | 'wish' | 'blown';

export default function BirthdayCake() {
  const [stage, setStage] = useState<Stage>('idle');
  const audioRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);

  const stopMic = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    analyserRef.current = null;
  };

  useEffect(() => () => stopMic(), []);

  const lightCandles = () => {
    setStage('lit');
    setTimeout(() => setStage('wish'), 1200);
  };

  const makeWish = () => {
    setStage('wish');
  };

  const blow = () => {
    setStage('blown');
    fireConfetti();
    fireworks(2500);
    setTimeout(() => setStage('idle'), 4000);
  };

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      src.connect(analyser);
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.frequencyBinCount);
      const check = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        if (avg > 40) {
          stopMic();
          blow();
          return;
        }
        rafRef.current = requestAnimationFrame(check);
      };
      check();
    } catch {
      // mic denied — fall back to click
      blow();
    }
  };

  const handleBlow = () => {
    if (stage !== 'wish') return;
    startMic();
    // fallback: auto-blow after 6s if no mic
    setTimeout(() => {
      if (analyserRef.current) blow();
    }, 6000);
  };

  const candlesLit = stage === 'lit' || stage === 'wish';

  return (
    <section className="relative py-24 px-6">
      <SectionHeader eyebrow="Make a wish" title="Your Birthday Cake" subtitle="Light the candles, make a wish, and blow them out. 🎂" />

      <div className="max-w-xl mx-auto flex flex-col items-center gap-8">
        {/* Cake */}
        <div className="relative">
          {/* candles */}
          <div className="flex justify-center gap-6 mb-2 h-20">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative flex flex-col items-center">
                <AnimatePresence>
                  {candlesLit && (
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      exit={{ scaleY: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="origin-bottom"
                    >
                      <div
                        className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-yellow-100"
                        style={{ animation: `flame-flicker ${0.3 + i * 0.1}s ease-in-out infinite`, boxShadow: '0 0 20px rgba(255,180,80,0.8)' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {stage === 'blown' && (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -40 }}
                    transition={{ duration: 1.5 }}
                    className="absolute -top-2 text-sm"
                  >
                    💨
                  </motion.div>
                )}
                <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-rose-200 to-rose-400" />
              </div>
            ))}
          </div>

          {/* cake body */}
          <motion.div
            animate={stage === 'blown' ? { y: [0, -4, 0] } : {}}
            className="relative"
          >
            <div className="w-64 h-20 rounded-t-2xl bg-gradient-to-b from-rose-200 to-rose-300 mx-auto relative overflow-hidden">
              {/* cream drips */}
              <div className="absolute bottom-0 left-0 right-0 h-8">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bg-white/80 rounded-b-full"
                    style={{ left: `${i * 12.5}%`, width: '12%', height: `${10 + (i % 3) * 6}px` }}
                  />
                ))}
              </div>
            </div>
            <div className="w-72 h-16 mx-auto rounded-t-xl bg-gradient-to-b from-amber-700 to-amber-900 -mt-1" />
            <div className="w-80 h-6 mx-auto rounded-b-lg bg-gradient-to-b from-amber-900 to-amber-950" />
          </motion.div>
        </div>

        {/* Controls */}
        <div className="h-16 flex items-center">
          {stage === 'idle' && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              onClick={lightCandles}
              className="btn-premium px-8 py-4 rounded-full glass-pink font-poppins text-white animate-pulse-glow"
            >
              ✨ Light Candles
            </motion.button>
          )}
          {stage === 'lit' && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              onClick={makeWish}
              className="btn-premium px-8 py-4 rounded-full glass-pink font-poppins text-white animate-pulse-glow"
            >
              ✨ Make A Wish
            </motion.button>
          )}
          {stage === 'wish' && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              onClick={handleBlow}
              className="btn-premium px-8 py-4 rounded-full glass-pink font-poppins text-white animate-pulse-glow"
            >
              💨 Blow Candles
            </motion.button>
          )}
          {stage === 'blown' && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="font-script text-2xl text-rose-200"
            >
              May all your wishes come true... ✨
            </motion.p>
          )}
        </div>
        {stage === 'wish' && (
          <p className="font-poppins text-xs text-white/40 -mt-4">
            (Allow microphone access to blow, or just tap the button)
          </p>
        )}
      </div>
    </section>
  );
}
