import React, { useEffect, useRef } from 'react';

const skills = [
  { src: '/assets/python.png', alt: 'Python' },
  { src: '/assets/react.png', alt: 'React' },
  { src: '/assets/nodejs.png', alt: 'Node.js' },
  { src: '/assets/tensorflow.png', alt: 'TensorFlow' },
  { src: '/assets/aws.png', alt: 'AWS' },
  { src: '/assets/mongodb.png', alt: 'MongoDB' },
  { src: '/assets/pytorch.png', alt: 'PyTorch' }
];

const Skills: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rotate = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${(parseFloat(ringRef.current.style.transform.replace('rotateY(', '').replace('deg)', '')) || 0) + 0.2}deg)`;
      }
      requestAnimationFrame(rotate);
    };
    rotate();
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-900/50 dark:bg-gray-100/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-10 text-white dark:text-black">Skills & Expertise</h2>

        <div className="w-full h-[400px] flex justify-center items-center perspective-[1000px]">
          <div
            ref={ringRef}
            className="relative w-[300px] h-[300px] transform-style-preserve-3d transition-all duration-1000"
            style={{
              transformStyle: 'preserve-3d',
              animation: 'rotate 30s linear infinite'
            }}
          >
            {skills.map((skill, i) => {
              const total = skills.length;
              const angle = (360 / total) * i; // Evenly distribute icons in 3D space
              return (
                <div
                  key={skill.alt}
                  className="absolute w-16 h-16 md:w-20 md:h-20 transform-style-preserve-3d"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(150px)`,
                    transition: 'transform 1s'
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
