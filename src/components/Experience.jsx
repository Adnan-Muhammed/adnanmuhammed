import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiArrowUpRight,
  FiLayers,
  FiCode,
  FiAward
} from 'react-icons/fi';
import { SectionTitle } from './ui/SectionTitle';
import { GlassCard } from './ui/GlassCard';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../i18n';
import { trackEvent } from '../utils/analytics';

export default function Experience() {
  const { t, lang, isRTL } = useLanguage();
  const hasTrackedSection = useRef(false);
  const trackedRoles = useRef(new Set());

  // GA4: Track section view once when user scrolls into Experience
  useEffect(() => {
    const section = document.getElementById('experience');
    if (!section || hasTrackedSection.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTrackedSection.current) {
          hasTrackedSection.current = true;
          trackEvent('section_view', {
            section_name: 'experience',
            location: 'experience_section',
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleRoleInView = (roleId, company, roleName) => {
    if (!trackedRoles.current.has(roleId)) {
      trackedRoles.current.add(roleId);
      trackEvent('experience_card_view', {
        role_id: roleId,
        company,
        role_name: roleName,
        location: 'experience_timeline',
      });
    }
  };

  const experiences = [
    {
      id: 'independent',
      role: t('experience.independent.role', 'Independent Full-Stack Developer'),
      company: t('experience.independent.company', 'Freelance & Independent Projects'),
      type: t('experience.independent.type', 'Freelance'),
      period: t('experience.independent.period', 'Nov 2024 – Present'),
      status: t('experience.independent.status', 'Current Role'),
      isCurrent: true,
      location: t('experience.independent.location', 'Kerala, India · Remote'),
      summary: t(
        'experience.independent.summary',
        'Focused on independent full-stack product development alongside freelance website and landing-page projects for local clients.'
      ),
      highlights: [
        t(
          'experience.independent.h1',
          'Developed full-stack web applications integrating modern frontend and backend architectures.'
        ),
        t(
          'experience.independent.h2',
          'Managed containerization and cloud deployments using Docker, automated CI/CD pipelines, and AWS services (EC2, S3, and IAM access management).'
        ),
        t(
          'experience.independent.h3',
          'Delivered freelance website and landing-page development projects for local clients from concept to launch.'
        ),
      ],
      skills: [
        'Next.js',
        'React.js',
        'Node.js',
        'Docker',
        'AWS (EC2, S3, IAM)',
        'CI/CD',
        'MongoDB / PostgreSQL'
      ],
      accent: '#D4AF37',
      glow: 'gold',
    },
    {
      id: 'brototype',
      role: t('experience.brototype.role', 'MERN Stack Developer Intern'),
      company: t('experience.brototype.company', 'Brototype'),
      type: t('experience.brototype.type', 'Intensive Apprenticeship'),
      period: t('experience.brototype.period', 'Jun 2023 – Nov 2024'),
      status: t('experience.brototype.status', '1.5 Years · Completed'),
      isCurrent: false,
      location: t('experience.brototype.location', 'Kochi, Kerala, India'),
      summary: t(
        'experience.brototype.summary',
        'Completed 1.5 years of project-based MERN Stack training, gaining hands-on experience in building full-stack web applications.'
      ),
      highlights: [
        t(
          'experience.brototype.h1',
          'Built full-stack web applications using MongoDB, Express.js, React.js, and Node.js with secure authentication and REST APIs.'
        ),
        t(
          'experience.brototype.h2',
          'Underwent rigorous weekly code reviews, architectural defenses, and debugging drills evaluated by senior developers (5+ years experienced).'
        ),
        t(
          'experience.brototype.h3',
          'Cultivated strong self-directed engineering discipline to independently research, solve complex bugs, and rapidly learn new technologies.'
        ),
      ],
      skills: [
        'MongoDB',
        'Express.js',
        'React.js',
        'Node.js',
        'REST APIs',
        'Git & GitHub'
      ],
      accent: '#22D3EE',
      glow: 'cyan',
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-20 bg-[#070A12] dark:bg-[#070A12] light:bg-[#F8FAFC] border-t border-white/5 dark:border-white/5 light:border-slate-200 overflow-hidden transition-colors duration-300"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 -start-40 w-96 h-96 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/5 light:bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -end-40 w-96 h-96 bg-[#22D3EE]/5 dark:bg-[#22D3EE]/5 light:bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t('experience.badge', 'Work History & Career')}
            title={
              lang === 'ar' ? (
                <>
                  الخبرة الهندسية والعملية{' '}
                  <span className="gold-gradient-text">في بيئات الإنتاج</span>
                </>
              ) : (
                <>
                  Engineering Work Experience &{' '}
                  <span className="gold-gradient-text">Career History</span>
                </>
              )
            }
            subtitle={t(
              'experience.subtitle',
              'Hands-on experience in full-stack web development, client projects, and 1.5 years of intensive engineering training.'
            )}
          />
        </Reveal>

        {/* Experience Timeline Cards */}
        <div className="relative mt-12 space-y-8">
          {/* Subtle vertical connector guide line (visible on md+) */}
          <div
            className={`hidden md:block absolute top-6 bottom-6 ${isRTL ? 'right-[27px]' : 'left-[27px]'
              } w-[2px] bg-gradient-to-b from-[#D4AF37]/40 via-[#22D3EE]/30 to-transparent pointer-events-none`}
          />

          {experiences.map((exp, idx) => (
                <Reveal
                  key={exp.id}
                  delay={idx * 0.15}
                  onViewportEnter={() => handleRoleInView(exp.id, exp.company, exp.role)}
                >
                  <div
                    className="relative md:ps-16"
                    data-analytics-section="experience"
                    data-analytics-role={exp.id}
                  >
                    {/* Timeline Node Icon (Desktop) */}
                    <div
                      className={`hidden md:flex absolute top-7 ${isRTL ? '-right-0' : '-left-0'
                        } w-14 h-14 rounded-2xl bg-[#0E1320] dark:bg-[#0E1320] light:bg-white border ${exp.isCurrent
                          ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                          : 'border-[#22D3EE]/60 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                        } items-center justify-center text-lg z-10`}
                    >
                      <FiBriefcase
                        className={
                          exp.isCurrent
                            ? 'text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-600'
                            : 'text-[#22D3EE] dark:text-[#22D3EE] light:text-sky-600'
                        }
                      />
                      {exp.isCurrent && (
                        <span className="absolute -top-1 -end-1 w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
                      )}
                      {exp.isCurrent && (
                        <span className="absolute -top-1 -end-1 w-3 h-3 rounded-full bg-[#10B981]" />
                      )}
                    </div>

                    {/* Experience Card */}
                    <GlassCard
                      glow={exp.glow}
                      className="p-6 sm:p-8 space-y-6 text-start"
                    >
                      {/* Card Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-5">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white dark:text-white light:text-slate-900">
                              {exp.role}
                            </h3>
                            {exp.isCurrent ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-mono text-xs font-bold">
                                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                                {exp.status}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] dark:text-[#22D3EE] light:text-sky-700 border border-[#22D3EE]/30 font-mono text-xs font-bold">
                                <FiAward size={12} />
                                {exp.status}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 font-semibold">
                            <span className="flex items-center gap-1.5">
                              <FiBriefcase size={14} className="shrink-0" />
                              <span>{exp.company}</span>
                            </span>
                            <span className="text-white/20">•</span>
                            <span className="text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 font-normal">
                              {exp.type}
                            </span>
                          </div>
                        </div>

                        {/* Metadata Badges (Duration & Location) */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 lg:gap-3 shrink-0">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070A12]/80 dark:bg-[#070A12]/80 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono text-white dark:text-white light:text-slate-800">
                            <FiCalendar size={13} className="text-[#D4AF37] shrink-0" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070A12]/80 dark:bg-[#070A12]/80 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600">
                            <FiMapPin size={13} className="text-[#22D3EE] shrink-0" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Summary Paragraph */}
                      <p className="text-sm sm:text-base text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-700 font-sans leading-relaxed">
                        {exp.summary}
                      </p>

                      {/* Key Highlights / Achievements */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 font-bold flex items-center gap-2">
                          <FiLayers size={13} className="text-[#D4AF37]" />
                          <span>{t('experience.keyContributions', 'Key Contributions')}</span>
                        </h4>

                        <div className="grid grid-cols-1 gap-2.5">
                          {exp.highlights.map((point, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-xl bg-[#070A12]/50 dark:bg-[#070A12]/50 light:bg-slate-50/80 border border-white/5 dark:border-white/5 light:border-slate-200"
                            >
                              <FiCheckCircle
                                size={16}
                                className={`shrink-0 mt-0.5 ${exp.isCurrent
                                    ? 'text-[#10B981]'
                                    : 'text-[#22D3EE] dark:text-[#22D3EE] light:text-sky-600'
                                  }`}
                              />
                              <span className="text-xs sm:text-sm text-[#cbd5e1] dark:text-[#cbd5e1] light:text-slate-700 leading-relaxed font-sans">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills (GA4 Interactive) */}
                      <div className="pt-1 flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 flex items-center gap-1 me-1">
                          <FiCode size={12} />
                          <span>Stack:</span>
                        </span>
                        {exp.skills.map((skill) => (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => {
                          trackEvent('experience_skill_click', {
                            skill,
                            role_id: exp.id,
                            company: exp.company,
                            location: 'experience_stack_pill',
                          });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#141A2B] dark:bg-[#141A2B] light:bg-slate-100 hover:bg-[#1A2238] dark:hover:bg-[#1A2238] light:hover:bg-slate-200 border border-white/10 dark:border-white/10 light:border-slate-200 text-xs font-mono text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer text-start focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50"
                        title={`Explore ${skill} (${exp.company})`}
                        aria-label={`Skill: ${skill}`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <Reveal delay={0.3}>
          <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0E1320] via-[#141A2B] to-[#0E1320] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(0,0,0,0.4)]">
            <div className="space-y-1 text-center md:text-start">
              <span className="text-xs font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700 uppercase tracking-widest font-bold">
                {t('experience.ctaBadge', 'READY TO CONTRIBUTE')}
              </span>
              <h4 className="text-lg sm:text-xl font-bold font-heading text-white dark:text-white light:text-slate-900">
                {t('experience.ctaTitle', 'Looking for a Full-Stack Developer?')}
              </h4>
              <p className="text-xs sm:text-sm text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 max-w-xl">
                {t(
                  'experience.ctaDesc',
                  'Experienced in building and deploying full-stack web applications from architecture and APIs to production.'
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#cv"
                onClick={() =>
                  trackEvent('cta_click', {
                target: '#cv',
              source: 'experience_section',
              cta_name: 'Resume & Qualifications',
              location: 'experience_bottom_banner',
                  })
                }
              className="py-2.5 px-4 rounded-full bg-[#0E1320] text-white hover:text-[#D4AF37] border border-white/15 hover:border-[#D4AF37] text-xs font-heading font-semibold flex items-center gap-1.5 transition-all hover:scale-105"
              >
              <span>{t('nav.cv', 'Resume & Qualifications')}</span>
              <FiArrowUpRight size={14} className="rtl:rotate-180" />
            </a>
            <a
              href="#contact"
              onClick={() =>
                  trackEvent('cta_click', {
              target: '#contact',
            source: 'experience_section',
            cta_name: 'Get in Touch',
            location: 'experience_bottom_banner',
                  })
                }
            className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#F5E6A8] via-[#D4AF37] to-[#C59B27] text-[#070A12] font-heading font-bold text-xs shadow-md hover:brightness-105 transition-all hover:scale-105 flex items-center gap-1.5"
              >
            <span>{t('hero.ctaContact', 'Get in Touch')}</span>
            <FiArrowUpRight size={14} className="rtl:rotate-180" />
          </a>
      </div>
    </div>
        </Reveal >
      </div >
    </section >
  );
}

