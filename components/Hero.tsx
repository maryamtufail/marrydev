import { motion } from 'motion/react';
import { Github, Linkedin, ArrowRight } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';

export default function Hero() {
  const { profile } = portfolioData;
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 py-24 lg:px-24 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 -z-10 w-full md:w-1/2 h-full bg-zinc-50/50 skew-x-0 md:skew-x-12 transform origin-top-right" />
      
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 text-[10px] md:text-xs font-mono tracking-widest uppercase bg-primary text-bg mb-6">
            Available for new opportunities
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-medium tracking-tighter leading-[0.95] md:leading-[0.9] mb-8">
            {profile.name.split(' ')[0]} <br />
            <span className="text-accent">{profile.lastName}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl"
        >
          <p className="text-lg lg:text-2xl text-zinc-600 leading-relaxed mb-10">
            {profile.title} with <span className="text-primary font-medium">{profile.yearsOfExp} years</span> of experience delivering scalable web and mobile applications for <span className="text-primary font-medium">{profile.activeUsers} users</span>.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-2 px-6 py-3 bg-primary text-bg rounded-full hover:opacity-90 transition-all text-sm md:text-base"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-3">
              <a 
                href={profile.github} 
                target="_blank" 
                className="p-3 border border-zinc-200 rounded-full hover:bg-zinc-50 transition-colors flex items-center justify-center"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={profile.linkedin} 
                target="_blank" 
                className="p-3 border border-zinc-200 rounded-full hover:bg-zinc-50 transition-colors flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24 pt-12 border-t border-zinc-100"
      >
        <div>
          <p className="text-2xl md:text-3xl font-medium">{profile.activeUsers}</p>
          <p className="text-[10px] md:text-sm text-zinc-500 uppercase tracking-wider">Active Users</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-medium">{profile.perfIncrease}</p>
          <p className="text-[10px] md:text-sm text-zinc-500 uppercase tracking-wider">Perf. Increase</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-medium">{profile.contractImpact}</p>
          <p className="text-[10px] md:text-sm text-zinc-500 uppercase tracking-wider">Contract Impact</p>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-medium">{profile.yearsOfExp}</p>
          <p className="text-[10px] md:text-sm text-zinc-500 uppercase tracking-wider">Years Exp.</p>
        </div>
      </motion.div>
    </section>
  );
}
