import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

function getNextBirthday(): Date {
  const now = new Date();
  const year = now.getFullYear();
  // Use July 31 as the birthday; adjust as needed
  const thisYear = new Date(year, 6, 31, 0, 0, 0);
  if (now > thisYear) {
    return new Date(year + 1, 6, 31, 0, 0, 0);
  }
  return thisYear;
}

function calcRemaining(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown() {
  const [target] = useState(getNextBirthday);
  const [time, setTime] = useState(() => calcRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(calcRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section className="relative py-24 px-6">
      <SectionHeader
        eyebrow="Looking ahead"
        title="Until Your Next Birthday"
        subtitle="The countdown to celebrating you all over again."
      />

      <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-pink rounded-2xl py-8 flex flex-col items-center"
          >
            <motion.span
              key={u.value}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-playfair text-4xl md:text-6xl font-bold gradient-text"
            >
              {String(u.value).padStart(2, '0')}
            </motion.span>
            <span className="font-poppins text-xs md:text-sm tracking-widest uppercase text-white/60 mt-2">
              {u.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
