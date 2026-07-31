import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { fireworks, emojiRain, fireConfetti } from '@/utils/confetti';
import FloatingParticles from './FloatingParticles';

export default function GrandCelebration() {
  const [active, setActive] = useState(false);

  const celebrate = () => {
    setActive(true);
    fireworks(4000);
    emojiRain('❤️', 3000);
    emojiRain('🎉', 2500);
    fireConfetti();
    setTimeout(() => setActive(false), 5000);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          celebrate();
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    const el = document.getElementById('grand-celebration');
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="grand-celebration" className="relative py-32 px-6 overflow-hidden">
      <AnimatePresence>
        {active && <FloatingParticles type="balloon" count={10} />}
      </AnimatePresence>
      <FloatingParticles type="sparkle" count={12} />

      <SectionHeader eyebrow="The big moment" title="Grand Celebration" />

      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: 'spring' }}
          className="font-playfair text-5xl md:text-7xl font-bold gradient-text drop-shadow-[0_0_40px_rgba(255,155,179,0.5)]"
        >
          🎉 Happy Birthday Mahnoor ❤️ 🎉
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={celebrate}
          className="btn-premium mt-10 px-10 py-4 rounded-full glass-pink font-poppins text-lg text-white animate-pulse-glow"
        >
          🎊 Celebrate Now
        </motion.button>
      </div>
    </section>
  );
}
