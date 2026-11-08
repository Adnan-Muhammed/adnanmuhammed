import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink,
  FiVideo,
  FiMessageSquare,
  FiShoppingBag,
  FiLayers,
  FiMaximize2,
  FiX
} from 'react-icons/fi';
import { SectionTitle } from './ui/SectionTitle';
import { GlassCard } from './ui/GlassCard';
import { Reveal } from './ui/Reveal';
import { trackEvent } from '../utils/analytics';
import { useLanguage } from '../i18n';

export default function Projects() {
  const { t, lang } = useLanguage();
  const [previewImage, setPreviewImage] = useState(null);

  const projects = [
    {
      id: 'zydoc',
      category: t('projects.zydoc.tag', 'Flagship Full-Stack System'),
      region: 'Vercel • AWS EC2 • Docker Compose • CI/CD',
      title: t('projects.zydoc.title', 'ZyDocCare Health'),
      live: 'https://carehealth.online',
      image: '/images/projects_image/zydocare_health.png',
      icon: <FiVideo className="text-[#D4AF37]" size={18} />,
      problem: t('projects.zydoc.problem', 'Telemedicine platforms face critical real-world edge cases: double-booking race conditions during simultaneous checkouts, dropped video calls during network fluctuations, and privacy risks with patient medical documents.'),
      solution: t('projects.zydoc.solution', 'Architected a modular full-stack system with Next.js deployed on Vercel and a Node.js backend structured using Clean Architecture on AWS EC2. Implemented Google OAuth & JWT authentication, atomic MongoDB slot reservation locks, WebRTC video with Socket.io signaling & reconnection handling, idempotent Razorpay refunds, and AWS S3 presigned URLs. Automated CI/CD deployments to AWS EC2 via GitHub Actions, Docker Compose, and Nginx.'),
      result: t('projects.zydoc.result', 'Zero double-booking conflicts via atomic database locks, secure patient medical record privacy via expiring S3 URLs, and automated zero-downtime EC2 deployments backed by automated test suites.'),
      stack: [
        'Clean Architecture',
        'Next.js',
        'TypeScript',
        'Node.js',
        'MongoDB',
        'Google OAuth',
        'WebRTC',
        'AWS S3 (Presigned URLs)',
        'Docker Compose',
        'AWS EC2',
        'Vercel',
        'GitHub Actions CI/CD',
        'Razorpay'
      ],
    },
    {
      id: 'linguachat',
      category: t('projects.linguachat.tag', 'Real-Time & AI EdTech Platform'),
      region: 'Next.js 16 • Supabase • WebRTC • Gemini AI',
      title: t('projects.linguachat.title', 'LinguaChat — AI English Platform'),
      live: 'https://linguachat-omega.vercel.app',
      image: '/images/projects_image/linguaChat_AI2.png',
      imageFit: 'object-contain',
      imagePosition: 'object-center',
      objectPosition: 'center',
      icon: <FiMessageSquare className="text-[#22D3EE]" size={18} />,
      problem: t('projects.linguachat.problem', 'Language learners face conversational anxiety, lack accessible speaking partners, and struggle without instant feedback on grammar and sentence construction.'),
      solution: t('projects.linguachat.solution', 'Architected a real-time platform with Next.js 16 and Supabase on Vercel. Features Supabase Realtime messaging, low-latency WebRTC video calling, Google OAuth, and an embedded Gemini AI assistant for instant grammar corrections and sentence building, secured by PostgreSQL RLS.'),
      result: t('projects.linguachat.result', 'Sub-100ms chat latency, direct P2P video practice with zero media overhead, instant AI feedback, and strict data isolation via PostgreSQL RLS.'),
      stack: [
        'Next.js 16',
        'TypeScript',
        'Supabase Realtime',
        'WebRTC',
        'Gemini API',
        'Tailwind CSS',
        'PostgreSQL RLS',
        'Google OAuth',
        'Vercel'
      ],
    },
    {
      id: 'ecommerce',
      category: t('projects.ecommerce.tag', 'Full-Stack E-Commerce Platform'),
      region: 'AWS EC2 • PM2 • Node.js • Express • MongoDB',
      title: t('projects.ecommerce.title', 'Full-Stack E-Commerce & Order Engine'),
      live: '',
      image: '/images/projects_image/e-commerce_website.png',
      icon: <FiShoppingBag className="text-[#A78BFA]" size={18} />,
      problem: t('projects.ecommerce.problem', 'E-commerce systems require resilient order lifecycle state machines, seamless payment gateways with refund handling, secure authentication, and optimized aggregation for complex sales analytics without database bottlenecks.'),
      solution: t('projects.ecommerce.solution', 'Architected a full-stack MVC application with Node.js, Express, and MongoDB, deployed to production on AWS EC2 using PM2 process manager for high availability. Integrated Razorpay alongside an in-app Wallet payment/refund workflow, Nodemailer OTP verification, PDFKit dynamic invoice generation, Multer image uploads, and compound indexing with aggregation pipelines for real-time sales reporting.'),
      result: t('projects.ecommerce.result', 'High availability and auto-restarts on AWS EC2 via PM2 process manager, fast aggregation queries via compound index scans (IXSCAN), instant automated refunds via in-app wallet, and automated PDF invoice generation.'),
      stack: [
        'Node.js',
        'Express.js',
        'MongoDB / Mongoose',
        'AWS EC2',
        'PM2 Process Manager',
        'EJS Templating',
        'Razorpay',
        'In-App Wallet & Refunds',
        'Nodemailer OTP',
        'PDFKit Invoicing',
        'Multer',
        'MVC Architecture'
      ],
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 bg-[#070A12] border-t border-white/5 overflow-hidden transition-colors duration-300" id="projects">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 end-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 start-0 w-[500px] h-[500px] bg-[#22D3EE]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t('projects.badge', 'Featured Work')}
            title={
              lang === 'ar' ? (
                <>
                  مشاريع وأنظمة{' '}
                  <span className="gold-gradient-text">إنتاجية حقيقية</span>
                </>
              ) : (
                <>
                  Real-World Production{' '}
                  <span className="gold-gradient-text">Applications</span>
                </>
              )
            }
            subtitle={t('projects.subtitle', 'End-to-end applications built with deliberate architectural decisions, cloud deployments, and solving real user problems.')}
          />
        </Reveal>

        {/* Stacked Project List */}
        <div className="space-y-12 sm:space-y-16 max-w-6xl mx-auto mt-12">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <GlassCard
                className="p-5 sm:p-6 lg:p-7 rounded-3xl group relative overflow-hidden transition-all duration-300 border-white/10 hover:border-[#D4AF37]/30"
                glow="gold"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  {/* Left Column (6 cols): Browser Mockup + Tech Stack + Action Buttons */}
                  <div className="lg:col-span-6 space-y-4">
                    {/* Browser Mockup Visual */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0E1320] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      {/* Browser Chrome Header */}
                      <div className="px-3.5 py-2 bg-[#141A2B] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs font-mono text-[#9AA4BC]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D8B]/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
                          </div>
                          <span className="ms-1.5 text-[11px] text-[#9AA4BC] truncate">
                            {project.live ? project.live.replace(/^https?:\/\//, '') : 'backend-engine • archival'}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#D4AF37] font-semibold text-start sm:text-end truncate max-w-[210px] shrink-0">
                          {project.region}
                        </span>
                      </div>

                      {/* Browser Viewport with Project Screenshot */}
                      <div
                        onClick={() => {
                          setPreviewImage(project.image);
                          trackEvent('project_image_preview', {
                            project_id: project.id,
                            project_name: project.title,
                          });
                        }}
                        className="relative aspect-[16/10] overflow-hidden bg-[#0A0D18] flex items-center justify-center cursor-zoom-in group/mockup"
                        title="Click to view full screenshot"
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          className={`w-full h-full ${project.imageFit || 'object-cover'} ${project.imagePosition || 'object-top'} transition-all duration-300 group-hover/mockup:scale-[1.02]`}
                          style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined}
                          onError={(e) => {
                            if (!e.currentTarget.dataset.fallbackTried) {
                              e.currentTarget.dataset.fallbackTried = 'true';
                              if (project.id === 'linguachat') {
                                e.currentTarget.src = '/images/projects_image/linguaChat_AI2.png';
                                return;
                              }
                              if (project.id === 'ecommerce') {
                                e.currentTarget.src = '/images/projects_image/e-commerce_website.png';
                                return;
                              }
                            }
                          }}
                        />

                        {/* Subtle Expand Indicator */}
                        <div className="absolute bottom-2.5 end-2.5 p-1.5 rounded-lg bg-[#070A12]/80 border border-white/10 text-[#D4AF37] opacity-0 group-hover/mockup:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-mono shadow-md backdrop-blur-sm pointer-events-none">
                          <FiMaximize2 size={12} />
                          <span>Full View</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9AA4BC]/80 block">
                        Technologies Used
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-[#141A2B] border border-white/10 text-[11px] font-mono text-[#F4F6FB]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-1 flex flex-wrap items-center gap-2.5">
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            trackEvent('project_live_visit', {
                              project_id: project.id,
                              project_name: project.title,
                              target_url: project.live,
                              location: 'projects_card',
                            });
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-xs bg-gradient-to-r from-[#D4AF37] to-[#F5E6A8] text-[#070A12] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-all cursor-pointer"
                        >
                          <span>{t('work.visitSite', 'Visit live site')}</span>
                          <FiExternalLink size={13} />
                        </a>
                      ) : null}

                      <a
                        href="#architecture"
                        onClick={() => {
                          trackEvent('project_architecture_click', {
                            project_id: project.id,
                            project_name: project.title,
                          });
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-heading font-medium text-xs text-[#9AA4BC] hover:text-white border border-white/10 hover:border-[#D4AF37]/40 bg-[#0E1320] transition-colors"
                      >
                        <FiLayers size={13} className="text-[#22D3EE]" />
                        <span>{t('projects.viewArchitecture', 'Architecture Breakdown')}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column (6 cols): Case Study Details */}
                  <div className="lg:col-span-6 space-y-3.5 text-start">
                    {/* Category & Region */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                        {project.icon}
                        {project.category}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-[11px] font-mono text-[#9AA4BC]">{project.region}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                      {project.title}
                    </h3>

                    {/* Challenge -> Architecture -> Impact */}
                    <div className="space-y-2.5 text-xs font-sans pt-1">
                      {/* CHALLENGE */}
                      <div className="px-3.5 py-2.5 rounded-xl bg-[#070A12]/80 border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#FF3D8B] tracking-wider block">
                          CHALLENGE
                        </span>
                        <p className="text-[#9AA4BC] text-xs leading-relaxed font-sans">
                          {project.problem}
                        </p>
                      </div>

                      {/* ARCHITECTURE */}
                      <div className="px-3.5 py-2.5 rounded-xl bg-[#070A12]/80 border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#D4AF37] tracking-wider block">
                          ARCHITECTURE
                        </span>
                        <p className="text-[#9AA4BC] text-xs leading-relaxed font-sans">
                          {project.solution}
                        </p>
                      </div>

                      {/* IMPACT */}
                      <div className="px-3.5 py-2.5 rounded-xl bg-[#10B981]/5 border border-[#10B981]/20 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase text-[#10B981] tracking-wider block">
                          IMPACT
                        </span>
                        <p className="text-[#cbd5e1] text-xs leading-relaxed font-sans">
                          {project.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Full-Screen Image Lightbox / Modal */}
      < AnimatePresence >
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-5 end-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <FiX size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={previewImage}
              alt="Project screenshot full view"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10 select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
