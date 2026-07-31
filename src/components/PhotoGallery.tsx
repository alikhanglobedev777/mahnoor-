import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiPlay, FiX } from 'react-icons/fi';
import SectionHeader from './SectionHeader';

type GalleryItem = {
  src: string;
  type: 'image' | 'video';
  caption: string;
  layout?: 'landscape';
};

const MEDIA: GalleryItem[] = [
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.45.49 PM.jpeg', type: 'image', caption: 'A beautiful memory', layout: 'landscape' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.45.53 PM (1).jpeg', type: 'image', caption: 'A moment to treasure' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.45.53 PM (2).jpeg', type: 'image', caption: 'Forever in my heart' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.45.53 PM.jpeg', type: 'image', caption: 'One of our sweetest moments' },
  { src: '/gallery-media/WhatsApp Video 2026-07-31 at 9.45.53 PM.mp4', type: 'video', caption: 'A memory in motion' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.45.54 PM (1).jpeg', type: 'image', caption: 'A smile worth remembering' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.45.54 PM (2).jpeg', type: 'image', caption: 'Captured with love' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.45.54 PM.jpeg', type: 'image', caption: 'A little piece of happiness', layout: 'landscape' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.45.55 PM.jpeg', type: 'image', caption: 'A day to hold close' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.46.47 PM.jpeg', type: 'image', caption: 'Golden memories' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.46.48 PM.jpeg', type: 'image', caption: 'The loveliest chapter' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.47.22 PM (1).jpeg', type: 'image', caption: 'A moment full of joy' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.47.22 PM.jpeg', type: 'image', caption: 'A memory made together' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.47.23 PM (1).jpeg', type: 'image', caption: 'Simply unforgettable' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.47.23 PM (2).jpeg', type: 'image', caption: 'A frame full of love' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.47.23 PM.jpeg', type: 'image', caption: 'A precious little moment' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.47.24 PM (1).jpeg', type: 'image', caption: 'One for the memory book' },
  { src: '/gallery-media/WhatsApp Image 2026-07-31 at 9.47.24 PM.jpeg', type: 'image', caption: 'Always worth remembering' },
];

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const next = () => setLightbox((current) => (
    current === null ? current : (current + 1) % MEDIA.length
  ));
  const prev = () => setLightbox((current) => (
    current === null ? current : (current - 1 + MEDIA.length) % MEDIA.length
  ));

  useEffect(() => {
    if (lightbox === null) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightbox]);

  const activeItem = lightbox === null ? null : MEDIA[lightbox];

  return (
    <section className="relative px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="Moments"
        title="Our Little Gallery"
        subtitle="Every picture and every moment, kept together with love. Tap any memory to see it up close."
      />

      <div className="mx-auto grid max-w-6xl auto-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {MEDIA.map((item, index) => (
          <motion.figure
            key={item.src}
            style={{ aspectRatio: item.layout === 'landscape' ? '8 / 5' : '4 / 5' }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: Math.min(index * 0.04, 0.32), duration: 0.55 }}
            whileHover={{
              y: -8,
              scale: 1.015,
              rotate: index % 2 === 0 ? -0.35 : 0.35,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLightbox(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setLightbox(index);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${item.caption}${item.type === 'video' ? ' video' : ''}`}
            className={`glass group relative isolate overflow-hidden rounded-[1.35rem] outline-none transition-shadow duration-500 hover:shadow-[0_22px_60px_rgba(255,155,179,0.25)] focus-visible:ring-2 focus-visible:ring-rose-200 sm:rounded-[1.75rem] ${
              item.layout === 'landscape'
                ? 'col-span-2'
                : 'col-span-1'
            }`}
          >
            {item.type === 'image' ? (
              <div className="absolute inset-0 overflow-hidden bg-[#27153e]">
                <img
                  src={item.src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full scale-110 object-cover opacity-55 blur-2xl transition-transform duration-700 group-hover:scale-125"
                />
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="relative z-[1] h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.035]"
                />
              </div>
            ) : (
              <video
                src={item.src}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                aria-label={item.caption}
                className="absolute inset-0 h-full w-full bg-black object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
            )}

            <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/0 to-white/10 opacity-80 transition-opacity group-hover:opacity-100" />
            <div className="pointer-events-none absolute -left-full top-0 z-[3] h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[130%]" />
            <div className="pointer-events-none absolute inset-2 z-[3] rounded-[1rem] border border-white/10 sm:inset-2.5 sm:rounded-[1.3rem]" />

            {item.type === 'video' && (
              <span className="pointer-events-none absolute left-1/2 top-1/2 z-[4] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/35 text-xl text-white shadow-xl backdrop-blur-md transition-transform group-hover:scale-110 sm:h-14 sm:w-14 sm:text-2xl">
                <FiPlay className="ml-1" aria-hidden="true" />
              </span>
            )}

            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] p-3 font-poppins text-[11px] text-white/95 sm:p-5 sm:text-sm">
              <span className="line-clamp-1 drop-shadow-md">{item.caption}</span>
              {item.type === 'video' && (
                <span className="ml-2 rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-sm">
                  Video
                </span>
              )}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeItem && lightbox !== null && (
          <motion.div
            key="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/90 p-3 backdrop-blur-xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.caption}
          >
            <button
              type="button"
              onClick={(event) => { event.stopPropagation(); prev(); }}
              className="absolute bottom-5 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white sm:bottom-auto sm:left-6 sm:top-1/2 sm:-translate-y-1/2 md:left-8"
              aria-label="Previous memory"
            >
              <FiChevronLeft />
            </button>

            <motion.div
              key={activeItem.src}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[82vh] max-w-[92vw] flex-col items-center"
            >
              {activeItem.type === 'image' ? (
                <img
                  src={activeItem.src}
                  alt={activeItem.caption}
                  className="max-h-[76vh] max-w-full rounded-2xl object-contain shadow-2xl"
                />
              ) : (
                <video
                  key={activeItem.src}
                  src={activeItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[76vh] max-w-full rounded-2xl bg-black object-contain shadow-2xl"
                />
              )}
              <p className="mt-3 text-center font-script text-xl text-rose-100/90 sm:text-2xl">
                {activeItem.caption}
              </p>
            </motion.div>

            <button
              type="button"
              onClick={(event) => { event.stopPropagation(); next(); }}
              className="absolute bottom-5 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2 md:right-8"
              aria-label="Next memory"
            >
              <FiChevronRight />
            </button>

            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white sm:right-6 sm:top-6"
              aria-label="Close gallery"
            >
              <FiX />
            </button>

            <p className="absolute left-4 top-5 text-xs font-medium tracking-widest text-white/60 sm:left-6 sm:top-7">
              {lightbox + 1} / {MEDIA.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
