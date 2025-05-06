import React from 'react';
import SectionTitle from './shared/SectionTitle';
import { useEffect, useRef } from 'react';

const skills = [
  { src: '/assets/python.png', alt: 'Python' },
  { src: '/assets/python.png', alt: 'React' },
  { src: '/assets/python.png', alt: 'Node.js' },
  { src: '/assets/python.png', alt: 'TensorFlow' },
  { src: '/assets/python.png', alt: 'AWS' },
  { src: '/assets/python.png', alt: 'MongoDB' },
  { src: '/assets/python.png', alt: 'PyTorch' },
];

const Skills: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0;
    const rotate = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${angle}deg)`;
        angle += 0.2;
      }
      requestAnimationFrame(rotate);
    };
    rotate();
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-900/50 dark:bg-gray-100/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Skills & Expertise</SectionTitle>

        <div className="w-full h-[400px] flex justify-center items-center perspective-[1000px]">
          <div
            ref={ringRef}
            className="relative w-[300px] h-[300px] transform-style-preserve-3d"
          >
            {skills.map((skill, i) => {
              const total = skills.length;
              const angle = (360 / total) * i;
              return (
                <div
                  key={skill.alt}
                  className="absolute w-16 h-16 md:w-20 md:h-20 transform-style-preserve-3d"
                  style={{
                    transform: `
                      rotateY(${angle}deg)
                      translateZ(150px)
                    `,
                  }}
                >
                  <img
                    src={skill.src}
                    alt={skill.alt}
                    className="w-full h-full object-contain rounded-full bg-transparent"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
