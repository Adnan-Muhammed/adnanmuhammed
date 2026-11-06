import { useEffect, useRef } from 'react';

export function ParticleCanvas({ className = '', mode = 'ambient' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isVisible = true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect mobile vs desktop
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 80 : 180;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Symbols for title screen floating ambient mode: { }, </>, *, +, ·
    const symbols = ['{ }', '</>', '✦', '·', '★', '◇'];

    const particles = Array.from({ length: count }, () => {
      const isSymbol = mode === 'title' && Math.random() < 0.15;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.4,
        speedY: (Math.random() * 0.4 + 0.1) * (isSymbol ? 0.7 : 1),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.4 ? '#D4AF37' : Math.random() > 0.5 ? '#22D3EE' : '#F4F6FB',
        symbol: isSymbol ? symbols[Math.floor(Math.random() * symbols.length)] : null,
        size: Math.random() * 8 + 9,
      };
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState !== 'hidden';
      if (isVisible && !prefersReduced) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.symbol) {
          ctx.font = `600 ${p.size}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.65;
          ctx.fillText(p.symbol, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        }

        if (!prefersReduced) {
          p.y -= p.speedY;
          p.x += p.speedX;

          // Wrap around top/bottom/sides
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }
      }

      ctx.globalAlpha = 1;

      if (!prefersReduced) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}

export default ParticleCanvas;
