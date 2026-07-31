import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiHeart } from 'react-icons/fi';
import SectionHeader from './SectionHeader';

interface Wish {
  id: string;
  name: string;
  message: string;
  ts: number;
}

const STORAGE_KEY = 'mahnoor-wishes';

export default function WishWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setWishes(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const save = (next: Wish[]) => {
    setWishes(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const wish: Wish = { id: crypto.randomUUID(), name: name.trim(), message: message.trim(), ts: Date.now() };
    save([wish, ...wishes]);
    setName('');
    setMessage('');
  };

  return (
    <section className="relative py-24 px-6">
      <SectionHeader
        eyebrow="Leave some love"
        title="Wish Wall"
        subtitle="Write a birthday wish for Mahnoor. Your message stays on this device."
      />

      <div className="max-w-3xl mx-auto">
        <form onSubmit={submit} className="glass-pink rounded-3xl p-6 md:p-8 mb-10">
          <div className="grid gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={40}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-poppins text-white placeholder-white/40 focus:outline-none focus:border-rose-300/50 transition-colors"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your birthday wish..."
              maxLength={240}
              rows={3}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-poppins text-white placeholder-white/40 focus:outline-none focus:border-rose-300/50 transition-colors resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="btn-premium flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass font-poppins text-white self-start"
            >
              <FiSend /> Send Wish
            </motion.button>
          </div>
        </form>

        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence>
            {wishes.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-2xl p-5 relative"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FiHeart className="text-rose-300" />
                  <span className="font-poppins font-semibold text-white text-sm">{w.name}</span>
                </div>
                <p className="font-poppins text-sm text-white/75 leading-relaxed">{w.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {wishes.length === 0 && (
            <p className="text-white/40 font-poppins text-sm col-span-full text-center py-8">
              Be the first to leave a wish. 💕
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
