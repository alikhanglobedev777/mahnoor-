import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { fireConfetti, fireworks, emojiRain } from '@/utils/confetti';

export default function CakeCutting() {
  const [cut, setCut] = useState(false);

  const handleCut = () => {
    setCut(true);
    fireConfetti();
    fireworks(2000);
    emojiRain('🎉', 2000);
    setTimeout(() => setCut(false), 6000);
  };

  return (
    <section className="relative py-24 px-6">
      <SectionHeader eyebrow="Time to celebrate" title="Cut The Cake" subtitle="A sweet moment, just for you. 🍰" />

      <div className="max-w-xl mx-auto flex flex-col items-center gap-8">
        <div className="relative h-48 flex items-center justify-center">
          {/* knife */}
          <motion.div
            className="absolute right-0 top-0 text-4xl origin-top"
            animate={cut ? { rotate: [0, -45, -45], x: [0, -120, -120] } : { rotate: 0 }}
            transition={{ duration: 1.2, times: [0, 0.5, 1] }}
          >
            🔪
          </motion.div>

          {/* cake */}
          <div className="relative">
            <div className="w-56 h-16 rounded-t-xl bg-gradient-to-b from-rose-200 to-rose-300 relative overflow-hidden">
              {/* cream top */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-white/90 rounded-t-xl" />
              {/* chocolate drip */}
              <div className="absolute top-3 left-0 right-0 h-6 bg-amber-800">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bg-amber-800 rounded-b-full"
                    style={{ left: `${i * 14}%`, width: '14%', height: `${8 + (i % 3) * 5}px` }}
                  />
                ))}
              </div>
            </div>
            <div className="w-56 h-12 bg-gradient-to-b from-amber-700 to-amber-900" />

            {/* slice animation */}
            <AnimatePresence>
              {cut && (
                <motion.div
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: 40, rotate: 15, opacity: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute top-0 right-0 w-10 h-28 bg-gradient-to-b from-rose-200 to-amber-800 rounded-r-lg"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCut}
          className="btn-premium px-8 py-4 rounded-full glass-pink font-poppins text-white animate-pulse-glow"
        >
          🍰 Cut The Cake
        </motion.button>

        {cut && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-script text-2xl text-rose-200"
          >
            Happy Birthday Mahnoor! 🎉❤️
          </motion.p>
        )}
      </div>
    </section>
  );
}
