import { motion } from 'motion/react';
import portfolioData from '@/data/portfolio.json';

export default function Skills() {
  const { skills } = portfolioData;
  
  return (
    <section className="px-6 py-24 lg:px-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <h2 className="text-4xl font-medium tracking-tight">Technical <br /><span className="text-accent">Expertise.</span></h2>
          <p className="max-w-md text-zinc-500">
            A comprehensive stack focused on performance, scalability, and modern developer experience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {skills.map((skillGroup, idx) => (
            <motion.div 
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-accent mb-4 md:mb-6 border-b border-zinc-200 pb-2">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {skillGroup.items.map((item) => (
                  <li key={item} className="text-sm md:text-base text-zinc-700 flex items-center gap-2">
                    <div className="w-1 h-1 bg-zinc-300 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
