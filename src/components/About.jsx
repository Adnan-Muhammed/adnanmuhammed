import {
  FiMapPin,
  FiCompass,
  FiServer,
  FiTarget,
  FiLayers,
  FiTerminal,
  FiCode,
  FiShield
} from 'react-icons/fi';
import { SectionTitle } from './ui/SectionTitle';
import { GlassCard } from './ui/GlassCard';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../i18n';

export default function About() {
  const { t, lang } = useLanguage();

  const targetRoles = [
    { title: 'Full-Stack Developer', desc: 'Next.js, React, Node.js, Express, TypeScript, REST APIs' },
    { title: 'Backend Engineer', desc: 'Distributed services, database modeling, authentication, WebSockets' },
    { title: 'Cloud Deployments & Junior DevOps', desc: 'AWS EC2, S3, Docker Compose, Nginx, CI/CD with GitHub Actions' },
  ];

  return (
    <section className="relative py-20 bg-[#070A12] dark:bg-[#070A12] light:bg-[#F8FAFC] border-t border-white/5 dark:border-white/5 light:border-slate-200 overflow-hidden transition-colors duration-300" id="about">
      {/* Background Accent */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/5 light:bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t('about.badge', 'Engineering Background')}
            title={
              lang === 'ar' ? (
          <>
            هندسة برمجيات متكاملة{' '}
            <span className="gold-gradient-text">وأنظمة سحابية للإنتاج</span>
          </>
          ) : (
          <>
            Engineering Production-Grade{' '}
            <span className="gold-gradient-text">Web &amp; Cloud Systems</span>
          </>
          )
            }
          subtitle={t('about.subtitle', 'Focused on clean architecture, resilient backend services, and automated cloud deployments.')}
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">

          {/* Left Column: Core Focus & Fact Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.1}>
              <GlassCard className="p-6 sm:p-7 space-y-6" glow="gold">
                {/* Profile Header */}
                <div className="flex items-center gap-4 border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#070A12] dark:bg-[#070A12] light:bg-slate-100 border border-[#D4AF37]/30 flex items-center justify-center font-orbitron font-black text-xl text-[#D4AF37]">
                    AM
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white dark:text-white light:text-slate-900">
                      Adnan Muhammed
                    </h3>
                    <p className="text-xs font-mono text-[#22D3EE] dark:text-[#22D3EE] light:text-sky-600">
                      Production-Ready Full-Stack Developer
                    </p>
                  </div>
                </div>

                {/* Key Facts Matrix */}
                <div className="space-y-3 text-start">
                  <div className="p-3 rounded-xl bg-[#070A12]/60 dark:bg-[#070A12]/60 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
                    <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider mb-0.5">
                      {t('about.facts.experience', 'Core Discipline')}
                    </div>
                    <div className="text-sm font-medium text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                      {t('about.facts.experienceVal', 'Full-Stack Architecture & Cloud Systems')}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#070A12]/60 dark:bg-[#070A12]/60 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
                    <div className="text-[10px] font-mono text-[#22D3EE] uppercase tracking-wider mb-0.5">
                      {t('about.facts.focus', 'Primary Focus')}
                    </div>
                    <div className="text-sm font-medium text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                      {t('about.facts.focusVal', 'Scalable APIs, Real-Time Media & Cloud Deployments')}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#070A12]/60 dark:bg-[#070A12]/60 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
                    <div className="text-[10px] font-mono text-[#10B981] uppercase tracking-wider mb-0.5">
                      {t('about.facts.location', 'Location & Availability')}
                    </div>
                    <div className="text-sm font-medium text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                      {t('about.facts.locationVal', 'Kerala, India · Open for Remote & Global Relocation')}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#070A12]/60 dark:bg-[#070A12]/60 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200">
                    <div className="text-[10px] font-mono text-[#A78BFA] uppercase tracking-wider mb-0.5">
                      {t('about.facts.stack', 'Core Technology Stack')}
                    </div>
                    <div dir="ltr" className="text-sm font-medium text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800 text-left">
                      {t('about.facts.stackVal', 'Next.js, Node.js, TypeScript, Docker, AWS, WebRTC')}
                    </div>
                  </div>
                </div>

                {/* Open to Work Pill */}
                <div className="p-3.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <span className="text-xs font-mono text-[#10B981] font-bold">
                    Actively interviewing for Engineering roles
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          {/* Right Column: Narrative & Target Disciplines (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            <Reveal delay={0.2}>
              <div className="space-y-4 text-base sm:text-lg text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 leading-relaxed font-sans">
                <p className="text-white dark:text-white light:text-slate-900 font-medium text-lg sm:text-xl">
                  {t('about.paragraph1', 'I am a Full-Stack & Backend Engineer focused on building complete, production-ready web applications from architecture to cloud deployment. I build software with deliberate system design, maintainable code, and high operational reliability.')}
                </p>

                <p>
                  {t('about.paragraph2', 'My hands-on experience bridges modern frontend interfaces (Next.js, React, TypeScript) with robust backend services (Node.js, Express, MongoDB, PostgreSQL), real-time communication channels (WebRTC, Socket.IO), and automated cloud pipelines (Docker, AWS EC2, S3, Nginx, GitHub Actions CI/CD).')}
                </p>
              </div>
            </Reveal>

            {/* Target Engineering Roles */}
            <Reveal delay={0.3}>
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-mono uppercase tracking-widest text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 font-bold flex items-center gap-2">
                  <FiTarget size={16} />
                  <span>{t('about.targetRolesTitle', 'Target Engineering Roles')}</span>
                </h4>

                <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  {targetRoles.map((role) => (
                    <div
                      key={role.title}
                      className="p-4 rounded-xl bg-[#0E1320] dark:bg-[#0E1320] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 space-y-1.5 shadow-sm hover:border-[#D4AF37]/50 transition-all text-left"
                    >
                      <div className="text-sm font-bold font-heading text-white dark:text-white light:text-slate-900">
                        {role.title}
                      </div>
                      <div className="text-xs text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 font-sans leading-normal">
                        {role.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}
