import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <div className="text-center mb-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white relative inline-block">
        {children}
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></span>
      </h2>
    </div>
  );
};

export default SectionTitle;