import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const GlassCard = forwardRef(function GlassCard(
  {
    children,
    className = '',
    variant = 'surface', // 'surface' | 'elevated' | 'subtle'
    glow = 'gold', // 'gold' | 'cyan' | 'magenta' | 'none'
    hover = true,
    rounded = '2xl', // 'xl' (16px) | '2xl' (20px) | '3xl' (24px)
    onClick,
    ...props
  },
  ref
) {
  const bgStyles = {
    surface: 'bg-[#0E1320]/80 dark:bg-[#0E1320]/80 light:bg-white/95 backdrop-blur-xl',
    elevated: 'bg-[#141A2B]/85 dark:bg-[#141A2B]/85 light:bg-slate-50/95 backdrop-blur-xl',
    subtle: 'bg-[#070A12]/60 dark:bg-[#070A12]/60 light:bg-slate-100/80 backdrop-blur-md',
  };

  const roundedStyles = {
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  const glowHoverStyles = {
    gold: 'hover:border-[#D4AF37]/40 dark:hover:border-[#D4AF37]/40 light:hover:border-amber-500/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_25px_-5px_rgba(212,175,55,0.18)] light:hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)]',
    cyan: 'hover:border-[#22D3EE]/40 dark:hover:border-[#22D3EE]/40 light:hover:border-sky-500/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_25px_-5px_rgba(34,211,238,0.18)] light:hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)]',
    magenta: 'hover:border-[#FF3D8B]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45),0_0_25px_-5px_rgba(255,61,139,0.18)]',
    none: 'hover:border-white/20 dark:hover:border-white/20 light:hover:border-slate-300',
  };

  const baseClasses = `relative border border-white/10 dark:border-white/10 light:border-slate-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.36)] light:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ${bgStyles[variant] || bgStyles.surface
    } ${roundedStyles[rounded] || roundedStyles['2xl']} ${hover ? `${glowHoverStyles[glow] || glowHoverStyles.gold} hover:-translate-y-1` : ''
    } ${className}`;

  return (
    <motion.div
      ref={ref}
      className={baseClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export default GlassCard;
