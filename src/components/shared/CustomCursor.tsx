import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId: number;

    const animate = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;
      if (cursor) {
        cursor.style.transform = `translate3d(${currentX - 16}px, ${currentY - 16}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', onMouseMove);
    animate();

    // Magnetic effect
    const interactiveSelectors = 'button, a, [role="button"], .magnetic';
    const handlePointerOver = (e: Event) => {
      if (cursor && (e.target as Element).matches(interactiveSelectors)) {
        cursor.classList.add('cursor-magnetic');
      }
    };
    const handlePointerOut = (e: Event) => {
      if (cursor && (e.target as Element).matches(interactiveSelectors)) {
        cursor.classList.remove('cursor-magnetic');
      }
    };
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-gradient-cursor pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full mix-blend-difference"
      style={{ transition: 'box-shadow 0.2s, transform 0.15s' }}
    />
  );
};

export default CustomCursor; 