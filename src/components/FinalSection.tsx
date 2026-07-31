import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fireworks, emojiRain, fireConfetti } from '@/utils/confetti';
import FloatingParticles from './FloatingParticles';

const LINES = [
  'Mahnoor ❤️',
  'Shukriya itni khoobsurat muskurahat ke liye.',
  'Tumhari har dua qubool ho.',
  'Tum hamesha yun hi muskuraati raho.',
  'May Allah always protect you.',
];

export default function FinalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [step, setStep] = useState(0);
  const [finale, setFinale] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setStep(i);
      if (i >= LINES.length) {
        clearInterval(id);
        setTimeout(() => {
          setFinale(true);
          fireworks(5000);
          emojiRain('❤️', 4000);
          emojiRain('🎈', 3000);
          fireConfetti();
        }, 800);
      }
    }, 1800);
    return () => clearInterval(id);
  }, [inView]);

  const celebrateAgain = () => {
    setFinale(false);
    setStep(0);
    setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        i++;
        setStep(i);
        if (i >= LINES.length) {
          clearInterval(id);
          setTimeout(() => {
            setFinale(true);
            fireworks(5000);
            emojiRain('❤️', 4000);
            fireConfetti();
          }, 800);
        }
      }, 1800);
    }, 500);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 px-6"
      style={{
        background:
          'radial-gradient(ellipse at center, #1a0a3e 0%, #0d0524 50%, #050111 100%)',
      }}
    >
      {/* stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => {
          const seed = (i * 9301 + 49297) % 233280;
          const r = seed / 233280;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${(r * 100).toFixed(2)}%`,
                top: `${((seed * 1.7) % 233280 / 233280 * 100).toFixed(2)}%`,
                width: `${1 + (seed % 3)}px`,
                height: `${1 + (seed % 3)}px`,
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0, 0.8, 0.3], scale: [0.5, 1.2, 0.8] } : {}}
              transition={{ duration: 2 + (seed % 3), repeat: Infinity, delay: (seed % 20) / 10 }}
            />
          );
        })}
      </div>

      {/* aurora lights */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(184,164,217,0.25), transparent)' }}
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255,155,179,0.2), transparent)' }}
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {finale && <FloatingParticles type="balloon" count={8} />}
      <FloatingParticles type="sparkle" count={14} />
      <FloatingParticles type="heart" count={8} />

      <div className="relative z-10 text-center max-w-2xl">
        {LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={step > i ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={
              i === 0
                ? 'font-playfair text-5xl md:text-7xl font-bold gradient-text mb-8'
                : 'font-script text-2xl md:text-3xl text-rose-100/90 mb-6'
            }
          >
            {line}
          </motion.p>
        ))}

        {finale && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
          >
            <h2 className="font-playfair text-4xl md:text-6xl font-bold gradient-text drop-shadow-[0_0_40px_rgba(255,155,179,0.6)] my-10">
              ✨ HAPPY BIRTHDAY MAHNOOR ❤️ ✨
            </h2>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={celebrateAgain}
              className="btn-premium px-10 py-4 rounded-full glass-pink font-poppins text-lg text-white animate-pulse-glow"
            >
              🔄 Celebrate Again
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
