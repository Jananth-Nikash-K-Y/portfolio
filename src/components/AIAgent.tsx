import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function useResponsive3D() {
  const [settings, setSettings] = useState({
    scale: 1,
    camera: { position: [0, 0.3, 10] as [number, number, number], fov: 40 },
  });

  useEffect(() => {
    function updateSettings() {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile
        setSettings({ scale: 1.4, camera: { position: [0, 0.3, 10] as [number, number, number], fov: 40 } });
      } else if (width < 1024) {
        // Tablet
        setSettings({ scale: 1, camera: { position: [0, 0.3, 8] as [number, number, number], fov: 40 } });
      } else {
        // Desktop
        setSettings({ scale: 1, camera: { position: [0, 0.3, 6] as [number, number, number], fov: 40 } });
      }
    }
    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  return settings;
}

function RobotModel({ scale, progress }: { scale: number, progress: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/robot.glb');

  // Clone the whole scene to avoid modifying the original
  const sceneClone = useMemo(() => scene.clone(true), [scene]);

  // Center the cloned scene
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(sceneClone);
    const center = box.getCenter(new THREE.Vector3());
    sceneClone.position.x -= center.x;
    sceneClone.position.y -= center.y;
    sceneClone.position.z -= center.z;
  }, [sceneClone]);

  // Idle animation: gentle up/down floating and slow head rotation
  useFrame(({ clock }) => {
    if (group.current && progress === 1) {
      group.current.position.y = Math.sin(clock.getElapsedTime()) * 0.08;
      group.current.rotation.y = Math.sin(clock.getElapsedTime() / 2) * 0.2;
    }
  });

  // Scale up with progress
  useEffect(() => {
    if (group.current) {
      group.current.scale.setScalar(Math.max(0, scale * progress));
    }
  }, [progress, scale]);

  return (
    <group ref={group}>
      <primitive object={sceneClone} />
    </group>
  );
}

// Chat window UI
function ChatWindow({
  step,
  name,
  onNameSubmit,
  onExploreChoice,
  messages,
  onSend,
  loading,
  visible,
}: {
  step: number;
  name: string;
  onNameSubmit: (msg: string) => void;
  onExploreChoice: (choice: 'manual' | 'agent') => void;
  messages: { from: 'user' | 'agent'; text: string }[];
  onSend: (msg: string) => void;
  loading: boolean;
  visible: boolean;
}) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!visible) return null;

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
        gap: 10,
        fontSize: 15,
        minHeight: 120,
      }}
    >
      {step === 0 && (
        <>
          <div style={{ marginBottom: 8 }}>Hi! What's your name?</div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (input.trim()) onNameSubmit(input.trim());
            }}
            style={{ display: 'flex', gap: 8 }}
          >
            <input
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Enter your name..."
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 8,
                border: '1px solid #333',
                background: '#181820',
                color: '#fff',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'linear-gradient(90deg, #7c3aed, #2563eb, #10b981)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              OK
            </button>
          </form>
        </>
      )}
      {step === 1 && (
        <>
          <div style={{ marginBottom: 8 }}>Nice to meet you, <b>{name}</b>! 👋</div>
          <div style={{ marginBottom: 8 }}>
            Would you like to explore the portfolio manually, or would you like my help to guide you through the highlights?
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onExploreChoice('manual')}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 8,
                background: '#23234a',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Explore Manually
            </button>
            <button
              onClick={() => onExploreChoice('agent')}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 8,
                background: 'linear-gradient(90deg, #7c3aed, #2563eb, #10b981)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Guide Me
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div style={{ marginBottom: 8 }}>
            {name && (
              <>
                {`Alright, ${name}! Feel free to explore the portfolio on your own. If you need my help, just click the agent again!`}
              </>
            )}
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div style={{ marginBottom: 8 }}>
            {name && (
              <>
                {`Awesome, ${name}! I'm here to answer any questions about Jananth's portfolio. Ask away!`}
              </>
            )}
          </div>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: 8 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  margin: '6px 0',
                  alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.from === 'user' ? '#23234a' : 'linear-gradient(90deg, #7c3aed, #2563eb, #10b981)',
                  color: msg.from === 'user' ? '#fff' : '#fff',
                  borderRadius: 12,
                  padding: '7px 14px',
                  maxWidth: '85%',
                  fontWeight: msg.from === 'user' ? 500 : 600,
                  fontSize: 15,
                  boxShadow: msg.from === 'user' ? 'none' : '0 2px 12px #0002',
                }}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (input.trim() && !loading) {
                onSend(input.trim());
                setInput('');
              }
            }}
            style={{ display: 'flex', gap: 8 }}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 8,
                border: '1px solid #333',
                background: '#181820',
                color: '#fff',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'linear-gradient(90deg, #7c3aed, #2563eb, #10b981)',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
              disabled={loading}
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function AIAgent() {
  const { scale, camera } = useResponsive3D();
  const [progress, setProgress] = useState(0); // 0 to 1
  const [step, setStep] = useState(0); // 0: ask name, 1: ask explore, 2: manual, 3: agent
  const [name, setName] = useState('');
  const [messages, setMessages] = useState<{ from: 'user' | 'agent'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [initiallyChoseManual, setInitiallyChoseManual] = useState(false);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = (ts - start) / 400; // 0.4s duration
      setProgress(Math.min(1, elapsed));
      if (elapsed < 1) {
        frame = requestAnimationFrame(animate);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Step logic
  function handleNameSubmit(userName: string) {
    setName(userName);
    setStep(1);
  }
  function handleExploreChoice(choice: 'manual' | 'agent') {
    if (choice === 'manual') {
      setInitiallyChoseManual(true);
      setStep(2);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    } else {
      if (initiallyChoseManual) {
        setMessages([{
          from: 'agent',
          text: "Hey there! Changed your mind? I'd be happy to be your guide through Jananth's portfolio! What would you like to know? 😊"
        }]);
        setStep(3);
      } else {
        setStep(3);
        setMessages([]); // Start with empty messages
      }
    }
  }

  // Add click handler for the agent
  function handleAgentClick() {
    if (!visible) {
      setVisible(true);
      if (initiallyChoseManual) {
        setStep(3);
        setMessages([{
          from: 'agent',
          text: "Hey there! Changed your mind? I'd be happy to be your guide through Jananth's portfolio! What would you like to know? 😊"
        }]);
      }
    }
  }

  // LLM chat only in step 3
  async function handleSend(msg: string) {
    if (step !== 3) return;
    setMessages(m => [...m, { from: 'user', text: msg }]);
    setLoading(true);
    try {
      // 1. Get agent response
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setMessages(m => [...m, { from: 'agent', text: data.answer }]);
      
      // 2. Get voice audio and play
      const voiceRes = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: data.answer }),
      });
      
      if (!voiceRes.ok) {
        throw new Error(`HTTP error! status: ${voiceRes.status}`);
      }
      
      const voiceData = await voiceRes.json();
      const audioBlob = new Blob(
        [Uint8Array.from(atob(voiceData.audio), c => c.charCodeAt(0))],
        { type: `audio/${voiceData.format}` }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (e) {
      console.error('Error:', e);
      setMessages(m => [...m, { from: 'agent', text: 'Sorry, there was a problem connecting to the AI agent. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: 'none', margin: 0, position: 'relative' }}>
      {progress === 1 && (
        <ChatWindow
          step={step}
          name={name}
          onNameSubmit={handleNameSubmit}
          onExploreChoice={handleExploreChoice}
          messages={messages}
          onSend={handleSend}
          loading={loading}
          visible={visible}
        />
      )}
      <Canvas 
        camera={camera} 
        gl={{ alpha: true }} 
        style={{ background: 'transparent' }} 
        shadows
        onClick={handleAgentClick}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 2]} intensity={1.1} />
        <RobotModel scale={scale} progress={progress} />
        <OrbitControls enablePan={true} enableZoom={false} enableRotate={true} />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/assets/robot.glb'); 