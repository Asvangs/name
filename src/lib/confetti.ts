import confetti from 'canvas-confetti';

export function triggerConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffedd5'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

export function triggerBurstConfetti() {
  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffedd5'];
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors: colors,
    disableForReducedMotion: true
  });
}
