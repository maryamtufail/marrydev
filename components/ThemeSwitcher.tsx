'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { themes, fonts, useTheme } from './ThemeProvider';

export default function ThemeSwitcher() {
  const { currentTheme, currentFont, setTheme, setFont } = useTheme();
  const { scrollYProgress } = useScroll();
  
  // Move the switcher vertically as the user scrolls the page
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div className="fixed bottom-6 md:bottom-12 left-0 right-0 z-50 pointer-events-none flex flex-col items-center gap-4 px-4">
      <motion.div 
        style={{ y }}
        className="bg-white/80 backdrop-blur-xl border border-zinc-200 p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center gap-4 md:gap-6 px-4 md:px-6"
      >
        {/* Theme Section */}
        <div className="flex items-center gap-2 md:gap-3 md:pr-6 md:border-r border-zinc-200">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setTheme(theme.name)}
              className="relative group flex-shrink-0 focus:outline-none"
              title={`Theme: ${theme.name}`}
            >
              <motion.div
                className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all shadow-sm"
                style={{ 
                  backgroundColor: theme.primary,
                  borderColor: currentTheme.name === theme.name ? theme.highlight : 'transparent'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
              {currentTheme.name === theme.name && (
                <motion.div
                  layoutId="active-theme"
                  className="absolute -inset-1 rounded-full border-2 border-zinc-900/10 pointer-events-none"
                />
              )}
            </button>
          ))}
        </div>

        {/* Font Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {fonts.map((font) => (
            <button
              key={font.name}
              onClick={() => setFont(font.name)}
              className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-[10px] font-mono uppercase tracking-widest transition-all border ${
                currentFont.name === font.name 
                  ? 'bg-primary text-bg border-primary' 
                  : 'bg-transparent text-zinc-400 border-zinc-200 hover:border-zinc-400'
              }`}
            >
              {font.name}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
