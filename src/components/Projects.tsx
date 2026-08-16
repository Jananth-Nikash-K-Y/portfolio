import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from './shared/SectionTitle';
import ProjectCard from './shared/ProjectCard';
import { projectsData } from '../data/projects';

const Projects: React.FC = () => {
  const [category, setCategory] = useState('all');
  const projectsRef = useRef<HTMLDivElement>(null);

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

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'ai', name: 'AI & ML' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'personal', name: 'Personal'}
  ];

  const filteredProjects = category === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === category);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="03 — Work">Featured Projects</SectionTitle>
        
        <div className="mt-8 mb-10 w-full overflow-x-auto text-center">
          <div className="inline-flex flex-nowrap gap-3 px-4 py-2 mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-1.5 font-medium whitespace-nowrap transition-all text-xs tracking-widest uppercase
                  ${category === cat.id
                    ? 'text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-iris dark:hover:text-iris'}
                  focus:outline-none`}
                style={category === cat.id
                  ? { background: 'var(--iris)', borderRadius: 1, fontFamily: '"JetBrains Mono", monospace' }
                  : { borderRadius: 1, fontFamily: '"JetBrains Mono", monospace', border: '1px solid rgba(201,169,110,0.2)' }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gray-800 text-white font-medium hover:bg-gray-700 transition-all"
          >
            <span>View All Projects</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;