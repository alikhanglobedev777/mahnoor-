import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  '❤️ Aaj ka din sirf tumhare naam.',
  '❤️ Allah tumhein hamesha khush rakhe.',
  '❤️ Tumhari muskurahat sab se khoobsurat tohfa hai.',
  '❤️ Keep shining, always.',
  '❤️ Some people make life beautiful just by existing.',
  '❤️ You deserve endless happiness.',
];

export default function EmotionalMessages() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout: number;
    const show = () => {
      setIndex(i);
      setVisible(true);
      timeout = window.setTimeout(() => {
        setVisible(false);
        i = (i + 1) % MESSAGES.length;
        timeout = window.setTimeout(show, 1500);
      }, 4000);
    };
    const start = window.setTimeout(show, 2000);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-[60] pointer-events-none">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="glass-pink rounded-full px-6 py-3 font-script text-lg md:text-xl text-rose-100 whitespace-nowrap"
          >
            {MESSAGES[index]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
