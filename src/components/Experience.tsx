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
    <section id="experience" className="py-24 bg-linen/60 dark:bg-midnight/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="04 — Career">Work Experience</SectionTitle>
        
        <div 
          ref={timelineRef}
          className="mt-12 relative opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-px h-full z-0"></div>
          
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
            href="assets/Jananth Nikash K Y.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium tracking-wide transition-all hover:bg-gold/5"
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