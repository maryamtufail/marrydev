'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = {
  name: string;
  primary: string;
  accent: string;
  highlight: string;
  background: string;
  text: string;
};

export type Font = {
  name: string;
  variable: string;
  className: string;
};

export const themes: Theme[] = [
  {
    name: 'Zinc',
    primary: '#18181b',
    accent: '#a1a1aa',
    highlight: '#34d399',
    background: '#ffffff',
    text: '#18181b',
  },
  {
    name: 'Teal',
    primary: '#0d9488',
    accent: '#5eead4',
    highlight: '#f59e0b',
    background: '#f0fdfa',
    text: '#115e59',
  },
  {
    name: 'Blue',
    primary: '#2563eb',
    accent: '#93c5fd',
    highlight: '#f43f5e',
    background: '#eff6ff',
    text: '#1e3a8a',
  },
  {
    name: 'Orange',
    primary: '#ea580c',
    accent: '#fdba74',
    highlight: '#06b6d4',
    background: '#fff7ed',
    text: '#7c2d12',
  },
  {
    name: 'Purple',
    primary: '#7c3aed',
    accent: '#c4b5fd',
    highlight: '#10b981',
    background: '#f5f3ff',
    text: '#4c1d95',
  },
  {
    name: 'Rose',
    primary: '#e11d48',
    accent: '#fda4af',
    highlight: '#0ea5e9',
    background: '#fff1f2',
    text: '#881337',
  }
];

export const fonts: Font[] = [
  { name: 'Modern', variable: '--font-inter', className: 'font-sans' },
  { name: 'Elegant', variable: '--font-playfair', className: 'font-serif' },
  { name: 'Tech', variable: '--font-space', className: 'font-tech' },
];

type ThemeContextType = {
  currentTheme: Theme;
  currentFont: Font;
  setTheme: (name: string) => void;
  setFont: (name: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, initialTheme }: { children: React.ReactNode, initialTheme: Theme }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);
  const [currentFont, setCurrentFont] = useState<Font>(fonts[0]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const setTheme = (name: string) => {
    const theme = themes.find(t => t.name === name);
    if (theme) setCurrentTheme(theme);
  };

  const setFont = (name: string) => {
    const font = fonts.find(f => f.name === name);
    if (font) setCurrentFont(font);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', currentTheme.primary);
    root.style.setProperty('--accent', currentTheme.accent);
    root.style.setProperty('--highlight', currentTheme.highlight);
    root.style.setProperty('--background', currentTheme.background);
    root.style.setProperty('--text', currentTheme.text);
  }, [currentTheme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-main', `var(${currentFont.variable})`);
  }, [currentFont]);

  return (
    <ThemeContext.Provider value={{ currentTheme, currentFont, setTheme, setFont }}>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-highlight z-[10000] origin-left"
        style={{ scaleX }}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
