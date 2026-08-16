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
    <div className={`flex flex-col md:flex-row items-center mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>

      <div className={`w-full md:w-1/2 mb-6 md:mb-0 flex ${isEven ? 'justify-start md:pr-12' : 'justify-end md:pl-12'}`}>
        <div
          className="relative p-6 w-full transition-all duration-300 hover-iris bg-white/70 dark:bg-midnight/80"
          style={{ border: '1px solid rgba(201,169,110,0.25)', borderRadius: 2 }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t border-l" style={{ borderColor: 'var(--gold)' }} />
          <div className="absolute top-0 right-0 w-5 h-5 border-t border-r" style={{ borderColor: 'var(--gold)' }} />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l" style={{ borderColor: 'var(--gold)' }} />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r" style={{ borderColor: 'var(--gold)' }} />

          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <img
              src={experience.companyLogo}
              alt={experience.company}
              className="w-9 h-9 rounded-sm object-contain bg-white p-1 flex-shrink-0"
              style={{ border: '1px solid rgba(201,169,110,0.2)' }}
            />
            <div className="flex-1 min-w-0">
              <h3
                className="text-xl font-semibold text-gray-900 dark:text-linen leading-tight"
                style={{ fontFamily: '"Cormorant Garant", serif' }}
              >
                {experience.role}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm text-gray-500 dark:text-gray-400">{experience.company}</span>
                {experience.companyUrl && (
                  <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--iris)' }} className="hover:opacity-70 transition-opacity">
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Date */}
          <p
            className="mb-4 text-gray-400 dark:text-gray-500"
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.08em' }}
          >
            {experience.startDate} — {experience.endDate}
          </p>

          {/* Responsibilities */}
          <ul className="space-y-2 mb-4">
            {experience.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                {r}
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: '1px solid rgba(201,169,110,0.15)' }}>
            {experience.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-gray-500 dark:text-gray-400"
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, padding: '2px 8px', border: '1px solid rgba(201,169,110,0.25)', borderRadius: 1 }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Diamond node */}
      <div className="flex items-center justify-center z-10 flex-shrink-0 w-8">
        <div
          className="w-3 h-3 rotate-45"
          style={{ background: 'var(--iris)', border: '1.5px solid var(--gold)' }}
        />
      </div>

      <div className="hidden md:block w-full md:w-1/2" />
    </div>
  );
};

export default TimelineItem;
