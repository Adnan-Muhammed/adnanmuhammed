import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiDownload,
  FiServer,
  FiLayers,
  FiCloud,
  FiTerminal,
  FiCheckCircle,
  FiArrowUpRight
} from 'react-icons/fi';
import { FaReact, FaNodeJs, FaDocker, FaAws } from 'react-icons/fa';
import {
  SiExpress,
  SiNginx,
  SiPostman,
  SiSupabase,
  SiMongodb,
  SiPostgresql
} from 'react-icons/si';
import { useLanguage } from '../i18n';
import { useTheme } from '../context';

const coreTech = [
  { name: 'React.js', icon: <FaReact className="text-[#61DAFB]" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-[#10B981]" /> },
  { name: 'Express.js', icon: <SiExpress className="text-[#F4F6FB]" /> },
  { name: 'Docker', icon: <FaDocker className="text-[#2496ED]" /> },
  { name: 'AWS', icon: <FaAws className="text-[#FF9900]" /> },
  { name: 'Nginx', icon: <SiNginx className="text-[#009639]" /> },
  { name: 'Postman', icon: <SiPostman className="text-[#FF6C37]" /> },
  { name: 'Supabase', icon: <SiSupabase className="text-[#3ECF8E]" /> },
  { name: 'MongoDB Atlas', icon: <SiMongodb className="text-[#47A248]" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#336791]" /> },
];

export default function Hero() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#070A12] dark:bg-[#070A12] light:bg-[#F8FAFC] transition-colors duration-300"
    >
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 start-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/5 light:bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 end-1/4 w-[450px] h-[450px] bg-[#22D3EE]/5 dark:bg-[#22D3EE]/5 light:bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-7 text-start">

            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0E1320] dark:bg-[#0E1320] light:bg-white border border-[#D4AF37]/30 dark:border-[#D4AF37]/30 light:border-amber-500/30 text-xs font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>{t('hero.status', 'Open for Full-Stack (MERN), Backend & Junior DevOps Roles')}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#22D3EE] dark:text-[#22D3EE] light:text-sky-600 font-bold">
                {t('hero.experienceBadge', 'Project-Based & Self-Taught Engineering Experience')}
              </p>

              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-heading tracking-tight leading-[1.08] text-white dark:text-white light:text-slate-900">
                <span className="block text-2xl sm:text-3xl font-normal text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 mb-1">
                  {t('hero.greeting', 'Hello, I am')}
                </span>
                <span className="gold-gradient-text">
                  {t('hero.name', 'Adnan Muhammed')}
                </span>
              </h1>

              <div className="text-lg sm:text-xl font-heading font-semibold text-[#22D3EE] dark:text-[#22D3EE] light:text-sky-700 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#D4AF37] rounded-full inline-block" />
                <span>{t('hero.role', 'Production-Ready Full-Stack Developer')}</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 leading-relaxed max-w-2xl font-sans"
            >
              {t('hero.tagline', 'Engineering real-world web applications, resilient backend architectures, and automated cloud deployments with Next.js, Node.js, Docker, and AWS.')}
            </motion.p>

            {/* CTA Buttons Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary CTA */}
              <a
                href="#projects"
                className="btn-cyber-primary group shadow-[0_4px_20px_rgba(212,175,55,0.3)] flex items-center gap-2"
              >
                <span>{t('hero.ctaProjects', 'Explore Featured Projects')}</span>
                <FiArrowRight className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </a>

              {/* Architecture CTA */}
              <a
                href="#architecture"
                className="btn-cyber-secondary flex items-center gap-2"
              >
                <FiCloud className="text-[#22D3EE]" />
                <span>{t('hero.ctaArchitecture', 'View Cloud Architecture')}</span>
              </a>

              {/* Contact CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#9AA4BC] hover:text-[#D4AF37] px-3 py-2 transition-colors"
              >
                <span>{t('hero.ctaContact', 'Get in Touch')}</span>
                <FiArrowUpRight className="rtl:rotate-180" />
              </a>
            </motion.div>

            {/* Fast Tech Chips Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200"
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 mb-3 flex items-center gap-2">
                <FiLayers className="text-[#D4AF37]" />
                <span>Core Production Stack</span>
              </div>
              <div dir="ltr" className="flex flex-wrap gap-2 justify-start">
                {coreTech.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-[#0E1320] dark:bg-[#0E1320] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-700 shadow-sm hover:border-[#D4AF37]/50 transition-colors"
                  >
                    <span>{tech.icon}</span>
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Architectural Terminal / System Preview (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              dir="ltr"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-md rounded-2xl bg-[#0E1320]/90 dark:bg-[#0E1320]/90 light:bg-white border border-[#D4AF37]/30 dark:border-[#D4AF37]/30 light:border-amber-500/20 shadow-2xl p-6 backdrop-blur-xl relative overflow-hidden text-left"
            >
              {/* Window Chrome Header */}
              <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <div className="text-[11px] font-mono text-[#D4AF37] flex items-center gap-1.5">
                  <FiServer size={12} />
                  <span>adnan@cloud-node: ~</span>
                </div>
              </div>

              {/* Architecture Blueprint Display */}
              <div className="space-y-4 font-mono text-xs">
                {/* System Stats Block */}
                <div className="p-3.5 rounded-xl bg-[#070A12] dark:bg-[#070A12] light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 space-y-1.5">
                  <div className="text-[10px] text-[#22D3EE] uppercase tracking-wider font-bold">
                    [SYSTEM_PROFILE]
                  </div>
                  <div className="text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                    <span className="text-[#D4AF37]">Dev</span>: Adnan Muhammed
                  </div>
                  <div className="text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600">
                    <span className="text-[#D4AF37]">Approach</span>: Project-Driven Engineering
                  </div>
                  <div className="text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600">
                    <span className="text-[#D4AF37]">Target</span>: Full-Stack / Backend / DevOps
                  </div>
                </div>

                {/* Cloud & Architecture Pipeline Block */}
                <div className="p-3.5 rounded-xl bg-[#070A12] dark:bg-[#070A12] light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 space-y-2">
                  <div className="text-[10px] text-[#10B981] uppercase tracking-wider font-bold flex items-center justify-between">
                    <span>[PRODUCTION_SYSTEMS]</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div className="flex items-center justify-between text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                      <span>ZyDocCare Health</span>
                      <span className="text-[10px] text-[#D4AF37]">EC2 + S3 + Docker</span>
                    </div>
                    <div className="text-[10px] text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500">
                      Razorpay · WebRTC Video · Presigned URLs
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] pt-1.5 border-t border-white/5 dark:border-white/5 light:border-slate-200">
                    <div className="flex items-center justify-between text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                      <span>LinguaChat</span>
                      <span className="text-[10px] text-[#22D3EE]">Next.js + Supabase</span>
                    </div>
                    <div className="text-[10px] text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500">
                      Socket.IO 1:1 Chat · WebRTC · AI Tutor
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] pt-1.5 border-t border-white/5 dark:border-white/5 light:border-slate-200">
                    <div className="flex items-center justify-between text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                      <span>E-Commerce Platform</span>
                      <span className="text-[10px] text-[#A78BFA]">Node.js + EJS</span>
                    </div>
                    <div className="text-[10px] text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500">
                      SSR · MVC Pattern · Order Lifecycles
                    </div>
                  </div>
                </div>

                {/* Quick Link to Terminal */}
                <a
                  href="#terminal"
                  className="w-full py-2.5 px-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-[#D4AF37]/10 border border-white/10 dark:border-white/10 light:border-slate-200 text-[#D4AF37] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <FiTerminal size={14} />
                    <span>Launch Interactive CLI</span>
                  </span>
                  <FiArrowRight className="rtl:rotate-180" size={12} />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section >
  );
}
