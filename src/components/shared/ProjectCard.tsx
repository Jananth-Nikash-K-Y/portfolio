import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getDelay = () => {
    return `${(index % 3) * 150}ms`;
  };

  return (
    <div 
      className="group relative rounded-lg overflow-hidden bg-gray-800 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/10"
      style={{ animationDelay: getDelay() }}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent transition-opacity duration-300 ${showDetails ? 'opacity-90' : 'opacity-50'}`}></div>
        
        {/* Floating category tag */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs font-medium">
          {project.categoryName}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="mb-5 flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              View Project
              <ExternalLink size={14} />
            </a>
          ) : (
            <span className="text-sm font-medium text-gray-500">Project Demo Not Available</span>
          )}
          
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;