import React, { useEffect, useRef, useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('animate-fade-in'); }),
      { threshold: 0.1 }
    );
    if (textRef.current) observer.observe(textRef.current);
    return () => { if (textRef.current) observer.unobserve(textRef.current); };
  }, []);

  const handleUnlockClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setUnlocked(true);
    setShimmer(true);
    setTimeout(() => {
      setShimmer(false);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setUnlocked(false), 1000);
    }, 900);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

      {/* Ambient orbs — restrained, no rainbow */}
      <div className="absolute top-1/4 left-16 w-64 h-64 rounded-full bg-iris/5 dark:bg-iris/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-16 w-80 h-80 rounded-full bg-gold/5 dark:bg-gold/8 blur-3xl pointer-events-none" />

      {/* Hairline grid overlay — vintage technical drawing feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div
        ref={textRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-center gap-16 opacity-0"
      >
        {/* Profile — octagonal frame for a distinctive non-circular crop */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          <div
            className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80"
            style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}
          >
            {/* Gold border ring */}
            <div
              className="absolute -inset-[3px] animate-pulse-slow"
              style={{
                background: 'linear-gradient(135deg, var(--gold), var(--iris), var(--gold))',
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
              }}
            />
            <div
              className="absolute inset-[3px] overflow-hidden"
              style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}
            >
              <img
                src="/assets/profile.jpg"
                alt="Jananth Nikash"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start max-w-2xl">
          {/* Monospaced eyebrow */}
          <p className="section-eyebrow mb-5">Technical Consultant · AI Integration · IBM</p>

          {/* Display name in Cormorant */}
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] mb-3 text-gray-900 dark:text-linen"
            style={{ fontFamily: '"Cormorant Garant", Georgia, serif' }}
          >
            Jananth Nikash
          </h2>

          {/* Gold rule */}
          <div className="w-12 h-px mb-6 lg:mr-auto" style={{ background: 'var(--gold)' }} />

          {/* Tagline in DM Sans */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mb-10 leading-relaxed font-light">
            Building intelligent systems at the intersection of AI research and enterprise engineering.
            Agents, models, and full-stack solutions that actually ship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary CTA */}
            <button
              onClick={handleUnlockClick}
              className="relative flex items-center justify-center gap-2 px-7 py-3 text-white text-sm font-medium tracking-wide overflow-hidden transition-all hover:shadow-lg hover:shadow-iris/30"
              style={{ background: 'linear-gradient(135deg, var(--iris), #5b3f8a)', borderRadius: 2 }}
            >
              <span className="flex items-center gap-2 z-10">
                {unlocked
                  ? <Unlock size={16} className="transition-transform duration-300 rotate-12" />
                  : <Lock size={16} className="transition-transform duration-300" />}
                Unlock Projects
              </span>
              {shimmer && (
                <span className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-effect" />
              )}
            </button>

            {/* Secondary CTA — gold outline */}
            <a
              href="#contact"
              className="flex items-center justify-center px-7 py-3 text-sm font-medium tracking-wide transition-all hover:bg-gold/10"
              style={{ border: '1px solid var(--gold)', color: 'var(--gold)', borderRadius: 2 }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
