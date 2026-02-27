import { motion } from 'motion/react';
import portfolioData from '@/data/portfolio.json';

export default function Experience() {
  const { experience } = portfolioData;
  
  return (
    <section className="px-6 py-24 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-medium tracking-tight mb-12 md:mb-16">Work <br /><span className="text-accent">History.</span></h2>
        
        <div className="space-y-12 md:space-y-20">
          {experience.map((exp, idx) => (
            <motion.div 
              key={exp.company + exp.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
            >
              <div className="lg:col-span-4">
                <p className="font-mono text-[10px] md:text-xs text-accent uppercase tracking-widest mb-2">{exp.period}</p>
                <h3 className="text-xl md:text-2xl font-medium">{exp.company}</h3>
                <p className="text-sm md:text-base text-zinc-500">{exp.role}</p>
                <p className="text-[10px] md:text-xs text-zinc-400 mt-2">{exp.location}</p>
              </div>
              <div className="lg:col-span-8">
                <ul className="space-y-3 md:space-y-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-sm md:text-base text-zinc-600 leading-relaxed flex gap-3">
                      <span className="text-zinc-300 mt-1.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
