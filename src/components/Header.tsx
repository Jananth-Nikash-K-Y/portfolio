import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Twitter, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={16} />, href: 'https://github.com/Jananth-Nikash-K-Y/' },
    { name: 'LinkedIn', icon: <Linkedin size={16} />, href: 'https://in.linkedin.com/in/jananth-nikash-k-y' },
    { name: 'Twitter', icon: <Twitter size={16} />, href: 'https://x.com/JananthNikashKY' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-parchment/90 dark:bg-void/90 backdrop-blur-md py-2 shadow-sm'
          : 'bg-transparent py-4'
      }`}
      style={isScrolled ? { borderBottom: '1px solid rgba(201,169,110,0.2)' } : {}}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img src="/assets/logo/logoV2.png" alt="Logo" className="w-9 h-9 object-contain" />
            <span
              className="hidden sm:block text-sm font-medium tracking-widest text-gray-700 dark:text-gray-300"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11 }}
            >
              JN.KY
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium tracking-widest text-gray-600 dark:text-gray-400 hover:text-iris dark:hover:text-iris transition-colors uppercase"
                style={{ fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.12em' }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop right — socials + toggle */}
          <div className="hidden md:flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-iris dark:hover:text-iris transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
            <div className="w-px h-4 mx-1" style={{ background: 'rgba(201,169,110,0.3)' }} />
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gold transition-colors"
              style={{ color: theme === 'light' ? '#888' : '#aaa' }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gold transition-colors">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-iris transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-parchment/97 dark:bg-void/97 backdrop-blur-md" style={{ borderTop: '1px solid rgba(201,169,110,0.2)' }}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2.5 text-xs tracking-widest uppercase text-gray-700 dark:text-gray-300 hover:text-iris dark:hover:text-iris transition-colors"
                style={{ fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.12em' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="px-4 py-3 flex gap-4" style={{ borderTop: '1px solid rgba(201,169,110,0.15)' }}>
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-iris transition-colors" aria-label={link.name}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
