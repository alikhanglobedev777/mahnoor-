import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { burstFrom } from '@/utils/confetti';

const FLOWERS = [
  { emoji: '🌹', name: 'Roses', color: 'from-rose-400 to-red-500' },
  { emoji: '🌷', name: 'Tulips', color: 'from-pink-300 to-rose-400' },
  { emoji: '🌸', name: 'Cherry Blossoms', color: 'from-pink-200 to-rose-300' },
  { emoji: '🌻', name: 'Sunflowers', color: 'from-amber-300 to-yellow-500' },
  { emoji: '💐', name: 'Lilies', color: 'from-rose-200 to-amber-200' },
];

export default function FlowerGarden() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-6">
      <SectionHeader
        eyebrow="Interactive"
        title="A Garden For You"
        subtitle="Hover over each flower and watch it bloom — just like you make every day bloom. 🌷"
      />

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
        {FLOWERS.map((flower, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={(e) => burstFrom(e.clientX / window.innerWidth, e.clientY / window.innerHeight)}
            className="glass rounded-3xl p-6 md:p-8 flex flex-col items-center gap-3 cursor-pointer group"
          >
            <motion.div
              animate={{
                scale: hovered === i ? 1.4 : 1,
                rotate: hovered === i ? [0, -10, 10, 0] : 0,
                y: hovered === i ? -8 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl drop-shadow-[0_0_20px_rgba(255,155,179,0.5)]"
            >
              {flower.emoji}
            </motion.div>
            <p className="font-poppins text-sm md:text-base text-white/80">{flower.name}</p>

            <AnimatePresence>
              {hovered === i && (
                <>
                  {[...Array(5)].map((_, k) => (
                    <motion.span
                      key={k}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                      animate={{
                        opacity: 0,
                        x: (Math.random() - 0.5) * 120,
                        y: (Math.random() - 0.5) * 120 - 30,
                        scale: 1.2,
                      }}
                      transition={{ duration: 1.2 }}
                      className="absolute text-lg"
                    >
                      {k % 2 === 0 ? '❤️' : '✨'}
                    </motion.span>
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
