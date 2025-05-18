import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/shared/ParticleBackground';
import CustomCursor from './components/shared/CustomCursor';
import AIAgentFloating from './components/AIAgentFloating';

function App() {
  return (
    <div className="relative bg-gray-900 text-gray-100 min-h-screen">
      <CustomCursor />
      <ParticleBackground />
      <AIAgentFloating />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;