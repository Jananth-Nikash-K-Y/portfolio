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
  ];

  const filteredProjects = category === 'all'
    ? projectsData
    : projectsData.filter(project => project.category === category);

  return (
    <section id="projects" className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Featured Projects</SectionTitle>
        
        <div className="flex justify-center mt-8 mb-12 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  category === cat.id
                    ? 'bg-purple-600 text-white font-medium'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
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