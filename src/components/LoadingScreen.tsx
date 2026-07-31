import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingParticles from './FloatingParticles';
import { startMusic } from '@/utils/music';

interface Props {
  onOpen: () => void;
}

export default function LoadingScreen({ onOpen }: Props) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setReady(true), 400);
      }
      setProgress(p);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    startMusic();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff9bb3', '#e0a96d', '#f5d491', '#b8a4d9', '#ffffff'],
    });
    setTimeout(onOpen, 600);
  };

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at center, #2a1648 0%, #1a0f2e 50%, #0d0518 100%)',
        }}
      >
        <FloatingParticles type="sparkle" count={20} />
        <FloatingParticles type="firefly" count={15} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center px-6 relative z-10"
        >
          <motion.p
            className="font-script text-2xl md:text-3xl text-rose-200/80 mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ A Special Surprise Is Waiting... ✨
          </motion.p>

          {!ready ? (
            <div className="w-64 max-w-[70vw] mx-auto mt-8">
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="font-poppins text-xs text-white/40 mt-3 tracking-widest">
                {Math.floor(progress)}%
              </p>
            </div>
          ) : (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="btn-premium mt-10 px-10 py-4 rounded-full glass-pink font-poppins text-lg md:text-xl text-white animate-pulse-glow"
            >
              🎁 Open Your Surprise
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
