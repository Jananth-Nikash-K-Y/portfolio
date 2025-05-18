import React, { useState } from 'react';
import AIAgent from './AIAgent';

// Placeholder for the chat window
function ChatWindow({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '110%',
        right: 0,
        width: 320,
        maxWidth: '80vw',
        background: 'rgba(24, 24, 32, 0.98)',
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        padding: 16,
        zIndex: 10000,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600 }}>AI Assistant</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>&times;</button>
      </div>
      <div style={{ minHeight: 80, fontSize: 14, opacity: 0.7 }}>
        Hi! How can I help you today?
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        style={{
          padding: 8,
          borderRadius: 8,
          border: '1px solid #333',
          background: '#181820',
          color: '#fff',
          outline: 'none',
        }}
        disabled
      />
      <button
        style={{
          marginTop: 4,
          padding: '8px 0',
          borderRadius: 8,
          background: 'linear-gradient(90deg, #7c3aed, #2563eb, #10b981)',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          cursor: 'not-allowed',
        }}
        disabled
      >
        Send
      </button>
    </div>
  );
}

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
      {open && <ChatWindow onClose={() => setOpen(false)} />}
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