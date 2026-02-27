'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  impact: string;
  tags: string[];
  description: string;
  longDescription?: string;
  features?: string[];
  link?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-all"
              aria-label="Close modal"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
              <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8 md:mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-[10px] font-mono tracking-widest uppercase bg-primary text-bg rounded">
                      {project.category}
                    </span>
                    <span className="text-[10px] md:text-xs font-medium text-zinc-400">
                      {project.impact}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-6xl font-medium tracking-tighter mb-4 md:mb-6 text-zinc-900">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-zinc-200 text-[10px] md:text-xs text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-8 md:space-y-12">
                  {/* Overview */}
                  <section>
                    <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3 md:mb-4">Overview</h3>
                    <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </section>

                  {/* Key Features */}
                  {project.features && (
                    <section>
                      <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4 md:mb-6">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {project.features.map((feature, i) => (
                          <div key={i} className="flex gap-3 md:gap-4 p-4 rounded-xl md:rounded-2xl bg-zinc-50 border border-zinc-100">
                            <CheckCircle2 className="text-primary flex-shrink-0 w-4 h-4 md:w-5 md:h-5" />
                            <p className="text-xs md:text-sm text-zinc-600 font-medium leading-snug">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Footer Action */}
                  {project.link && (
                    <div className="pt-6 md:pt-8 border-t border-zinc-100">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary text-bg rounded-full font-medium hover:opacity-90 transition-all group text-sm md:text-base"
                      >
                        Visit Live Project
                        <ExternalLink size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
