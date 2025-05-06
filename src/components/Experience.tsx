import React, { useEffect, useRef } from 'react';
import SectionTitle from './shared/SectionTitle';
import TimelineItem from './shared/TimelineItem';
import { experienceData } from '../data/experience';

const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

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

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Work Experience</SectionTitle>
        
        <div 
          ref={timelineRef}
          className="mt-12 relative opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gray-800 z-0"></div>
          
          {/* Timeline items */}
          <div className="relative z-10">
            {experienceData.map((experience, index) => (
              <TimelineItem 
                key={index} 
                experience={experience} 
                index={index} 
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-purple-500 text-purple-500 font-medium hover:bg-purple-500/10 transition-all"
          >
            <span>Download Full Resume</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;