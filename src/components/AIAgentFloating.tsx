import React, { useState } from 'react';
import AIAgent from './AIAgent';

const AIAgentFloating: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2.5vw',
        right: '2.5vw',
        zIndex: 9999,
        width: 'min(32vw, 180px)',
        height: 'min(32vw, 180px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'column',
      }}
      aria-label="AI Assistant"
    >
      <div
        style={{ cursor: 'pointer', width: '100%', height: '100%' }}
        onClick={() => setOpen((v) => !v)}
        title="Chat with AI Assistant"
      >
        <AIAgent />
      </div>
    </div>
  );
};

export default AIAgentFloating; 