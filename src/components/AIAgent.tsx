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
        setSettings({ scale: 1, camera: { position: [0, 0.3, 10] as [number, number, number], fov: 40 } });
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
}: {
  step: number;
  name: string;
  onNameSubmit: (name: string) => void;
  onExploreChoice: (choice: 'manual' | 'agent') => void;
}) {
  const [input, setInput] = useState('');
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
      }}
    >
      {step === 0 && (
        <>
          <div style={{ marginBottom: 8 }}>🤖 Hi! What's your name?</div>
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
            Would you like to explore the portfolio manually, or with my help?
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
              Manually
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
              With your help
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div style={{ marginBottom: 8 }}>
            {name && (
              <>
                {`Alright, ${name}! `}
                {`Feel free to explore the portfolio. I'm here if you need me!`}
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
                {`Awesome, ${name}! I'll guide you through the portfolio. 🚀`}
              </>
            )}
          </div>
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

  // Handlers for chat steps
  function handleNameSubmit(userName: string) {
    setName(userName);
    setStep(1);
  }
  function handleExploreChoice(choice: 'manual' | 'agent') {
    setStep(choice === 'manual' ? 2 : 3);
  }

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: 'none', margin: 0, position: 'relative' }}>
      {progress === 1 && (
        <ChatWindow
          step={step}
          name={name}
          onNameSubmit={handleNameSubmit}
          onExploreChoice={handleExploreChoice}
        />
      )}
      <Canvas camera={camera} gl={{ alpha: true }} style={{ background: 'transparent' }} shadows>
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