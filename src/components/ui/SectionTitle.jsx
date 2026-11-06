import { motion } from 'framer-motion';

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`max-w-3xl mb-14 space-y-3 ${isCenter ? 'mx-auto text-center' : 'text-left rtl:text-right'
        } ${className}`}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
      className={`inline-flex items-center gap-2 px-3.5 py-1 bg-[#0E1320] dark:bg-[#0E1320] light:bg-white border border-[#D4AF37]/30 dark:border-[#D4AF37]/30 light:border-amber-500/30 text-[#F5E6A8] dark:text-[#F5E6A8] light:text-amber-700 font-mono text-xs uppercase tracking-widest rounded-full shadow-sm ${isCenter ? 'justify-center' : ''
        }`}
        >
      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
      <span>{eyebrow}</span>
    </motion.div>
  )
}

{
  title && (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-[#F4F6FB] dark:text-[#F4F6FB] light:text-[#0F172A] leading-tight"
    >
      {title}
    </motion.h2>
  )
}

{
  subtitle && (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-base sm:text-lg text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 font-sans leading-relaxed font-normal"
    >
      {subtitle}
    </motion.p>
  )
}
    </div >
  );
}

export default SectionTitle;
