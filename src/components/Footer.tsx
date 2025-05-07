import React from 'react';
import { Github, Linkedin, Twitter, Instagram, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors mb-8"
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </button>
          
          <a href="#home" className="flex items-center gap-2 mb-6">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500"></div>
              <div className="absolute inset-1 rounded-full bg-gray-900 flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                JK
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Jananth Nikash K Y
            </span>
          </a>
          
          <div className="flex space-x-5 mb-8">
            <SocialLink href="https://github.com/Jananth-Nikash-K-Y/" icon={<Github size={20} />} label="GitHub" />
            <SocialLink href="https://in.linkedin.com/in/jananth-nikash-k-y" icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} label="Twitter" />
            <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} label="Instagram" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm text-gray-400">
            <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-purple-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Jananth Nikash. All rights reserved.</p>
            <p className="mt-1">AI Engineer & Full-Stack Developer</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({
  href,
  icon,
  label,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-purple-400"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default Footer;