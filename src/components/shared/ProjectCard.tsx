import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const delay = `${(index % 3) * 120}ms`;

  return (
    <div
      className="group relative flex flex-col overflow-hidden transition-all duration-300 hover-iris"
      style={{
        animationDelay: delay,
        background: hovered
          ? 'rgba(123,94,167,0.04)'
          : 'rgba(255,255,255,0.6)',
        border: '1px solid rgba(201,169,110,0.2)',
        borderRadius: 2,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thin gold top edge on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{ background: 'var(--gold)', opacity: hovered ? 1 : 0 }}
      />

      {/* Image */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className={`absolute inset-0 transition-opacity duration-300 ${hovered ? 'opacity-60' : 'opacity-30'}`}
          style={{ background: 'linear-gradient(to top, #0D0D12, transparent)' }} />

        {/* Category tag */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 text-white"
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.1em', background: 'var(--iris)', borderRadius: 1 }}
        >
          {project.categoryName}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="text-xl font-semibold mb-2 text-gray-900 dark:text-linen transition-colors group-hover:text-iris"
          style={{ fontFamily: '"Cormorant Garant", serif' }}
        >
          {project.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="text-gray-600 dark:text-gray-400"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.06em', padding: '2px 7px', border: '1px solid rgba(201,169,110,0.25)', borderRadius: 1 }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(201,169,110,0.15)' }}>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium tracking-wide transition-colors"
              style={{ color: 'var(--gold)', fontFamily: '"JetBrains Mono", monospace' }}
            >
              View Project <ExternalLink size={12} />
            </a>
          ) : (
            <span className="text-xs text-gray-400" style={{ fontFamily: '"JetBrains Mono", monospace' }}>No demo available</span>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 transition-colors text-gray-500 dark:text-gray-400 hover:text-iris dark:hover:text-iris"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
