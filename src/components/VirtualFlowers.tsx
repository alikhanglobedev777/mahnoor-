import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { fireConfetti, burstFrom } from '@/utils/confetti';

export default function VirtualFlowers() {
  const [sent, setSent] = useState(false);

  const send = () => {
    setSent(true);
    fireConfetti();
    setTimeout(() => burstFrom(0.5, 0.6), 300);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="relative py-24 px-6">
      <SectionHeader
        eyebrow="With love"
        title="Virtual Flowers"
        subtitle="A bouquet that never wilts — just for you, Mahnoor."
      />

      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        <div className="relative h-48 flex items-end justify-center">
          {['🌹', '🌷', '🌸', '🌻', '💐', '🌹', '🌸'].map((f, i) => (
            <motion.span
              key={i}
              className="text-5xl md:text-6xl mx-1"
              animate={
                sent
                  ? { y: [0, -60 - i * 5, 0], scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }
                  : { y: [0, -8, 0] }
              }
              transition={{ duration: sent ? 1.5 : 3 + i * 0.2, repeat: Infinity, delay: i * 0.1 }}
            >
              {f}
            </motion.span>
          ))}

          <AnimatePresence>
            {sent && (
              <>
                {[...Array(12)].map((_, k) => (
                  <motion.span
                    key={k}
                    initial={{ opacity: 1, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 200 - 100,
                    }}
                    transition={{ duration: 1.5 }}
                    className="absolute text-lg"
                  >
                    {k % 3 === 0 ? '🌸' : k % 3 === 1 ? '✨' : '❤️'}
                  </motion.span>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={send}
          className="btn-premium px-8 py-4 rounded-full glass-pink font-poppins text-white animate-pulse-glow"
        >
          🌹 Send Flowers
        </motion.button>
      </div>
    </section>
  );
}
