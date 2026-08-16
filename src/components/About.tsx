import React, { useEffect, useRef } from 'react';
import SectionTitle from './shared/SectionTitle';
import { Code, BrainCircuit, Terminal, Database, Layout, Server } from 'lucide-react';

const About: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('animate-fade-in'); }),
      { threshold: 0.1 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => { if (contentRef.current) observer.unobserve(contentRef.current); };
  }, []);

  const stats = [
    { icon: <Code size={20} />, value: '5+', label: 'Years' },
    { icon: <BrainCircuit size={20} />, value: '15+', label: 'AI Projects' },
    { icon: <Terminal size={20} />, value: '30+', label: 'Apps Built' },
    { icon: <Database size={20} />, value: '15+', label: 'Databases' },
  ];

  const expertise = [
    { icon: <BrainCircuit size={18} />, label: 'AI Agent Development', color: 'var(--iris)' },
    { icon: <Layout size={18} />, label: 'Frontend Development', color: '#3b82f6' },
    { icon: <Code size={18} />, label: 'Model Building', color: '#10b981' },
    { icon: <Server size={18} />, label: 'Backend Development', color: '#f59e0b' },
    { icon: <Database size={18} />, label: 'Database Architecture', color: '#ef4444' },
    { icon: <Terminal size={18} />, label: 'Deployment (Azure)', color: '#06b6d4' },
  ];

  return (
    <section id="about" className="py-24 bg-linen/60 dark:bg-midnight/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="01 — Profile">About Me</SectionTitle>

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-4 opacity-0 transition-all duration-1000"
        >
          {/* Left — bio */}
          <div className="space-y-5">
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm an AI Engineer and Technical Consultant at IBM India, with a track record of building
              enterprise-grade AI systems — from intelligent agents and fine-tuned models to full-stack
              applications that serve real business needs.
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              My work bridges the gap between cutting-edge AI research and practical engineering.
              I specialise in agentic AI, watsonx.ai, LangChain orchestration, and scalable
              backend systems. Before IBM I spent over three years at TCS building AI-driven logistics
              and full-stack platforms.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              Outside of engineering, I explore emerging research, contribute to open-source, and mentor
              developers entering the AI field.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-2 text-sm font-medium tracking-wide transition-colors"
              style={{ color: 'var(--gold)' }}
            >
              Let's collaborate <span>→</span>
            </a>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 pt-6 mt-2 border-t dark:border-gray-800" style={{ borderColor: 'rgba(201,169,110,0.2)' }}>
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-2xl md:text-3xl font-semibold mb-1"
                    style={{ fontFamily: '"Cormorant Garant", serif', color: 'var(--iris)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-mono tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — expertise card */}
          <div className="relative">
            {/* Corner bracket decorations — vintage technical drawing */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l" style={{ borderColor: 'var(--gold)' }} />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r" style={{ borderColor: 'var(--gold)' }} />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l" style={{ borderColor: 'var(--gold)' }} />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r" style={{ borderColor: 'var(--gold)' }} />

            <div className="bg-white/70 dark:bg-midnight/80 backdrop-blur-sm p-8" style={{ border: '1px solid rgba(201,169,110,0.2)' }}>
              <p className="section-eyebrow mb-5">Areas of Expertise</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                {expertise.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <span style={{ color: item.color }} className="flex-shrink-0 transition-transform group-hover:scale-110 duration-200">
                      {item.icon}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
