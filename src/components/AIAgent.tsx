import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import api, { warmUpAgent } from '../api/config';

// API response types
interface ChatResponse {
  answer: string;
}

interface VoiceResponse {
  audio: string;
  format: string;
}

// Agent warm-up status
type AgentStatus = 'warming' | 'ready' | 'error';

function useResponsive3D() {
  const [settings, setSettings] = useState({
    scale: 1,
    camera: { position: [0, 0.3, 10] as [number, number, number], fov: 40 },
  });

  useEffect(() => {
    function updateSettings() {
      const width = window.innerWidth;
      if (width < 640) {
        setSettings({ scale: 1.4, camera: { position: [0, 0.3, 10] as [number, number, number], fov: 40 } });
      } else if (width < 1024) {
        setSettings({ scale: 1, camera: { position: [0, 0.3, 8] as [number, number, number], fov: 40 } });
      } else {
        setSettings({ scale: 1, camera: { position: [0, 0.3, 6] as [number, number, number], fov: 40 } });
      }
    }
    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  return settings;
}

function RobotModel({ scale, progress }: { scale: number; progress: number }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/robot.glb');
  const sceneClone = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(sceneClone);
    const center = box.getCenter(new THREE.Vector3());
    sceneClone.position.x -= center.x;
    sceneClone.position.y -= center.y;
    sceneClone.position.z -= center.z;
  }, [sceneClone]);

  useFrame(({ clock }) => {
    if (group.current && progress === 1) {
      group.current.position.y = Math.sin(clock.getElapsedTime()) * 0.08;
      group.current.rotation.y = Math.sin(clock.getElapsedTime() / 2) * 0.2;
    }
  });

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

// Animated dots for loading states
function Dots() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c % 3) + 1), 500);
    return () => clearInterval(id);
  }, []);
  return <span>{'.'.repeat(count)}</span>;
}

// Status banner shown inside chat when agent is waking up
function StatusBanner({ status }: { status: AgentStatus }) {
  if (status === 'ready') return null;
  return (
    <div
      style={{
        padding: '7px 12px',
        borderRadius: 8,
        background: status === 'warming' ? 'rgba(124,58,237,0.18)' : 'rgba(220,38,38,0.18)',
        border: `1px solid ${status === 'warming' ? '#7c3aed55' : '#dc262655'}`,
        fontSize: 13,
        color: status === 'warming' ? '#c4b5fd' : '#fca5a5',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {status === 'warming' ? (
        <>
          <span style={{ fontSize: 16 }}>⚡</span>
          <span>
            Waking up AI agent<Dots /> this may take up to 30 seconds on first load.
          </span>
        </>
      ) : (
        <>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span>Agent is offline. Please try again in a moment.</span>
        </>
      )}
    </div>
  );
}

function ChatWindow({
  step,
  name,
  agentStatus,
  onNameSubmit,
  onExploreChoice,
  messages,
  onSend,
  loading,
  visible,
}: {
  step: number;
  name: string;
  agentStatus: AgentStatus;
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

  const inputDisabled = loading || agentStatus === 'warming';

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '110%',
        right: 0,
        width: 320,
        maxWidth: '80vw',
        maxHeight: '80vh',
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
      {/* Step 0: Ask name */}
      {step === 0 && (
        <>
          <div style={{ marginBottom: 8 }}>Hi! What's your name?</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) onNameSubmit(input.trim());
            }}
            style={{ display: 'flex', gap: 8 }}
          >
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your name..."
              style={{
                flex: 1, padding: 8, borderRadius: 8,
                border: '1px solid #333', background: '#181820',
                color: '#fff', outline: 'none',
              }}
            />
            <button type="submit" style={btnStyle()}>OK</button>
          </form>
        </>
      )}

      {/* Step 1: Explore choice */}
      {step === 1 && (
        <>
          <div style={{ marginBottom: 8 }}>Nice to meet you, <b>{name}</b>! 👋</div>
          <div style={{ marginBottom: 8 }}>
            Would you like to explore the portfolio manually, or would you like my help to guide you through the highlights?
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => onExploreChoice('manual')} style={btnStyle(true)}>
              Explore Manually
            </button>
            <button onClick={() => onExploreChoice('agent')} style={btnStyle()}>
              Guide Me
            </button>
          </div>
        </>
      )}

      {/* Step 2: Manual explore */}
      {step === 2 && name && (
        <div>
          {`Alright, ${name}! Feel free to explore the portfolio on your own. If you need my help, just click the agent again!`}
        </div>
      )}

      {/* Step 3: Agent chat */}
      {step === 3 && (
        <>
          {name && (
            <div style={{ marginBottom: 4 }}>
              {`Awesome, ${name}! I'm here to answer any questions about Jananth's portfolio. Ask away!`}
            </div>
          )}

          {/* Warm-up / error banner */}
          <StatusBanner status={agentStatus} />

          {/* Messages */}
          <div
            style={{
              flex: 1, overflowY: 'auto', marginBottom: 8,
              maxHeight: 'calc(80vh - 200px)', paddingRight: 8,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  margin: '6px 0',
                  alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  background:
                    msg.from === 'user'
                      ? '#23234a'
                      : 'linear-gradient(90deg, #7c3aed, #2563eb, #10b981)',
                  color: '#fff',
                  borderRadius: 12,
                  padding: '7px 14px',
                  maxWidth: '85%',
                  fontWeight: msg.from === 'user' ? 500 : 600,
                  fontSize: 15,
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
              </div>
            ))}
            {/* Typing indicator */}
            {loading && (
              <div
                style={{
                  margin: '6px 0',
                  background: 'linear-gradient(90deg, #7c3aed, #2563eb, #10b981)',
                  color: '#fff',
                  borderRadius: 12,
                  padding: '7px 14px',
                  maxWidth: '60%',
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Thinking<Dots />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim() && !inputDisabled) {
                onSend(input.trim());
                setInput('');
              }
            }}
            style={{ display: 'flex', gap: 8 }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={agentStatus === 'warming' ? 'Agent waking up...' : 'Type your message...'}
              disabled={inputDisabled}
              style={{
                flex: 1, padding: 8, borderRadius: 8,
                border: '1px solid #333', background: '#181820',
                color: inputDisabled ? '#666' : '#fff', outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={inputDisabled}
              style={btnStyle(false, inputDisabled)}
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}

// Shared button style helper
function btnStyle(secondary = false, disabled = false) {
  return {
    flex: 1,
    padding: '8px 16px',
    borderRadius: 8,
    background: secondary
      ? '#23234a'
      : 'linear-gradient(90deg, #7c3aed, #2563eb, #10b981)',
    color: '#fff',
    border: 'none',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
  } as React.CSSProperties;
}

export default function AIAgent() {
  const { scale, camera } = useResponsive3D();
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState<{ from: 'user' | 'agent'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [initiallyChoseManual, setInitiallyChoseManual] = useState(false);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('warming');

  // Animate robot entry
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = (ts - start) / 400;
      setProgress(Math.min(1, elapsed));
      if (elapsed < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Warm up Render backend silently on page load
  useEffect(() => {
    setAgentStatus('warming');
    warmUpAgent().then(() => {
      setAgentStatus('ready');
    }).catch(() => {
      setAgentStatus('error');
    });
  }, []);

  function handleNameSubmit(userName: string) {
    setName(userName);
    setStep(1);
  }

  function handleExploreChoice(choice: 'manual' | 'agent') {
    if (choice === 'manual') {
      setInitiallyChoseManual(true);
      setStep(2);
      setTimeout(() => setVisible(false), 3000);
    } else {
      if (initiallyChoseManual) {
        setMessages([{
          from: 'agent',
          text: "Hey there! Changed your mind? I'd be happy to be your guide through Jananth's portfolio! What would you like to know? 😊",
        }]);
      } else {
        setMessages([]);
      }
      setStep(3);
    }
  }

  function handleAgentClick() {
    if (!visible) {
      setVisible(true);
      if (initiallyChoseManual) {
        setStep(3);
        setMessages([{
          from: 'agent',
          text: "Hey there! Changed your mind? I'd be happy to be your guide through Jananth's portfolio! What would you like to know? 😊",
        }]);
      } else {
        setStep(0);
      }
    }
  }

  async function handleSend(msg: string) {
    if (step !== 3) return;
    setMessages((m) => [...m, { from: 'user', text: msg }]);
    setLoading(true);

    try {
      const { data } = await api.post<ChatResponse>('/api/chat', {
        message: msg,
        user_name: name,
      });

      // Mark agent as ready after first successful response
      setAgentStatus('ready');
      setMessages((m) => [...m, { from: 'agent', text: data.answer }]);

      // Voice
      try {
        const voiceRes = await api.post<VoiceResponse>('/api/voice', {
          text: data.answer,
          user_name: name,
        });
        const audioBlob = new Blob(
          [Uint8Array.from(atob(voiceRes.data.audio), (c) => c.charCodeAt(0))],
          { type: `audio/${voiceRes.data.format}` }
        );
        const audio = new Audio(URL.createObjectURL(audioBlob));
        audio.play();
      } catch {
        // Voice is non-critical — ignore failure silently
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      let errorMessage =
        'Sorry, something went wrong. Please try again.';

      if (!error.response) {
        errorMessage =
          'Could not reach the AI agent. It may still be waking up — please wait a moment and try again.';
        setAgentStatus('error');
      } else if (error.response.status === 502 || error.response.status === 503) {
        errorMessage =
          'The AI agent is temporarily unavailable. Please try again in a few moments.';
        setAgentStatus('error');
      }

      setMessages((m) => [...m, { from: 'agent', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {progress === 1 && visible && (
        <ChatWindow
          step={step}
          name={name}
          agentStatus={agentStatus}
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

useGLTF.preload('/assets/robot.glb');
