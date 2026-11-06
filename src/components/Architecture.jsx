import {
  FiCloud,
  FiLock,
  FiRefreshCw,
  FiVideo,
  FiServer,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
  FiTerminal
} from 'react-icons/fi';
import { FaAws, FaDocker, FaGithub } from 'react-icons/fa';
import { SiNginx, SiSocketdotio, SiWebrtc } from 'react-icons/si';
import { SectionTitle } from './ui/SectionTitle';
import { GlassCard } from './ui/GlassCard';
import { Reveal } from './ui/Reveal';
import { useLanguage } from '../i18n';

export default function Architecture() {
  const { t } = useLanguage();

  return (
    <section className="relative py-28 bg-[#070A12] dark:bg-[#070A12] light:bg-[#F8FAFC] border-t border-white/5 dark:border-white/5 light:border-slate-200 overflow-hidden transition-colors duration-300" id="architecture">
      {/* Subtle Background Accent */}
      <div className="absolute bottom-1/4 -start-32 w-80 h-80 bg-[#22D3EE]/5 dark:bg-[#22D3EE]/5 light:bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionTitle
            eyebrow={t('architecture.badge', 'Systems Deep-Dive')}
            title={
              <>
                Cloud Infrastructure &amp;{' '}
                <span className="gold-gradient-text">System Architecture</span>
              </>
            }
            subtitle={t('architecture.subtitle', 'Transparent technical breakdowns of how my applications handle security, storage, real-time media, and automated deployment.')}
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Architecture Card 1: AWS S3 Dual Storage & Presigned URLs */}
          <Reveal delay={0.1}>
            <GlassCard className="p-7 space-y-6 h-full flex flex-col justify-between" glow="gold">
              <div className="space-y-4 text-start">
                {/* Header Icon */}
                <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-4">
                  <div className="p-3 rounded-2xl bg-[#FF9900]/15 text-[#FF9900] border border-[#FF9900]/30 shadow-sm">
                    <FaAws size={24} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 font-bold">
                    Medical Data Privacy
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-white dark:text-white light:text-slate-900">
                  {t('architecture.s3Title', 'AWS S3 Dual Storage & Presigned URLs')}
                </h3>

                <p className="text-xs sm:text-sm text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 leading-relaxed font-sans">
                  {t('architecture.s3Desc', 'To protect confidential medical documents in ZyDocCare Health, public assets are served via public CDN, while medical records and prescriptions are strictly stored in a private encrypted S3 bucket accessible only through expiring presigned URLs.')}
                </p>

                {/* Workflow Diagram Box */}
                <div dir="ltr" className="p-3.5 rounded-xl bg-[#070A12]/70 dark:bg-[#070A12]/70 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 space-y-2 font-mono text-[11px] text-left">
                  <div className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-bold">
                    Pipeline Execution Flow
                  </div>
                  <div className="flex items-center gap-2 text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">1</span>
                    <span>Client requests medical PDF</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">2</span>
                    <span>Node.js validates JWT &amp; patient permissions</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#10B981]">
                    <span className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[10px]">3</span>
                    <span>AWS SDK generates 15-min signed URL</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 dark:border-white/5 light:border-slate-200 text-[11px] font-mono text-[#D4AF37] dark:text-[#D4AF37] light:text-amber-700">
                Applied in ZyDocCare Health
              </div>
            </GlassCard>
          </Reveal>

          {/* Architecture Card 2: Automated CI/CD & Cloud Pipeline */}
          <Reveal delay={0.2}>
            <GlassCard className="p-7 space-y-6 h-full flex flex-col justify-between" glow="cyan">
              <div className="space-y-4 text-start">
                <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-4">
                  <div className="p-3 rounded-2xl bg-[#2496ED]/15 text-[#2496ED] border border-[#2496ED]/30 shadow-sm">
                    <FaDocker size={24} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30 font-bold">
                    Zero-Downtime Deploy
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-white dark:text-white light:text-slate-900">
                  {t('architecture.cicdTitle', 'Automated CI/CD & Cloud Deployment Flow')}
                </h3>

                <p className="text-xs sm:text-sm text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 leading-relaxed font-sans">
                  {t('architecture.cicdDesc', 'Code pushed to GitHub triggers a GitHub Actions pipeline running linting, build checks, and Docker container creation. The runner connects securely to AWS EC2 via SSH, orchestrates multi-service updates via Docker Compose, and reloads Nginx reverse proxy with SSL.')}
                </p>

                {/* Workflow Diagram Box */}
                <div dir="ltr" className="p-3.5 rounded-xl bg-[#070A12]/70 dark:bg-[#070A12]/70 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 space-y-2 font-mono text-[11px] text-left">
                  <div className="text-[10px] text-[#22D3EE] uppercase tracking-wider font-bold">
                    Pipeline Execution Flow
                  </div>
                  <div className="flex items-center gap-2 text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">1</span>
                    <span>Git push to main branch</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">2</span>
                    <span>GitHub Actions builds &amp; tags Docker image</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#22D3EE]">
                    <span className="w-5 h-5 rounded-full bg-[#22D3EE]/20 flex items-center justify-center text-[10px]">3</span>
                    <span>SSH deploy to EC2 + Docker Compose &amp; Nginx</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 dark:border-white/5 light:border-slate-200 text-[11px] font-mono text-[#22D3EE] dark:text-[#22D3EE] light:text-sky-700">
                Applied in ZyDocCare Health
              </div>
            </GlassCard>
          </Reveal>

          {/* Architecture Card 3: Real-Time WebRTC & Socket.IO Mesh */}
          <Reveal delay={0.3}>
            <GlassCard className="p-7 space-y-6 h-full flex flex-col justify-between" glow="gold">
              <div className="space-y-4 text-start">
                <div className="flex items-center justify-between border-b border-white/10 dark:border-white/10 light:border-slate-200 pb-4">
                  <div className="p-3 rounded-2xl bg-[#339933]/15 text-[#339933] border border-[#339933]/30 shadow-sm">
                    <SiWebrtc size={24} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FF3D8B]/10 text-[#FF3D8B] border border-[#FF3D8B]/30 font-bold">
                    Low-Latency Media
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-white dark:text-white light:text-slate-900">
                  {t('architecture.webrtcTitle', 'Real-Time Signaling & WebRTC P2P Video Mesh')}
                </h3>

                <p className="text-xs sm:text-sm text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600 leading-relaxed font-sans">
                  {t('architecture.webrtcDesc', 'LinguaChat and ZyDocCare leverage Socket.IO WebSocket signaling to exchange SDP session offers, answers, and ICE candidates. Once completed, audio and video streams travel peer-to-peer with sub-200ms latency.')}
                </p>

                {/* Workflow Diagram Box */}
                <div dir="ltr" className="p-3.5 rounded-xl bg-[#070A12]/70 dark:bg-[#070A12]/70 light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 space-y-2 font-mono text-[11px] text-left">
                  <div className="text-[10px] text-[#FF3D8B] uppercase tracking-wider font-bold">
                    Signaling &amp; Media Flow
                  </div>
                  <div className="flex items-center gap-2 text-[#F4F6FB] dark:text-[#F4F6FB] light:text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">1</span>
                    <span>Socket.IO room join &amp; caller offer</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#9AA4BC] dark:text-[#9AA4BC] light:text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">2</span>
                    <span>STUN/TURN ICE network candidate exchange</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#FF3D8B]">
                    <span className="w-5 h-5 rounded-full bg-[#FF3D8B]/20 flex items-center justify-center text-[10px]">3</span>
                    <span>Direct encrypted P2P audio/video stream</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 dark:border-white/5 light:border-slate-200 text-[11px] font-mono text-[#FF3D8B]">
                Applied in LinguaChat &amp; ZyDocCare
              </div>
            </GlassCard>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

