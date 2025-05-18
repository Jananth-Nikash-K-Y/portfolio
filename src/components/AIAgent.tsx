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

export default function AIAgent() {
  const { scale, camera } = useResponsive3D();
  const [progress, setProgress] = useState(0); // 0 to 1

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

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: 'none', margin: 0, position: 'relative' }}>
      <Canvas camera={camera} gl={{ alpha: true }} style={{ background: 'transparent' }} shadows>
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 2]} intensity={1.1} />
        <RobotModel scale={scale} progress={progress} />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/assets/robot.glb'); 