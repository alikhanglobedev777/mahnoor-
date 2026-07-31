import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import { FiChevronDown } from 'react-icons/fi';

const BALLOONS = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈'];
const BUTTERFLIES = ['🦋', '🦋', '🦋', '🦋'];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // mouse parallax
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 20;
      const cy = (e.clientY / window.innerHeight - 0.5) * 20;
      el.style.setProperty('--px', `${cx}px`);
      el.style.setProperty('--py', `${cy}px`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="hero-mobile-safe relative flex min-h-[100svh] flex-col items-center justify-start overflow-hidden pb-24 md:justify-center md:pb-20"
      style={{ ['--px' as string]: '0px', ['--py' as string]: '0px' }}
    >
      {/* cloud-like gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-rose-400/20 blur-3xl animate-gentle-float" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl animate-gentle-float" style={{ animationDelay: '2s' }} />
      </div>

      <FloatingParticles type="petal" count={14} />
      <FloatingParticles type="heart" count={8} />
      <FloatingParticles type="firefly" count={18} />
      <FloatingParticles type="sparkle" count={10} />

      {/* balloons */}
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className="absolute text-4xl md:text-5xl pointer-events-none"
          style={{
            left: `${8 + i * 15}%`,
            bottom: `${5 + (i % 3) * 8}%`,
            animation: `balloon-bob ${4 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            transform: `translateY(var(--py)) translateX(calc(var(--px) * ${0.3 + i * 0.1}))`,
          }}
        >
          {b}
        </div>
      ))}

      {/* butterflies */}
      {BUTTERFLIES.map((b, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none"
          style={{
            top: `${20 + i * 18}%`,
            left: `${15 + i * 20}%`,
          }}
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -50, 30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span style={{ animation: 'butterfly-flap 0.4s ease-in-out infinite' }}>{b}</span>
        </motion.div>
      ))}

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-4xl px-4 text-center sm:px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-script text-2xl md:text-4xl text-rose-200/90 mb-4"
        >
          ✨ Happy Birthday ✨
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, type: 'spring' }}
          className="font-playfair text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold gradient-text leading-none drop-shadow-[0_0_40px_rgba(255,155,179,0.4)]"
        >
          Mahnoor ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="font-poppins text-base md:text-xl text-white/75 mt-8 leading-relaxed max-w-2xl mx-auto"
        >
          "Today isn't just another day...
          <br />
          It's the day the world became a little more beautiful."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.65, duration: 1, type: 'spring' }}
          className="glass-pink mx-auto mt-7 max-w-3xl rounded-2xl px-5 py-4 sm:rounded-full sm:px-7"
        >
          <motion.p
            animate={{
              textShadow: [
                '0 0 10px rgba(255,155,179,0.15)',
                '0 0 24px rgba(255,155,179,0.5)',
                '0 0 10px rgba(255,155,179,0.15)',
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="font-script text-base leading-relaxed text-rose-100 sm:text-lg md:text-xl"
          >
            Bababab ki sans Babbaba ki jan Bababab ki ptr prt, Babababa ki dulhan Babababa ki doll Babababa ki shrarti Bababaab ki BO BVabababa ki bar b doll Babababa ki jigar Babababa ki princess and queen
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 md:bottom-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiChevronDown size={32} className="text-rose-200/60" />
      </motion.div>
    </section>
  );
}
