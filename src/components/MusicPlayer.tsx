import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiVolume1 } from 'react-icons/fi';
import { startMusic, stopMusic, setVolume, getVolume } from '@/utils/music';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVol] = useState(0.25);
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevVol, setPrevVol] = useState(0.25);

  const togglePlay = () => {
    if (playing) {
      stopMusic();
      setPlaying(false);
    } else {
      startMusic();
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    if (muted) {
      setVolume(prevVol);
      setVol(prevVol);
      setMuted(false);
    } else {
      setPrevVol(volume);
      setVolume(0);
      setVol(0);
      setMuted(true);
    }
  };

  const onVolume = (v: number) => {
    setVol(v);
    setVolume(v);
    setMuted(v === 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 'auto' }}
            exit={{ opacity: 0, x: 20, width: 0 }}
            className="glass-pink rounded-full px-4 py-2 flex items-center gap-3"
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => onVolume(parseFloat(e.target.value))}
              className="w-24 accent-rose-300"
              aria-label="Volume"
            />
            <button
              onClick={toggleMute}
              className="text-rose-100 hover:text-white transition-colors"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              {muted ? <FiVolumeX /> : volume > 0.5 ? <FiVolume2 /> : <FiVolume1 />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          if (!playing) togglePlay();
          setOpen((o) => !o);
        }}
        className="glass-pink w-14 h-14 rounded-full flex items-center justify-center text-rose-100 hover:scale-110 transition-transform animate-pulse-glow"
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? <FiPause size={22} /> : <FiPlay size={22} className="ml-1" />}
      </button>
    </motion.div>
  );
}
