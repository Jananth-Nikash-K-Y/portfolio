import React from 'react';
import { Github, Linkedin, Twitter, ChevronUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socials = [
    { label: 'GitHub', icon: <Github size={16} />, href: 'https://github.com/Jananth-Nikash-K-Y/' },
    { label: 'LinkedIn', icon: <Linkedin size={16} />, href: 'https://in.linkedin.com/in/jananth-nikash-k-y' },
    { label: 'Twitter', icon: <Twitter size={16} />, href: 'https://x.com/JananthNikashKY' },
  ];

  return (
    <footer className="py-12 bg-linen/80 dark:bg-void" style={{ borderTop: '1px solid rgba(201,169,110,0.2)' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400 hover:text-gold transition-colors"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(201,169,110,0.6)' }}
          >
            <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            Back to top
          </button>

          {/* Gold rule */}
          <div className="w-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

          {/* Logo + name */}
          <a href="#home" className="flex flex-col items-center gap-2">
            <img src="/assets/logo/logoV2.png" alt="Logo" className="w-10 h-10 object-contain" />
            <span
              className="text-gray-600 dark:text-gray-400"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.2em' }}
            >
              JANANTH NIKASH K Y
            </span>
          </a>

          {/* Socials */}
          <div className="flex items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-gray-500 hover:text-iris dark:hover:text-iris transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <p
            className="text-gray-400 dark:text-gray-600"
            style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.1em' }}
          >
            © {new Date().getFullYear()} Jananth Nikash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
