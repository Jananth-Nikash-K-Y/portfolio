import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Lock, Unlock } from 'lucide-react';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
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
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      {/* Hero Content */}
      <div
        ref={textRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-center gap-12 opacity-0"
      >
        {/* Profile Picture */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 flex-shrink-0 flex items-center justify-center mx-auto lg:mx-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-full blur opacity-75 animate-pulse"></div>
          <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl">
            <img
              src="/assets/profile.jpg"
              alt="Jananth Nikash"
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
            I'm Jananth
          </h2>
          <div className="inline-block mb-4 px-6 py-2 border border-purple-500 rounded-full text-purple-500 text-sm font-medium tracking-wide">
            AI ENGINEER
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500">
              Building the Future
            </span>
            <br />
            with AI & Engineering
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-8">
            Specializing in AI agents, model development, and full-stack solutions that bridge innovation with practical applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <button
              onClick={handleUnlockClick}
              className={`relative flex items-center gap-2 px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden ${shimmer ? 'animate-shimmer' : ''}`}
              style={{ minWidth: 220 }}
            >
              <span className="flex items-center">
                {unlocked ? (
                  <Unlock size={20} className="mr-2 transition-transform duration-300 rotate-12" />
                ) : (
                  <Lock size={20} className="mr-2 transition-transform duration-300" />
                )}
                Unlock My Projects
              </span>
              {shimmer && (
                <span className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-80 animate-shimmer-effect" />
              )}
            </button>
            <a
              href="#contact"
              className="px-8 py-3 rounded-md bg-gray-800 text-white font-medium transition-transform hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Tech floating elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-purple-900/30 backdrop-blur-xl animate-float"></div>
      <div className="absolute top-2/3 right-20 w-24 h-24 rounded-full bg-blue-900/20 backdrop-blur-xl animate-float-delayed"></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-emerald-900/20 backdrop-blur-xl animate-float-slow"></div>
    </section>
  );
};

export default Hero;
