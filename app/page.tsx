'use client';

import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import JobMatchFilter from '@/components/JobMatchFilter';
import { motion, useScroll, useSpring } from 'motion/react';
import portfolioData from '@/data/portfolio.json';

export default function PortfolioPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const initials = portfolioData.profile.name.split(' ').map(n => n[0]).join('');

  return (
    <main className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation - Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-4 md:px-6 md:py-6 lg:px-24 flex justify-between items-center pointer-events-none">
        <div className="font-mono text-[10px] md:text-xs tracking-widest uppercase pointer-events-auto bg-bg/80 backdrop-blur px-3 py-1 border border-zinc-100">
          {initials} / 2026
        </div>
        <div className="hidden sm:flex gap-4 md:gap-8 pointer-events-auto bg-bg/80 backdrop-blur px-4 md:px-6 py-1 border border-zinc-100 rounded-full">
          <a href="#experience" className="text-[10px] md:text-xs uppercase tracking-widest hover:text-accent transition-colors">Experience</a>
          <a href="#skills" className="text-[10px] md:text-xs uppercase tracking-widest hover:text-accent transition-colors">Skills</a>
          <a href="#projects" className="text-[10px] md:text-xs uppercase tracking-widest hover:text-accent transition-colors">Projects</a>
          <a href="#contact" className="text-[10px] md:text-xs uppercase tracking-widest hover:text-accent transition-colors">Contact</a>
        </div>
      </nav>

      <Hero />
      
      <div id="experience">
        <Experience />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <JobMatchFilter />
    </main>
  );
}
