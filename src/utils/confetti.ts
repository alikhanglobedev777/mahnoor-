import confetti from 'canvas-confetti';

export function fireConfetti() {
  const defaults = {
    spread: 360,
    ticks: 120,
    gravity: 0.6,
    decay: 0.94,
    startVelocity: 35,
    colors: ['#ff9bb3', '#e0a96d', '#f5d491', '#b8a4d9', '#e6d7f5', '#ffffff'],
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 60,
      scalar: 1.2,
      shapes: ['circle', 'square'],
      origin: { x: 0.5, y: 0.5 },
    });
    confetti({
      ...defaults,
      particleCount: 20,
      scalar: 2,
      shapes: ['star'],
      origin: { x: 0.5, y: 0.5 },
    });
  }

  shoot();
  setTimeout(shoot, 200);
  setTimeout(shoot, 400);
}

export function fireworks(durationMs = 3000) {
  const end = Date.now() + durationMs;
  const colors = ['#ff9bb3', '#e0a96d', '#f5d491', '#b8a4d9', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 90,
      spread: 55,
      origin: { x: Math.random(), y: Math.random() * 0.5 + 0.1 },
      colors,
      ticks: 200,
    });
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 120,
      origin: { x: Math.random(), y: Math.random() * 0.4 },
      colors,
      scalar: 1.4,
      ticks: 200,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function emojiRain(emoji = '❤️', durationMs = 2500) {
  const end = Date.now() + durationMs;
  (function frame() {
    confetti({
      particleCount: 4,
      startVelocity: 30,
      spread: 360,
      ticks: 200,
      origin: { x: Math.random(), y: 0 },
      gravity: 0.5,
      scalar: 1.6,
      shapes: ['emoji' as 'circle'],
      emoji: [emoji],
    } as confetti.Options);
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function burstFrom(x: number, y: number) {
  confetti({
    particleCount: 80,
    spread: 100,
    startVelocity: 45,
    origin: { x, y },
    colors: ['#ff9bb3', '#e0a96d', '#f5d491', '#b8a4d9'],
    scalar: 1.2,
  });
}
