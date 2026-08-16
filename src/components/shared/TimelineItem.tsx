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
          className="relative p-6 w-full transition-all duration-300 hover-iris"
          style={{
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: 2,
          }}
        >
          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l" style={{ borderColor: 'var(--gold)' }} />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r" style={{ borderColor: 'var(--gold)' }} />

          {/* Dark override */}
          <style>{`.dark .tl-card-${index}{background:rgba(26,26,46,0.8)!important}`}</style>

          <div className={`tl-card-${index}`} />

          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <img
              src={experience.companyLogo}
              alt={experience.company}
              className="w-9 h-9 rounded object-contain bg-white p-1 flex-shrink-0"
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
                    className="text-iris hover:text-iris/70 transition-colors">
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Date badge */}
          <p
            className="mb-4 text-gray-400"
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.08em' }}
          >
            {experience.startDate} — {experience.endDate}
          </p>

          <ul className="space-y-2 mb-4">
            {experience.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--gold)' }} />
                {r}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-gray-500 dark:text-gray-400"
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, padding: '2px 7px', border: '1px solid rgba(201,169,110,0.25)', borderRadius: 1 }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline node */}
      <div className="flex items-center justify-center z-10 flex-shrink-0">
        <div
          className="w-4 h-4 rotate-45 border-2"
          style={{ background: 'var(--iris)', borderColor: 'var(--gold)' }}
        />
      </div>

      <div className="w-full md:w-1/2" />
    </div>
  );
};

export default TimelineItem;
