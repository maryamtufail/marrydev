import type {Metadata} from 'next';
import { Inter, JetBrains_Mono, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './globals.css';
import portfolioData from '@/data/portfolio.json';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

export const metadata: Metadata = {
  title: `${portfolioData.profile.name} | ${portfolioData.profile.title}`,
  description: portfolioData.profile.summary,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const { theme } = portfolioData;
  
  const themeStyles = {
    '--primary': theme.primary,
    '--accent': theme.accent,
    '--highlight': theme.highlight,
    '--background': theme.background,
    '--text': theme.text,
  } as React.CSSProperties;

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${spaceGrotesk.variable}`}>
      <body 
        className="font-sans antialiased relative" 
        style={themeStyles}
        suppressHydrationWarning
      >
        {/* Noise Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <ThemeProvider initialTheme={theme as any}>
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
