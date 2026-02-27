'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import portfolioData from '@/data/portfolio.json';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  return (
    <section id="projects" className="px-6 py-24 lg:px-24 bg-primary text-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-4xl font-medium tracking-tight">Selected <br /><span className="opacity-50">Projects.</span></h2>
          <p className="max-w-sm opacity-60 text-sm">
            A showcase of enterprise solutions and high-impact platforms delivered over the years. Click on a card to see full details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              onClick={() => handleProjectClick(project)}
              className="group bg-zinc-900/50 backdrop-blur-sm p-6 md:p-10 rounded-2xl border border-zinc-800 h-full flex flex-col cursor-pointer hover:border-highlight/50 transition-all active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest mb-2">{project.category}</p>
                  <h3 className="text-2xl md:text-3xl font-medium group-hover:text-highlight transition-colors">{project.title}</h3>
                </div>
                <div className="px-3 py-1 border border-zinc-700 rounded-full text-[9px] md:text-[10px] uppercase tracking-wider opacity-60">
                  {project.impact}
                </div>
              </div>
              
              <p className="text-sm md:text-base opacity-60 mb-8 leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono opacity-40 border border-zinc-800 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
