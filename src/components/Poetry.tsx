import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';
import SectionHeader from './SectionHeader';

const POEMS = [
  'Tumhari muskurahat meri duniya ka sab se khoobsurat manzar hai.\nAllah tumhari zindagi ko hamesha khushiyon se bhar de.\nHappy Birthday Mahnoor ❤️',
  'Har dua mein tumhara naam hota hai,\nHar khushi mein tumhara ehsaas hota hai,\nAaj ka din sirf tumhara hai,\nAur meri har dua tumhare saath hai.',
  'Chand bhi aaj sharma jaye,\nPhool bhi aaj muskura jaye,\nKyun ke aaj Mahnoor ka janam din hai.',
  'Tum woh dua ho\nJo har roz maangi jaye.\nTum woh muskurahat ho\nJo har gham bhula de.',
  'Kabhi udaas mat hona,\nKabhi apni muskurahat mat khona,\nTumhari hasi kisi ki duniya roshan kar sakti hai.',
  'Allah tumhari zindagi mein\nHar din nayi khushiyan laaye,\nHar dua qubool ho,\nAur har muskurahat hamesha tumhare saath rahe.',
];

export default function Poetry() {
  return (
    <section className="relative py-24 px-6">
      <SectionHeader eyebrow="Dil ki baatein" title="Poetry For You" subtitle="A few words from the heart, in the language of love." />

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        {POEMS.map((poem, i) => (
          <SectionReveal key={i} delay={i * 0.1} className="h-full">
            <motion.div
              whileHover={{ scale: 1.02, y: -6 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`glass rounded-3xl p-8 h-full relative overflow-hidden group ${
                i % 2 === 0 ? 'md:mt-0' : 'md:mt-10'
              }`}
            >
              <div className="absolute -top-4 -right-4 text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
                {i % 3 === 0 ? '🌹' : i % 3 === 1 ? '✨' : '🌸'}
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-300/0 via-rose-300/60 to-rose-300/0" />
              <p className="font-script text-2xl md:text-3xl text-white/90 leading-relaxed whitespace-pre-line">
                {poem}
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="h-px flex-1 bg-gradient-to-r from-rose-300/40 to-transparent" />
                <span className="text-rose-200/50 text-sm">❤️</span>
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
