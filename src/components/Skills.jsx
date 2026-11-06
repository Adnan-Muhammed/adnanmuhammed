import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiCloud,
  FiRadio,
  FiLock,
  FiCheck,
  FiLayers
} from 'react-icons/fi';
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaGithub
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiNginx,
  SiGithubactions,
  SiSocketdotio,
  SiWebrtc,
  SiJsonwebtokens,
  SiFirebase,
  SiRazorpay,
  SiGoogle,
  SiVercel,
  SiStrapi,
  SiNetlify
} from 'react-icons/si';
import { SectionTitle } from './ui/SectionTitle';
import { GlassCard } from './ui/GlassCard';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../i18n';

const skillCategories = [
  {
    id: 'frontend',
    titleKey: 'skills.frontend',
    title: 'Frontend Engineering',
    icon: <FiCode className="text-[#22D3EE]" size={20} />,
    accent: '#22D3EE',
    skills: [
      { name: 'Next.js (App Router)', icon: <SiNextdotjs />, note: 'SSR, Client Components, Dynamic Routing in LinguaChat' },
      { name: 'React.js', icon: <FaReact className="text-[#22D3EE]" />, note: 'Hooks, Custom State, Virtual DOM & Performance' },
      { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" />, note: 'Strict Type Safety, Interfaces, Generics' },
      { name: 'JavaScript (ES6+)', icon: <SiJavascript className="text-[#F7DF1E]" />, note: 'Async/Await, Closures, Event Loop, DOM APIs' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#38BDF8]" />, note: 'Responsive Layouts, Design Systems, RTL Mode' },
    ],
  },
  {
    id: 'backend',
    titleKey: 'skills.backend',
    title: 'Backend & Systems',
    icon: <FiServer className="text-[#D4AF37]" size={20} />,
    accent: '#D4AF37',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs className="text-[#10B981]" />, note: 'Event-driven Architecture, Streams, Cluster Modules' },
      { name: 'Express.js', icon: <SiExpress />, note: 'REST API Design, Middleware Pipelines, Error Handling' },
      { name: 'RESTful API Architecture', icon: <FiLayers className="text-[#D4AF37]" />, note: 'Resource Modeling, Status Codes, Versioning' },
      { name: 'EJS (SSR Templating)', icon: <FiCode className="text-[#A78BFA]" />, note: 'Server-Side Rendering used in E-Commerce' },
      { name: 'Strapi CMS', icon: <SiStrapi className="text-[#4945FF]" />, note: 'Headless CMS, Content Schemas & REST/GraphQL APIs' },
    ],
  },
  {
    id: 'database',
    titleKey: 'skills.database',
    title: 'Databases & Storage',
    icon: <FiDatabase className="text-[#10B981]" size={20} />,
    accent: '#10B981',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" />, note: 'Document Modeling, Aggregation Pipelines, Indexes' },
      { name: 'Mongoose ORM', icon: <SiMongodb className="text-[#47A248]" />, note: 'Schema Validation, Population, Pre/Post Hooks' },
      { name: 'Supabase', icon: <SiSupabase className="text-[#3ECF8E]" />, note: 'Backend as a Service, Real-time Subscriptions in LinguaChat' },
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#336791]" />, note: 'Relational Schemas, Foreign Keys, SQL Queries' },
    ],
  },
  {
    id: 'devops',
    titleKey: 'skills.devops',
    title: 'Cloud & DevOps Infrastructure',
    icon: <FiCloud className="text-[#FF9900]" size={20} />,
    accent: '#FF9900',
    skills: [
      { name: 'AWS EC2', icon: <FaAws className="text-[#FF9900]" />, note: 'Ubuntu Server Provisioning, Security Groups, SSH' },
      { name: 'AWS S3 (Dual Mode)', icon: <FaAws className="text-[#FF9900]" />, note: 'Public Assets CDN + Private Presigned Expiring URLs' },
      { name: 'Docker & Docker Compose', icon: <FaDocker className="text-[#2496ED]" />, note: 'Multi-Container Compose Orchestration & Production Builds' },
      { name: 'PM2 Process Manager', icon: <FiServer className="text-[#D4AF37]" />, note: 'Process Monitoring, Auto-Restart & Production Clustering' },
      { name: 'Vercel Platform', icon: <SiVercel className="text-white" />, note: 'Serverless Edge Deployment' },
      { name: 'Netlify', icon: <SiNetlify className="text-[#00C7B7]" />, note: 'Jamstack Edge Deployment, Serverless Functions & CDN' },
      { name: 'Nginx', icon: <SiNginx className="text-[#009639]" />, note: 'Reverse Proxy, SSL Termination, Load Balancing' },
      { name: 'CI/CD (GitHub Actions)', icon: <SiGithubactions className="text-[#2088FF]" />, note: 'Automated Build, Test, and EC2 Deployment Pipelines' },
    ],
  },
  {
    id: 'realtime',
    titleKey: 'skills.realtime',
    title: 'Real-Time & Networking',
    icon: <FiRadio className="text-[#FF3D8B]" size={20} />,
    accent: '#FF3D8B',
    skills: [
      { name: 'Socket.IO', icon: <SiSocketdotio />, note: 'Real-Time Bi-Directional 1:1 Chat, Rooms & Online Presence' },
      { name: 'WebRTC', icon: <SiWebrtc className="text-[#339933]" />, note: 'Peer-to-Peer Video Consultations & Calling Streams' },
      { name: 'WebSocket Protocols', icon: <FiRadio className="text-[#FF3D8B]" />, note: 'Signaling Handshakes, STUN/TURN Candidate Exchanges' },
    ],
  },
  {
    id: 'security',
    titleKey: 'skills.security',
    title: 'Security, Payments & Tools',
    icon: <FiLock className="text-[#A78BFA]" size={20} />,
    accent: '#A78BFA',
    skills: [
      { name: 'Google OAuth & Auth', icon: <SiGoogle className="text-[#EA4335]" />, note: 'Federated Authentication in ZyDoc and LinguaChat' },
      { name: 'JWT Authentication', icon: <SiJsonwebtokens className="text-[#D63AFF]" />, note: 'Stateless Tokens, Refresh Tokens & RBAC Authorization' },
      { name: 'Razorpay Gateway', icon: <SiRazorpay className="text-[#0C2340]" />, note: 'Order Generation, Webhook Verification, Automated Payments' },
      { name: 'Git & GitHub', icon: <FaGithub />, note: 'Branching Strategies, Pull Requests, Code Reviews' },
      { name: 'Firebase', icon: <SiFirebase className="text-[#FFCA28]" />, note: 'Authentication & Cloud Messaging Services' },
    ],
  },
];

const getGridChildClasses = (id) => {
  switch (id) {
    case 'frontend':
    case 'backend':
    case 'database':
      return 'col-span-1 md:col-span-1 lg:col-span-2 min-w-0 flex flex-col h-full';
    case 'devops':
      return 'col-span-1 md:col-span-2 md:order-5 lg:col-span-6 lg:order-none min-w-0 flex flex-col h-full';
    case 'realtime':
      return 'col-span-1 md:col-span-1 lg:col-span-3 lg:order-none min-w-0 flex flex-col h-full';
    case 'security':
      return 'col-span-1 md:col-span-2 md:order-6 lg:col-span-3 lg:order-none min-w-0 flex flex-col h-full';
    default:
      return 'col-span-1 min-w-0 flex flex-col h-full';
  }
};

const getInnerGridClasses = (id) => {
  switch (id) {
    case 'frontend':
    case 'backend':
    case 'database':
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-2 sm:gap-2.5 md:gap-3';
    case 'devops':
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-2.5 md:gap-2.5 lg:gap-3';
    case 'realtime':
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-2.5 md:gap-3';
    case 'security':
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-2 gap-2 sm:gap-2.5 md:gap-2 lg:gap-3';
    default:
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-2 sm:gap-2.5 md:gap-3';
  }
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 sm:py-24 bg-[#070A12] dark:bg-[#070A12] light:bg-[#F8FAFC] border-t border-white/5 dark:border-white/5 light:border-slate-200 overflow-hidden transition-colors duration-300" id="skills">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t('skills.badge', 'Technical Matrix')}
            title={
              <>
                Skills &amp; Capabilities{' '}
                <span className="gold-gradient-text">Matrix</span>
              </>
            }
            subtitle={t('skills.subtitle', 'Verified competencies applied across production architectures and real-time systems.')}
          />
        </Reveal>

        {/* Responsive Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 items-stretch mt-8">
          {skillCategories.map((cat, idx) => {
            const childClasses = getGridChildClasses(cat.id);
            const innerGridClasses = getInnerGridClasses(cat.id);

            return (
              <Reveal key={cat.id} delay={idx * 0.08} className={childClasses}>
                <GlassCard className="p-4 sm:p-6 lg:p-7 flex flex-col flex-1 h-full" glow="gold">
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-4 text-start">
                      <div
                        className="p-2.5 rounded-xl border shadow-sm"
                        style={{
                          borderColor: `${cat.accent}40`,
                          backgroundColor: `${cat.accent}15`,
                        }}
                      >
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold font-heading text-white dark:text-white light:text-slate-900">
                          {t(cat.titleKey, cat.title)}
                        </h3>
                        <div className="text-[11px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500">
                          {cat.skills.length} core technologies
                        </div>
                      </div>
                    </div>

                    {/* Skills List - Strictly LTR */}
                    <div dir="ltr" className={`pt-4 text-left ${innerGridClasses}`}>
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="p-2 sm:p-2.5 rounded-xl bg-[#070A12]/50 dark:bg-[#070A12]/50 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-start min-w-0"
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1 min-w-0">
                            <span className="text-sm shrink-0">{skill.icon}</span>
                            <div className="min-w-0 flex-1">
                              <span className="text-xs font-bold font-heading text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800 break-words leading-snug block">
                                {skill.name}
                              </span>
                            </div>
                          </div>
                          {skill.note && (
                            <div className="min-w-0 text-[10px] sm:text-[11px] text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500 font-sans leading-snug break-words">
                              {skill.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practical Verification Footer - pinned to bottom */}
                  <div className="mt-auto pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-200 flex items-center justify-between text-[10px] font-mono text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-500">
                    <span className="flex items-center gap-1 text-[#10B981]">
                      <FiCheck size={12} />
                      <span>Applied in production code</span>
                    </span>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
