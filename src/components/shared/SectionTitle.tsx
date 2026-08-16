import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  eyebrow?: string;
  align?: 'left' | 'center';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, eyebrow, align = 'center' }) => {
  const isCenter = align === 'center';
  return (
    <div className={`mb-8 ${isCenter ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <p className="section-eyebrow mb-3">{eyebrow}</p>
      )}
      <h2
        className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-linen leading-tight"
        style={{ fontFamily: '"Cormorant Garant", Georgia, serif' }}
      >
        {children}
      </h2>
      <div className={`mt-3 h-px w-12 bg-gold ${isCenter ? 'mx-auto' : ''}`} style={{ background: 'var(--gold)' }} />
    </div>
  );
};

export default SectionTitle;
