import { useMemo } from 'react';

type ParticleType = 'petal' | 'heart' | 'firefly' | 'sparkle' | 'balloon' | 'butterfly';

interface Props {
  type: ParticleType;
  count?: number;
}

const EMOJI: Record<ParticleType, string> = {
  petal: '🌸',
  heart: '❤️',
  firefly: '',
  sparkle: '✨',
  balloon: '🎈',
  butterfly: '🦋',
};

export default function FloatingParticles({ type, count = 12 }: Props) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 12 + Math.random() * 14;
        const size = type === 'firefly' ? 4 + Math.random() * 4 : 14 + Math.random() * 20;
        const drift = (Math.random() - 0.5) * 200;
        return { id: i, left, delay, duration, size, drift };
      }),
    [type, count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {items.map((p) =>
        type === 'firefly' ? (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              bottom: '-20px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: '#fff5a0',
              animation: `float-up ${p.duration}s linear ${p.delay}s infinite, firefly-glow ${2 + Math.random() * 2}s ease-in-out infinite`,
              ['--drift' as string]: `${p.drift}px`,
            }}
          />
        ) : (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: '-30px',
              fontSize: `${p.size}px`,
              animation: `particle-rise ${p.duration}s linear ${p.delay}s infinite`,
              animationFillMode: 'both',
              ['--drift' as string]: `${p.drift}px`,
              opacity: 0,
            }}
          >
            {EMOJI[type]}
          </div>
        )
      )}
    </div>
  );
}
