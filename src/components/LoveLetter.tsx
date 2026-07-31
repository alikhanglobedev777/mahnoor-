import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';

const PARAGRAPHS = [
  'My dearest Mahnoor,',
  'On this special day, I want you to know that your presence is a gift to everyone around you. Your smile lights up the darkest rooms, and your kindness makes the world a softer, warmer place.',
  'May this year bring you every happiness your heart can hold — dreams that come true, moments that take your breath away, and love that grows deeper with every passing day.',
  'Happy Birthday, today and always. ❤️',
];

function Typewriter({ text, speed = 35 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed]);

  return (
    <p ref={ref} className="tw-cursor font-poppins text-white/85 leading-relaxed text-base md:text-lg">
      {shown}
    </p>
  );
}

export default function LoveLetter() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeader eyebrow="From the heart" title="A Letter For You" subtitle="💌 Words written just for you, Mahnoor." />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="glass-pink rounded-3xl p-8 md:p-14 relative"
        >
          {/* floating roses between paragraphs */}
          {PARAGRAPHS.map((p, i) => (
            <div key={i} className="relative">
              <Typewriter text={p} speed={i === 0 ? 60 : 30} />
              {i < PARAGRAPHS.length - 1 && (
                <motion.div
                  className="text-2xl my-5 text-center"
                  animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                >
                  🌹
                </motion.div>
              )}
            </div>
          ))}

          <div className="mt-8 text-right font-script text-2xl text-rose-200/80">
            — With all my heart
          </div>
        </motion.div>
      </div>
    </section>
  );
}
