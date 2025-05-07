import React, { useEffect, useRef } from 'react';
import SectionTitle from './shared/SectionTitle';
import { Code, BrainCircuit, Terminal, Database, Layout, Server } from 'lucide-react';

const About: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

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

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  const stats = [
    { icon: <Code size={24} />, value: '3+', label: 'Years Experience' },
    { icon: <BrainCircuit size={24} />, value: '5+', label: 'AI Projects' },
    { icon: <Terminal size={24} />, value: '20+', label: 'Applications Built' },
    { icon: <Database size={24} />, value: '10+', label: 'Databases Managed' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>About Me</SectionTitle>
        
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12 opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm an accomplished AI Engineer with extensive experience in developing cutting-edge AI solutions and robust full-stack applications. My expertise spans creating intelligent AI agents, building and fine-tuning machine learning models, and developing comprehensive web applications from frontend to backend.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              With a strong foundation in Angular and modern web technologies, I specialize in creating seamless, user-friendly interfaces backed by powerful, scalable backend systems. My passion lies in bridging the gap between theoretical AI concepts and practical, real-world applications that solve complex problems.
            </p>
            <p className="text-lg text-gray-400">
              When I'm not coding or training models, you'll find me exploring emerging technologies, contributing to open-source projects, and mentoring aspiring developers in the AI and software engineering space.
            </p>
            
            <div className="pt-4">
              <a 
                href="#contact" 
                className="text-purple-400 font-medium hover:text-purple-300 transition-colors flex items-center gap-2"
              >
                <span>Let's work together</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative h-full bg-gray-800 rounded-lg p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                    Areas of Expertise
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <BrainCircuit size={20} className="text-purple-500" />
                      <span>AI Agent Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Layout size={20} className="text-blue-500" />
                      <span>Frontend Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Code size={20} className="text-emerald-500" />
                      <span>Model Building</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Server size={20} className="text-yellow-500" />
                      <span>Backend Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Database size={20} className="text-red-500" />
                      <span>Database Architecture</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Terminal size={20} className="text-cyan-500" />
                      <span>Deployment (Azure)</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 mb-3 text-purple-500">
                        {stat.icon}
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;