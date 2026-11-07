import { useEffect, useRef, useState, useMemo } from 'react';
import { FaReact, FaNodeJs, FaDocker, FaAws } from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiWebrtc,
  SiExpress,
  SiNginx,
  SiPostman,
  SiSupabase,
  SiMongodb,
  SiPostgresql
} from 'react-icons/si';

// Original 10 tools for Desktop (doubled to 20 for rich dense orbital cloud)
const desktopTools = [
  { name: 'React.js', icon: <FaReact />, color: '#61DAFB' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#10B981' },
  { name: 'Express.js', icon: <SiExpress />, color: '#F4F6FB' },
  { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
  { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
  { name: 'Nginx', icon: <SiNginx />, color: '#009639' },
  { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
  { name: 'Supabase', icon: <SiSupabase />, color: '#3ECF8E' },
  { name: 'MongoDB Atlas', icon: <SiMongodb />, color: '#47A248' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
];

// Optimized 12 unique tools for Mobile (zero duplicates, clean 3D orbit, smooth 60fps)
const mobileTools = [
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#FFFFFF' },
  { name: 'React.js', icon: <FaReact />, color: '#61DAFB' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#10B981' },
  { name: 'Express.js', icon: <SiExpress />, color: '#F4F6FB' },
  { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
  { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
  { name: 'Tailwind', icon: <SiTailwindcss />, color: '#38BDF8' },
  { name: 'WebRTC', icon: <SiWebrtc />, color: '#326CE5' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
  { name: 'Supabase', icon: <SiSupabase />, color: '#3ECF8E' },
];

export default function TechGlobe({ children }) {
  const containerRef = useRef(null);
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(0.18);
  const rotRef = useRef({ y: 0, x: 0.18, speedY: 0.006, speedX: 0 });
  const mouseRef = useRef({ isDown: false, lastX: 0, lastY: 0, isHover: false });
  const animFrameRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive radii for the celestial sphere surrounding the center name
  const [radii, setRadii] = useState({
    radiusX: 350,
    radiusY: 220,
    radiusZ: 290,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 640;
      setIsMobile(mobile);
      if (mobile) {
        // Mobile screens: compact radius to keep name readable
        setRadii({
          radiusX: Math.min(185, w * 0.44),
          radiusY: Math.min(150, h * 0.22),
          radiusZ: 175,
        });
      } else if (w < 1024) {
        // Tablet screens
        setRadii({
          radiusX: Math.min(290, w * 0.38),
          radiusY: Math.min(195, h * 0.26),
          radiusZ: 240,
        });
      } else {
        // Large screens
        setRadii({
          radiusX: Math.min(380, w * 0.36),
          radiusY: Math.min(235, h * 0.29),
          radiusZ: 310,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { radiusX, radiusY, radiusZ } = radii;

  // 3D Fibonacci sphere coordinate mapping
  // Desktop: 20 items (original dense cloud) | Mobile: 12 unique items (no duplicates)
  const items = useMemo(() => {
    const list = isMobile ? mobileTools : [...desktopTools, ...desktopTools];
    const total = list.length;
    return list.map((tool, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
      const theta = Math.PI * (1 + 5 ** 0.5) * i;
      return {
        ...tool,
        baseX: radiusX * Math.sin(phi) * Math.cos(theta),
        baseY: radiusY * Math.cos(phi),
        baseZ: radiusZ * Math.sin(phi) * Math.sin(theta),
      };
    });
  }, [radiusX, radiusY, radiusZ, isMobile]);

  // Smooth continuous 3D rotation loop
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;
      const state = rotRef.current;
      const mouse = mouseRef.current;

      if (!mouse.isDown) {
        state.y += state.speedY;
        state.speedY = state.speedY * 0.98 + (mouse.isHover ? 0.003 : 0.006) * 0.02;
        state.speedX *= 0.95;
        state.x += state.speedX;
        state.x = Math.max(-0.55, Math.min(0.55, state.x));
      }

      setRotY(state.y);
      setRotX(state.x);
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Global pointer drag listeners so dragging ANYWHERE on the screen rotates the globe
  useEffect(() => {
    let isDown = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e) => {
      if (e.target.closest('button')) return;
      isDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
      mouseRef.current.isDown = true;
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      rotRef.current.speedY = dx * 0.0035;
      rotRef.current.speedX = dy * 0.0035;
      rotRef.current.y += dx * 0.006;
      rotRef.current.x = Math.max(-0.55, Math.min(0.55, rotRef.current.x - dy * 0.006));
    };

    const onPointerUp = () => {
      if (!isDown) return;
      isDown = false;
      mouseRef.current.isDown = false;
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  // 3D rotation projection
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);

  const backItems = [];
  const frontItems = [];

  items.forEach((item, idx) => {
    // 1. Rotate around Y axis
    const x1 = item.baseX * cosY + item.baseZ * sinY;
    const z1 = -item.baseX * sinY + item.baseZ * cosY;

    // 2. Rotate around X axis (tilt)
    const y2 = item.baseY * cosX - z1 * sinX;
    const z2 = item.baseY * sinX + z1 * cosX;
    const x2 = x1;

    // 3. Perspective projection
    const depthRatio = Math.max(-1, Math.min(1, z2 / radiusZ)); // -1 (back) to +1 (front)
    const scale = 0.94 + depthRatio * 0.28;
    const screenX = x2 * (1 + depthRatio * 0.12);
    const screenY = y2 * (1 + depthRatio * 0.12);

    const isFront = z2 > 0;
    const opacity = isFront
      ? Math.min(1, 0.85 + depthRatio * 0.15)
      : Math.max(0.2, 0.35 + (1 + depthRatio) * 0.25);

    const zIndex = isFront
      ? Math.round(20 + depthRatio * 15) // In front of children (z: 15)
      : Math.round(5 + (1 + depthRatio) * 7); // Behind children (z: 15)

    const blur = isFront ? 0 : Math.max(0, -depthRatio * 2.2);

    const node = {
      ...item,
      key: `${item.name}-${idx}`,
      screenX,
      screenY,
      scale,
      opacity,
      zIndex,
      blur,
      isFront,
    };

    if (isFront) {
      frontItems.push(node);
    } else {
      backItems.push(node);
    }
  });

  return (
    <div
      ref={containerRef}
      dir="ltr"
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="relative flex items-center justify-center select-none mx-auto cursor-grab active:cursor-grabbing"
      style={{
        width: `${radiusX * 2}px`,
        maxWidth: '100%',
        height: `${radiusY * 2.1}px`,
      }}
      onMouseEnter={() => { mouseRef.current.isHover = true; }}
      onMouseLeave={() => {
        mouseRef.current.isHover = false;
        mouseRef.current.isDown = false;
      }}
    >
      {/* 3D Atmospheric Core Glow (Behind center) */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          width: `${radiusX * 1.6}px`,
          height: `${radiusY * 1.6}px`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.09) 0%, rgba(34,211,238,0.05) 45%, transparent 75%)',
          filter: 'blur(45px)',
          zIndex: 1,
        }}
      />

      {/* 3D Wireframe / Celestial Orbital Rings (Passing through) */}
      <div
        className="absolute rounded-full border border-dashed border-[#D4AF37]/15 pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          width: `${radiusX * 1.95}px`,
          height: `${radiusY * 1.95}px`,
          transform: `translate(-50%, -50%) rotateX(${68 + rotX * 15}deg) rotateZ(${rotY * 12}deg)`,
          zIndex: 2,
        }}
      />
      <div
        className="absolute rounded-full border border-dotted border-[#22D3EE]/15 pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          width: `${radiusX * 1.8}px`,
          height: `${radiusY * 1.8}px`,
          transform: `translate(-50%, -50%) rotateY(${72 + rotX * 12}deg) rotateX(${rotY * 10}deg)`,
          zIndex: 2,
        }}
      />

      {/* LAYER 1: BACK ITEMS (Rotating BEHIND the name) */}
      {backItems.map((tool) => (
        <div
          key={tool.key}
          className={`absolute flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full pointer-events-none ${isMobile ? 'backdrop-blur-none' : 'backdrop-blur-sm'}`}
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate3d(${tool.screenX}px, ${tool.screenY}px, 0px) scale(${tool.scale})`,
            opacity: tool.opacity,
            zIndex: tool.zIndex,
            filter: isMobile ? undefined : (tool.blur > 0.4 ? `blur(${tool.blur}px)` : undefined),
            backgroundColor: isMobile ? 'rgba(11, 15, 28, 0.7)' : 'rgba(11, 15, 28, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            willChange: 'transform, opacity',
          }}
        >
          <span className="text-xs flex items-center justify-center shrink-0" style={{ color: tool.color }}>
            {tool.icon}
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-tight whitespace-nowrap text-[#9AA4BC]">
            {tool.name}
          </span>
        </div>
      ))}

      {/* LAYER 2: CENTER HERO CONTENT (The Name, Subtitle, Press Start - Exactly in the Center) */}
      <div className="relative z-[15] pointer-events-auto flex flex-col items-center justify-center">
        {children}
      </div>

      {/* LAYER 3: FRONT ITEMS (Rotating IN FRONT OF and OVER the name) */}
      {frontItems.map((tool) => (
        <div
          key={tool.key}
          className={`absolute flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full pointer-events-none ${
            isMobile
              ? 'backdrop-blur-none shadow-[0_4px_18px_rgba(0,0,0,0.5),0_0_12px_rgba(212,175,55,0.2)]'
              : 'backdrop-blur-md shadow-[0_4px_22px_rgba(0,0,0,0.6),0_0_15px_rgba(212,175,55,0.22)]'
          }`}
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate3d(${tool.screenX}px, ${tool.screenY}px, 0px) scale(${tool.scale})`,
            opacity: tool.opacity,
            zIndex: tool.zIndex,
            backgroundColor: isMobile ? 'rgba(14, 19, 32, 0.95)' : 'rgba(14, 19, 32, 0.88)',
            border: '1px solid rgba(212, 175, 55, 0.45)',
            willChange: 'transform, opacity',
          }}
        >
          <span className="text-xs sm:text-sm flex items-center justify-center shrink-0" style={{ color: tool.color }}>
            {tool.icon}
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-tight whitespace-nowrap text-[#F4F6FB]">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
}
