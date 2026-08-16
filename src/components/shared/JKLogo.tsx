import React from 'react';

interface JKLogoProps {
  size?: number;
}

const JKLogo: React.FC<JKLogoProps> = ({ size = 38 }) => (
  <iframe
    src="/assets/jk-logo.html"
    title="JK monogram logo"
    scrolling="no"
    style={{
      width: size,
      height: size,
      border: 'none',
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'block',
      flexShrink: 0,
      background: 'transparent',
      pointerEvents: 'none',
    }}
  />
);

export default JKLogo;
