import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiVolume2, FiVolumeX, FiFastForward } from 'react-icons/fi';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ParticleCanvas from './ParticleCanvas';
import TechGlobe from './TechGlobe';
import { cyberAudio } from '../../utils/cyberAudio';

export function TitleScreen({ onStart, onSkip }) {
  const [audioMuted, setAudioMuted] = useState(cyberAudio.isMuted());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTriggering, setIsTriggering] = useState(false);
  const dragTrackerRef = useRef({ startX: 0, startY: 0, hasDragged: false });

  // Parallax mouse tracker (desktop)
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (clientX - centerX) / centerX,
      y: (clientY - centerY) / centerY,
    });
  }, []);

  const handlePointerDown = (e) => {
    dragTrackerRef.current.startX = e.clientX;
    dragTrackerRef.current.startY = e.clientY;
    dragTrackerRef.current.hasDragged = false;
  };

  const handlePointerMove = (e) => {
    handleMouseMove(e);
    if (!dragTrackerRef.current.hasDragged && e.buttons > 0) {
      const dist = Math.hypot(
        e.clientX - dragTrackerRef.current.startX,
        e.clientY - dragTrackerRef.current.startY
      );
      if (dist > 6) {
        dragTrackerRef.current.hasDragged = true;
      }
    }
  };

  const handleBackgroundClick = (e) => {
    // If the user was dragging anywhere to rotate the globe, do not navigate!
    if (dragTrackerRef.current.hasDragged) {
      dragTrackerRef.current.hasDragged = false;
      return;
    }
    // Clicking outside the globe portion triggers navigation
    handlePressStart();
  };

  const handleAudioToggle = (e) => {
    e.stopPropagation();
    const muted = cyberAudio.toggleMute();
    setAudioMuted(muted);
  };

  const handlePressStart = useCallback(() => {
    if (isTriggering) return;
    setIsTriggering(true);
    cyberAudio.playCoin();
    setTimeout(() => {
      onStart();
    }, 450);
  }, [isTriggering, onStart]);

    // Keyboard navigation: Enter or Space triggers Start; Esc skips intro
    useEffect(() => {
      const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          handlePressStart();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          onSkip();
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [handlePressStart, onSkip]);

  const firstName = 'ADNAN'.split('');
  const lastName = 'MUHAMMED'.split('');

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onClick={handleBackgroundClick}
      className={`relative w-full h-full flex flex-col justify-between bg-[#070A12] text-[#F4F6FB] overflow-hidden select-none touch-none cursor-default ${isTriggering ? 'animate-[shake_0.4s_ease-in-out]' : ''
        }`}
    >
        {/* Layer 1: Atmospheric Aurora & Gradient Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A12] via-[#0B0F1C] to-[#070A12] pointer-events-none" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#D4AF37]/10 via-[#22D3EE]/10 to-[#10B981]/10 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `translate(calc(-50% + ${mousePos.x * 25}px), ${mousePos.y * 20}px)`,
          }}
        />

        {/* Layer 2: Floating Canvas Particles */}
        <ParticleCanvas mode="title" />

        {/* Layer 3: Modern Tech Skyline Silhouette */}
        <div
          className="absolute bottom-16 sm:bottom-20 inset-x-0 w-full h-44 sm:h-64 pointer-events-none transition-transform duration-500 ease-out z-10"
          style={{
            transform: `translateX(${mousePos.x * -18}px)`,
          }}
        >
          <svg
            viewBox="0 0 1200 320"
            className="w-full h-full opacity-40"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 120 320 L 140 130 C 145 100 155 100 160 130 L 180 320 Z" fill="#0E1320" />
            <circle cx="150" cy="115" r="7" fill="#D4AF37" opacity="0.8" />
            <path d="M 230 320 Q 250 180 230 150 L 270 150 Q 250 180 270 320 Z" fill="#141A2B" opacity="0.9" />
            <rect x="360" y="160" width="80" height="160" fill="none" stroke="#0E1320" strokeWidth="12" />
            <path d="M 500 320 L 500 100 C 530 140 570 200 580 320 Z" fill="#141A2B" />
            <path d="M 500 100 L 600 320" stroke="#D4AF37" strokeWidth="2" opacity="0.6" />
            <path d="M 680 320 L 685 240 L 690 180 L 695 110 L 699 30 L 701 30 L 705 110 L 710 180 L 715 240 L 720 320 Z" fill="#141A2B" />
            <circle cx="700" cy="28" r="3" fill="#22D3EE" className="animate-pulse" />
            <line x1="700" y1="30" x2="700" y2="320" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
            <rect x="800" y="150" width="45" height="170" fill="#0E1320" />
            <rect x="860" y="120" width="55" height="200" fill="#141A2B" />
            <polygon points="860,120 887,80 915,120" fill="#141A2B" />
            <rect x="930" y="170" width="50" height="150" fill="#0E1320" />
            <rect x="1000" y="135" width="60" height="185" fill="#141A2B" />
          </svg>
        </div>

        {/* Layer 4: Perspective Grid Floor */}
        <div className="absolute inset-x-0 bottom-0 h-44 overflow-hidden pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent z-10" />
          <div
            className="w-[200%] -left-1/2 h-full origin-bottom"
            style={{
              transform: `perspective(400px) rotateX(68deg) translateY(${mousePos.y * -8}px)`,
              backgroundImage:
                'linear-gradient(to right, rgba(212, 175, 55, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 175, 55, 0.18) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        {/* Top Bar Status Indicator */}
        <div className="relative z-20 px-4 sm:px-6 pt-5 flex items-center justify-between text-xs font-mono">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#0E1320]/80 border border-white/10 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="text-[#F4F6FB] font-semibold tracking-wider text-[10px] sm:text-[11px] whitespace-nowrap">
              SYSTEM READY<span className="hidden sm:inline"> // INTERFACE ACTIVE</span>
            </span>
          </div>
        </div>

        {/* Center Hero: 3D Rotating Tech Globe Orbiting the Centered Name & Controls */}
        <div dir="ltr" className="relative z-20 flex flex-col items-center justify-center text-center px-4 my-auto w-full">
          <TechGlobe>
            <div className="flex flex-col items-center justify-center text-center space-y-5 max-w-4xl mx-auto">
              <div className="relative">
                <h1 dir="ltr" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight text-[#F4F6FB] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 md:gap-6 whitespace-nowrap">
                  {/* First Word: ADNAN */}
                  <span className="inline-flex items-center">
                    {firstName.map((char, i) => (
                      <motion.span
                        key={`first-${i}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: i * 0.04,
                          duration: 0.5,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="inline-block"
                        style={{ color: '#F4F6FB' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>

                  {/* Second Word: MUHAMMED */}
                  <span className="inline-flex items-center">
                    {lastName.map((char, i) => (
                      <motion.span
                        key={`last-${i}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: (firstName.length + i) * 0.04,
                          duration: 0.5,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="inline-block"
                        style={{ color: '#D4AF37' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                </h1>

                {/* Subtitle */}
                <motion.p
                  dir="ltr"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-sm sm:text-lg text-[#9AA4BC] font-sans font-medium tracking-wide mt-3 max-w-2xl mx-auto"
                >
                  Full-Stack Developer &amp; Cloud Systems —{' '}
                  <span className="text-[#F5E6A8] font-semibold">Building Real-World Web Applications</span>
                </motion.p>
              </div>

              {/* Glowing Pulsing "PRESS START" Button */}
              <motion.div
                dir="ltr"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="pt-2 flex flex-col items-center gap-2.5"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePressStart();
                  }}
                  className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F5E6A8] via-[#D4AF37] to-[#C59B27] text-[#070A12] font-heading font-black text-sm sm:text-base tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-3"
                >
                  <span className="text-xs">▶</span>
                  <span>PRESS START</span>
                  <span className="text-xs">◀</span>
                </button>
                <span className="text-[11px] font-mono text-[#9AA4BC] tracking-wider animate-pulse">
                  Press Enter / Click outside or Start
                </span>
              </motion.div>
            </div>
          </TechGlobe>
        </div>

      {/* Bottom-Right Interactive Robot Assistant */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 0.6, duration: 0.6 },
          scale: { delay: 0.6, duration: 0.6 },
          y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
        }}
        className="absolute bottom-16 sm:bottom-20 right-4 sm:right-8 md:right-12 z-30 pointer-events-auto cursor-pointer group"
        onClick={(e) => {
          e.stopPropagation();
          handlePressStart();
        }}
        title="AI Bot — Coming Soon"
      >
        {/* Floating Tooltip: Appears ONLY on mouse touch/hover */}
        <div className="absolute -top-11 sm:-top-12 -left-20 sm:-left-24 bg-[#0E1320]/95 backdrop-blur-md border border-[#D4AF37]/50 px-3 py-1.5 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex items-center gap-2 pointer-events-none whitespace-nowrap z-40 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
          </span>
          <span className="text-[11px] font-sans font-medium text-white flex items-center gap-1.5">
            <span>AI Bot</span>
            <span className="text-[#9AA4BC]">•</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold tracking-wide">
              Coming Soon
            </span>
          </span>
          {/* Bubble tail arrow */}
          <div className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-[#0E1320] border-r border-b border-[#D4AF37]/50 rotate-45 transform" />
        </div>

        {/* Robot Figure Container */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 transition-transform duration-300 group-hover:scale-105">
          {/* Golden Warm Glow Aura */}
          <div className="absolute inset-1 bg-gradient-to-tr from-[#D4AF37]/35 via-[#F5E6A8]/25 to-[#D4AF37]/40 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 opacity-70 transition-opacity" />
          <div
            className="w-full h-full relative z-10"
            style={{
              filter: 'hue-rotate(28deg) saturate(1.3) brightness(1.08) drop-shadow(0 4px 24px rgba(212, 175, 55, 0.4))'
            }}
          >
            <DotLottieReact
              src="/animations/lottiefile_robo.lottie"
              loop
              autoplay
              className="w-full h-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom HUD: Audio & Status */}
      <div dir="ltr" className="relative z-20 px-6 pb-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9AA4BC] border-t border-white/5 pt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleAudioToggle}
            className="p-2 rounded-full bg-[#0E1320] border border-[#D4AF37]/20 hover:border-[#D4AF37] text-[#D4AF37] transition-all flex items-center gap-1.5 px-3"
            title={audioMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
          >
            {!audioMuted ? <FiVolume2 className="text-sm" /> : <FiVolumeX className="text-sm" />}
            <span className="text-[10px] uppercase font-bold">{audioMuted ? 'SFX: OFF' : 'SFX: ON'}</span>
          </button>
        </div>

        <div className="text-xs font-mono text-[#9AA4BC]">
          <span>Open for Opportunities · Kerala, India &amp; Remote</span>
        </div>
      </div>
    </div>
  );
}

export default TitleScreen;
