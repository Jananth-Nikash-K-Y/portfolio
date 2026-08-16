import React from 'react';

interface JKLogoProps {
  size?: number;
}

// Colours extracted directly from the Three.js medallion source:
// coin body: #a9814a, engraving ring: #5f4526, JK letterform: #dcb970
const JKLogo: React.FC<JKLogoProps> = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="JK monogram"
    style={{ display: 'block', flexShrink: 0 }}
  >
    <defs>
      <radialGradient id="jkBody" cx="42%" cy="38%" r="62%">
        <stop offset="0%" stopColor="#c49458"/>
        <stop offset="55%" stopColor="#a9814a"/>
        <stop offset="100%" stopColor="#7a5a2e"/>
      </radialGradient>
      <radialGradient id="jkLetter" cx="40%" cy="35%" r="58%">
        <stop offset="0%" stopColor="#f0d080"/>
        <stop offset="45%" stopColor="#dcb970"/>
        <stop offset="100%" stopColor="#b08940"/>
      </radialGradient>
    </defs>

    {/* Outer ring — dark walnut */}
    <circle cx="100" cy="100" r="97" fill="#3e2a12"/>

    {/* Coin body */}
    <circle cx="100" cy="100" r="90" fill="url(#jkBody)"/>

    {/* Groove rings */}
    <circle cx="100" cy="100" r="85" fill="none" stroke="#5f4526" strokeWidth="2"/>
    <circle cx="100" cy="100" r="78" fill="none" stroke="#5f4526" strokeWidth="1"/>

    {/* JK letterform */}
    {/* J — stem */}
    <rect x="46" y="44" width="14" height="74" rx="2" fill="url(#jkLetter)"/>
    {/* J — curve bottom-left */}
    <path
      d="M 46 118 Q 46 148 66 148 Q 86 148 86 128 L 86 118"
      fill="none"
      stroke="url(#jkLetter)"
      strokeWidth="14"
      strokeLinecap="round"
    />

    {/* K — stem */}
    <rect x="94" y="44" width="14" height="112" rx="2" fill="url(#jkLetter)"/>
    {/* K — upper arm */}
    <line x1="108" y1="88" x2="148" y2="44"
      stroke="url(#jkLetter)" strokeWidth="14" strokeLinecap="round"/>
    {/* K — lower arm */}
    <line x1="108" y1="104" x2="150" y2="152"
      stroke="url(#jkLetter)" strokeWidth="14" strokeLinecap="round"/>
    {/* K — joint fill */}
    <polygon points="94,96 108,88 108,104" fill="url(#jkLetter)"/>
  </svg>
);

export default JKLogo;
