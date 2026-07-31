import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const MEMORIES = [
  { date: 'The Beginning', title: 'The day we met', desc: 'A moment that quietly changed everything.' },
  { date: 'First Laugh', title: 'Your smile won me over', desc: 'I knew right then this was someone special.' },
  { date: 'A Shared Day', title: 'Time stood still', desc: 'Hours felt like minutes in your company.' },
  { date: 'Through It All', title: 'You were there', desc: 'Through every up and down, always by my side.' },
  { date: 'Today', title: 'Celebrating you', desc: 'And every day after, grateful for you. ❤️' },
];

export default function MemoryTimeline() {
  return (
    <section className="relative py-24 px-6">
      <SectionHeader
        eyebrow="Our journey"
        title="A Little Timeline"
        subtitle="Moments that turned into memories — each one a treasure."
      />

      <div className="max-w-3xl mx-auto relative">
        {/* center line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose-300/0 via-rose-300/50 to-rose-300/0 md:-translate-x-1/2" />

        <div className="space-y-12">
          {MEMORIES.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: left ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-center ${left ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-rose-300 shadow-[0_0_20px_rgba(255,155,179,0.7)] md:-translate-x-1/2 z-10" />

                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div className="glass rounded-2xl p-6">
                    <p className="font-poppins text-xs tracking-widest uppercase text-rose-200/70 mb-2">{m.date}</p>
                    <h3 className="font-playfair text-xl text-white mb-2">{m.title}</h3>
                    <p className="font-poppins text-sm text-white/65 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
