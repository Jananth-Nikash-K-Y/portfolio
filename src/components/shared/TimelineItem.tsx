import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Experience } from '../../types';

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ experience, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col md:flex-row items-center mb-12 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Left column (or right on mobile) */}
      <div className={`w-full md:w-1/2 mb-6 md:mb-0 ${isEven ? 'md:pl-12' : 'md:pr-12'} ${isEven ? 'md:text-left' : 'md:text-right'}`}>
        <div
          className={`p-6 rounded-lg bg-gray-800 hover:bg-gray-800/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10`}
        >
          <div className="flex items-center gap-2 mb-4">
            <img
              src={experience.companyLogo}
              alt={experience.company}
              className="w-10 h-10 rounded-md object-contain bg-white p-1"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{experience.role}</h3>
              <div className="flex items-center gap-1 text-gray-400">
                <span>{experience.company}</span>
                {experience.companyUrl && (
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300"
                    aria-label={`Visit ${experience.company} website`}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4 text-gray-400 text-sm">
            {experience.startDate} - {experience.endDate}
          </div>
          
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {experience.responsibilities.map((responsibility, rIndex) => (
              <li key={rIndex}>{responsibility}</li>
            ))}
          </ul>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {experience.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Timeline center */}
      <div className="md:hidden absolute left-0 w-1 h-full bg-gray-800"></div>
      <div className="flex items-center justify-center z-10">
        <div className="w-6 h-6 rounded-full bg-purple-600 border-4 border-gray-900"></div>
      </div>
      
      {/* Right column (or left on mobile) - Empty for content balance */}
      <div className="w-full md:w-1/2"></div>
    </div>
  );
};

export default TimelineItem;