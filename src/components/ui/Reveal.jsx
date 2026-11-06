import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  blur = 8,
  className = '',
  viewport = { once: true, margin: '-60px' },
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={viewport}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
