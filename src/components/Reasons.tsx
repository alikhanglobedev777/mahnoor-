import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const REASONS = [
  { icon: '❤️', title: 'Your Smile', desc: 'It lights up every room and every heart around you.' },
  { icon: '❤️', title: 'Your Kindness', desc: 'The way you care for others is a rare and beautiful gift.' },
  { icon: '❤️', title: 'Your Beautiful Heart', desc: 'Pure, gentle, and full of love for everyone.' },
  { icon: '❤️', title: 'Your Caring Nature', desc: 'You make people feel seen, heard, and valued.' },
  { icon: '❤️', title: 'Your Positivity', desc: 'Even on grey days, you find the silver lining.' },
  { icon: '❤️', title: 'Your Laugh', desc: 'The kind of laugh that makes everyone around smile.' },
  { icon: '❤️', title: 'Your Strength', desc: 'You face every storm with quiet, graceful courage.' },
  { icon: '❤️', title: 'Your Dreams', desc: 'The way you chase them inspires everyone who knows you.' },
];

export default function Reasons() {
  return (
    <section className="relative py-24 px-6">
      <SectionHeader
        eyebrow="Why you"
        title="Reasons You're Amazing"
        subtitle="Just a few of the countless reasons you make the world better, Mahnoor."
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {REASONS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.04 }}
            className="glass-pink rounded-3xl p-6 relative overflow-hidden group"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-rose-400/10 blur-xl group-hover:bg-rose-400/20 transition-colors" />
            <div className="text-3xl mb-3">{r.icon}</div>
            <h3 className="font-playfair text-xl text-white mb-2">{r.title}</h3>
            <p className="font-poppins text-sm text-white/65 leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
