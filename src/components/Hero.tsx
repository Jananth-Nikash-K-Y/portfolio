import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      <div
        ref={textRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center opacity-0 transform translate-y-10 transition-all duration-1000"
      >
        <div className="inline-block mb-4 px-6 py-2 border border-purple-500 rounded-full text-purple-500 text-sm font-medium tracking-wide">
          FULL STACK & AI ENGINEER
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
          <a
            href="#projects"
            className="px-8 py-3 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-md bg-gray-800 text-white font-medium transition-transform hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Contact Me
          </a>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
          <ArrowDown size={20} className="text-purple-500" />
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