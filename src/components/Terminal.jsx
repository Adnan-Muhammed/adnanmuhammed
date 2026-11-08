import { useState, useRef, useEffect } from 'react';
import { FiWifi } from 'react-icons/fi';
import { trackEvent } from '../utils/analytics';
import { useLanguage } from '../i18n';

const COMMANDS = {
  help: [
    '──────────────────────────────────────',
    'ADNAN MUHAMMED // DEVELOPER CONSOLE v4.0.0-noir',
    '──────────────────────────────────────',
    '  help          - List all available terminal commands',
    '  about         - Background, self-taught path & focus areas',
    '  projects      - Overview of featured production systems',
    '  skills        - Core full-stack, DevOps & database technologies',
    '  cv            - Curriculum Vitae & profile summary',
    '  hire          - Direct pitch & availability for engineering roles',
    '  zydoc         - Deep-dive into ZyDocCare Health (EC2/S3/Docker)',
    '  linguachat    - Deep-dive into LinguaChat (Next.js/Socket.IO/AI)',
    '  architecture  - Cloud infrastructure & security breakdown',
    '  contact       - Direct communication coordinates',
    '  clear         - Clear terminal buffer',
    '──────────────────────────────────────',
  ],
  about: [
    'ADNAN MUHAMMED // Full-Stack Developer (MERN & Next.js) · Cloud Deployments',
    'Location: Kerala, India · Open for Remote & Global Relocation.',
    'Background: Self-taught, project-based software engineer.',
    'Focus: Building complete full-stack web applications, REST APIs,',
    '       low-latency real-time video/chat, and automated cloud deployments.',
  ],
  skills: [
    '[FRONTEND]    : Next.js (App Router), React.js, TypeScript, JavaScript (ES6+), Tailwind CSS',
    '[BACKEND]     : Node.js, Express.js, RESTful API Architecture, JWT, RBAC',
    '[DATABASES]   : MongoDB & Mongoose, PostgreSQL, Supabase',
    '[CLOUD/DEVOPS]: AWS EC2, S3 (ZyDoc only), Docker Compose (ZyDoc only), PM2 (E-Commerce), Vercel (ZyDoc & LinguaChat), Nginx, GitHub Actions CI/CD',
    '[REAL-TIME]   : Socket.IO (WebSockets), WebRTC (P2P Low-Latency Video)',
    '[OTHER]       : Git, GitHub, Razorpay Integration, Firebase, Google OAuth',
  ],
  projects: [
    '1. ZYDOCCARE HEALTH (Full-Stack Telemedicine & Cloud Infrastructure)',
    '   - Online video consultations (WebRTC), Google OAuth & JWT, Razorpay billing,',
    '   - AWS S3 dual storage (ZyDoc exclusive), Docker Compose, EC2, Vercel, Nginx, CI/CD.',
    '2. LINGUACHAT (Real-Time AI English Learning Platform)',
    '   - Next.js 16, TypeScript, Supabase, Google OAuth, WebRTC video calling, Gemini AI, Vercel.',
    '3. E-COMMERCE APPLICATION (Production AWS EC2 Deployment with PM2)',
    '   - Node.js, Express.js, EJS server-side rendering, MongoDB, Razorpay, deployed on AWS EC2 with PM2.',
  ],
  cv: [
    '📄 ADNAN MUHAMMED // CURRICULUM VITAE SUMMARY',
    'Role: Production-Ready Full-Stack Developer (MERN & Next.js)',
    'Core Focus: Next.js, React 19, Node.js, AWS (EC2/S3), Docker Compose, PM2, Vercel, WebRTC, MongoDB, PostgreSQL.',
    'Production Systems: ZyDocCare Health (Vercel/EC2/Docker Compose), LinguaChat (Vercel/AI), E-Commerce (EC2/PM2).',
    'Full Resume: Download PDF directly at /cv/Adnan-Muhammed-CV.pdf or view the CV section (#cv).',
  ],
  hire: [
    '💼 WHY HIRE ADNAN MUHAMMED?',
    '✓ Production-ready systems: Telemedicine (WebRTC, Docker Compose, AWS), Real-Time EdTech (Next.js, Supabase, Vercel).',
    '✓ Self-taught, rigorous problem solver who understands both application code and cloud deployment.',
    '✓ Available for: Full-Stack (MERN/Next.js), Backend & Junior DevOps opportunities.',
    '✓ Let\'s build together: Type "contact" for direct communication channels.',
  ],
  zydoc: [
    '★ ZYDOCCARE HEALTH // ARCHITECTURE SPECIFICATION ★',
    '  - Frontend: Responsive patient and doctor scheduling dashboards deployed on Vercel',
    '  - Backend: Node.js & Express Clean Architecture with Google OAuth & JWT auth',
    '  - Video Engine: WebRTC low-latency direct peer-to-peer consultation rooms',
    '  - Payment Gateway: Razorpay integration with transaction verification webhooks',
    '  - Cloud Storage: Dual AWS S3 strategy (public CDN + private 15-min presigned URLs) [ZyDoc Exclusive]',
    '  - Orchestration: Multi-container deployment managed via Docker Compose',
    '  - Infrastructure: AWS EC2 Ubuntu instance behind Nginx reverse proxy with SSL',
    '  - Deployment: Frontend on Vercel; Automated GitHub Actions CI/CD pipeline pushing to EC2',
  ],
  linguachat: [
    '★ LINGUACHAT // ARCHITECTURE SPECIFICATION ★',
    '  - Platform: Next.js 16 App Router with TypeScript & Tailwind CSS deployed on Vercel',
    '  - Database & Auth: Supabase PostgreSQL & Google OAuth authentication',
    '  - Real-Time Messaging: Supabase Realtime bi-directional connection',
    '  - Video Calling: WebRTC peer connection for face-to-face peer practice',
    '  - AI Tutor: Embedded Google Gemini API assisting with English fluency & grammar',
    '  - Deployment: Vercel Edge & Serverless Platform',
  ],
  ecommerce: [
    '★ E-COMMERCE APPLICATION // ARCHITECTURAL BASELINE ★',
    '  - Stack: Node.js, Express.js, EJS (Server-Side Rendering), MongoDB, Mongoose',
    '  - Architecture: Classic Model-View-Controller (MVC) pattern',
    '  - Core Workflows: Catalog filtering, session cart, Razorpay, in-app wallet refunds, OTP email auth',
    '  - Deployment: Deployed to production on AWS EC2 Ubuntu instance managed by PM2 process manager',
  ],
  architecture: [
    '★ CLOUD & SECURITY ARCHITECTURE WORKFLOWS ★',
    '  1. AWS S3 Presigned URLs (ZyDoc Exclusive): Private patient diagnostics encrypted at rest,',
    '     accessed exclusively via cryptographically signed temporary tokens.',
    '  2. Zero-Downtime Deployment: Vercel for Next.js apps (ZyDoc & LinguaChat), Docker Compose on EC2 (ZyDoc), PM2 on EC2 (E-Commerce).',
    '  3. WebRTC Mesh: Socket.IO / Supabase for signaling -> ICE STUN/TURN -> Direct P2P media streams.',
  ],
  contact: [
    'DIRECT CHANNELS:',
    '  - WhatsApp : Instant Connect (Click the WhatsApp button in Navbar / Contact)',
    '  - Email    : adnan.shajahan786@gmail.com',
    '  - GitHub   : https://github.com/adnan-Muhammed/',
    '  - LinkedIn : https://www.linkedin.com/in/adnan-muhammed-s/',
    '  - Location : Kerala, India (Open for Remote & Global Relocation)',
  ],
  konami: [
    '🎮 ACCESS GRANTED: GOD MODE ACTIVATED!',
    'Cheat code unlocked. 30 extra cloud instances provisioned with zero latency.',
  ],
};

const quickChips = ['help', 'about', 'projects', 'skills', 'cv', 'hire', 'contact', 'clear'];

export default function Terminal() {
  const { t, lang } = useLanguage();

  const [history, setHistory] = useState([
    { type: 'output', text: 'Adnan Muhammed Developer Console [v4.0.0-noir]' },
    { type: 'output', text: 'Connected to edge runtime · Kerala / Worldwide' },
    { type: 'output', text: 'Type "help" or click a command below to explore.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    trackEvent('terminal_command', { command: trimmed });

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const commandResult = COMMANDS[trimmed];
    const newEntries = [{ type: 'input', text: `adnan:~$ ${cmdText}` }];

    if (commandResult) {
      commandResult.forEach((line) => {
        newEntries.push({ type: 'output', text: line });
      });
    } else {
      newEntries.push({
        type: 'error',
        text: `Command not recognized: "${cmdText}". Type "help" to see valid commands.`,
      });
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    }
  };

  return (
    <section
      className="relative scroll-mt-20 md:scroll-mt-8 pt-8 pb-16 md:pt-14 md:pb-20 bg-[#070A12] border-t border-white/5 overflow-hidden font-sans transition-colors duration-300"
      id="terminal"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6">
        {/* Eyebrow Pill */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E1320] border border-white/10 text-[11px] font-mono text-[#D4AF37] shadow-sm">
            <span className="text-[#9AA4BC] font-bold">&gt;_</span>
            <span className="tracking-wider uppercase font-semibold">
              {t('terminal.badge', 'HIRE ME THE GEEK WAY')}
            </span>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-heading text-white tracking-tight">
            {lang === 'ar' ? (
              <>
                الطرفية البرمجية <span className="gold-gradient-text">التفاعلية</span>
              </>
            ) : (
              <>
                Developer <span className="gold-gradient-text">Console</span>
              </>
            )}
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#9AA4BC] max-w-2xl mx-auto">
            {t(
              'terminal.subtitle',
              'Interactive CLI to query technical specifications, client credentials, and direct commands.'
            )}
          </p>
        </div>

        {/* Terminal Window Chrome */}
        <div
          dir="ltr"
          className="mt-6 sm:mt-8 rounded-2xl bg-[#090D16] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden font-mono text-left flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-3 sm:px-4 py-2.5 bg-[#0E1320] border-b border-white/10 flex items-center justify-between select-none">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444]/90" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B]/90" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10B981]/90" />
              </div>
              <span className="text-xs text-[#9AA4BC] ms-1 truncate">
                adnan@portfolio ~ zsh
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-[11px] shrink-0">
              <span className="text-[#10B981] flex items-center gap-1.5 font-medium">
                <FiWifi size={12} className="text-[#10B981]" />
                <span>connected</span>
              </span>
              <span className="text-[#64748B] text-[10px] font-mono hidden sm:inline">UTF-8</span>
            </div>
          </div>

          {/* Screen Output Area - STRICTLY FIXED HEIGHT & INNER SCROLLING */}
          <div
            ref={outputRef}
            onClick={() => inputRef.current?.focus()}
            className="h-[340px] sm:h-[280px] overflow-y-auto overflow-x-hidden p-3.5 sm:p-5 space-y-1.5 cursor-text text-xs leading-relaxed font-mono select-text [scrollbar-width:thin] [scrollbar-color:rgba(212,175,55,0.4)_transparent]"
          >
            {history.map((item, idx) => (
              <div
                key={idx}
                className={`break-words whitespace-pre-wrap ${item.type === 'input'
                  ? 'text-[#22D3EE] font-semibold'
                  : item.type === 'error'
                    ? 'text-[#EF4444]'
                    : 'text-[#E2E8F0]'
                  }`}
              >
                {item.text}
              </div>
            ))}
          </div>

          {/* Quick Command Chips - Placed inside terminal above the prompt line */}
          <div className="px-3 sm:px-4 py-2 bg-[#070A12]/90 border-t border-white/5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-[11px] font-mono [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="text-[#9AA4BC] text-[10px] uppercase font-bold shrink-0 tracking-wider">
              QUICK:
            </span>
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => executeCommand(chip)}
                className="px-2.5 py-1.5 rounded-lg bg-[#0E1320] hover:bg-[#D4AF37]/20 text-[#D4AF37] hover:text-white border border-white/10 transition-colors shrink-0 text-xs flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <span className="opacity-70">$</span>
                <span>{chip}</span>
              </button>
            ))}
          </div>

          {/* Prompt Input Line */}
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0B0F19] border-t border-white/10 flex items-center gap-2 sm:gap-2.5">
            <span className="text-[#D4AF37] font-bold text-xs shrink-0 select-none">
              adnan:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type command (e.g. 'help')..."
              className="flex-1 min-w-0 bg-transparent text-[#F4F6FB] placeholder-[#64748B] text-xs focus:outline-none font-mono"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#141A2B] border border-white/10 hover:border-[#D4AF37]/50 text-xs font-mono text-[#D4AF37] hover:text-white transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0 cursor-pointer"
              aria-label="Execute command"
            >
              <span>RUN</span>
              <span className="text-[10px] opacity-80">↵</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
