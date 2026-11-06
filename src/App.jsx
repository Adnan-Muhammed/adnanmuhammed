import { useState, useEffect, lazy, Suspense } from 'react';
import { LanguageProvider } from './i18n';
import { ThemeProvider } from './context';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Architecture from './components/Architecture';
import CVSection from './components/CVSection';
import Terminal from './components/Terminal';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Lazy-loaded Intro Gate
const IntroGate = lazy(() => import('./components/intro/IntroGate'));

function AppContent() {
  const [introComplete, setIntroComplete] = useState(false);

  // Prevent infinite iframe recursion loop (if an asset fails and Vite falls back to index.html inside an iframe)
  const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top;
  if (isInsideIframe) {
    return null;
  }

  const handleComplete = () => {
    setIntroComplete(true);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    if (introComplete && typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [introComplete]);

  return (
    <div className="relative min-h-screen bg-[#070A12] dark:bg-[#070A12] light:bg-[#F8FAFC] text-[#F4F6FB] dark:text-[#F4F6FB] light:text-[#0F172A] selection:bg-[#D4AF37] selection:text-[#070A12] font-sans transition-colors duration-300">
      {/* Cinematic Intro Experience (BootLoader -> TitleScreen -> Warp directly to Portfolio) */}
      {!introComplete && (
        <Suspense fallback={null}>
          <IntroGate onComplete={handleComplete} />
        </Suspense>
      )}

      {/* Main Portfolio Suite */}
      {introComplete && (
        <>
          <Navbar />

          <main id="main-content" tabIndex="-1" className="focus:outline-none">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Architecture />
            <CVSection />
            <Terminal />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}
