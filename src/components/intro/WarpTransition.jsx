import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cyberAudio } from '../../utils/cyberAudio';

export function WarpTransition({ onComplete, selectedClass }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Lock body scroll during warp transition
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    cyberAudio.playWhoosh();

    const timer = setTimeout(() => {
      document.body.style.overflow = prevOverflow;
      onComplete();
    }, shouldReduceMotion ? 400 : 1200);

    return () => {
      document.body.style.overflow = prevOverflow;
      clearTimeout(timer);
    };
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 z-50 bg-[#070A12] flex items-center justify-center">
        <div className="font-heading font-black text-2xl text-[#D4AF37]">
          LEVEL 1 — WELCOME
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none select-none flex items-center justify-center">
      {/* Background Portal Iris Expansion */}
      <motion.div
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={{ clipPath: 'circle(150% at 50% 50%)' }}
        transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
        className="absolute inset-0 bg-[#070A12] flex items-center justify-center"
      >
        {/* Radial Light Streaks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.7, 0], scale: 2.2 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#D4AF37]/30 via-[#22D3EE]/20 to-transparent blur-3xl"
        />

        {/* Warp Light Tunnel Lines */}
        <motion.div
          initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0], rotate: 45, scale: 2.5 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_20px_#D4AF37]" />
          <div className="absolute w-full h-[2px] rotate-90 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent shadow-[0_0_20px_#22D3EE]" />
        </motion.div>
      </motion.div>

      {/* Floating Level 1 Banner (0.9s duration) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [30, 0, 0, -20],
          scale: [0.9, 1, 1, 0.95],
        }}
        transition={{ duration: 0.95, times: [0, 0.25, 0.75, 1], ease: 'easeInOut' }}
        className="relative z-20 px-8 py-4 rounded-2xl bg-[#0E1320]/90 backdrop-blur-2xl border border-[#D4AF37]/50 shadow-[0_0_40px_rgba(212,175,55,0.3)] text-center space-y-1"
      >
        <div className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase">
          INITIALIZATION COMPLETE // {selectedClass?.name || 'FULL PACKAGE'}
        </div>
        <div className="text-2xl sm:text-3xl font-black font-heading tracking-widest text-[#F4F6FB]">
          LEVEL 1 — WELCOME
        </div>
      </motion.div>
    </div>
  );
}

export default WarpTransition;
