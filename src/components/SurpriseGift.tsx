import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { fireConfetti } from '@/utils/confetti';

export default function SurpriseGift() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    fireConfetti();
  };

  return (
    <section className="relative py-24 px-6">
      <SectionHeader eyebrow="One more thing" title="A Surprise Gift" subtitle="There's one last gift waiting just for you. 🎁" />

      <div className="max-w-lg mx-auto flex flex-col items-center gap-8">
        <div className="relative h-40 flex items-center justify-center">
          <motion.div
            animate={open ? { rotate: [0, -15, -25], y: -20, opacity: [1, 1, 0] } : { rotate: [0, 3, -3, 0] }}
            transition={open ? { duration: 1 } : { duration: 3, repeat: Infinity }}
            className="text-7xl md:text-8xl"
          >
            🎁
          </motion.div>

          <AnimatePresence>
            {open && (
              <>
                {[...Array(16)].map((_, k) => (
                  <motion.span
                    key={k}
                    initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: 0,
                      x: (Math.random() - 0.5) * 280,
                      y: (Math.random() - 0.5) * 280 - 80,
                      scale: 1.5,
                    }}
                    transition={{ duration: 1.8 }}
                    className="absolute text-2xl"
                  >
                    {k % 4 === 0 ? '✨' : k % 4 === 1 ? '🌟' : k % 4 === 2 ? '💫' : '⭐'}
                  </motion.span>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="btn"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="btn-premium px-8 py-4 rounded-full glass-pink font-poppins text-white animate-pulse-glow"
            >
              🎁 Open Gift
            </motion.button>
          ) : (
            <motion.div
              key="msg"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-pink rounded-3xl p-8 text-center"
            >
              <p className="font-playfair text-xl md:text-2xl text-white/90 leading-relaxed">
                "May Allah bless you with endless happiness, success, peace, good health, and beautiful memories."
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
