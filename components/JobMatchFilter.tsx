'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Search, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import portfolioData from '@/data/portfolio.json';

interface MatchResult {
  score: number;
  summary: string;
  matchingSkills: string[];
  relevantProjects: string[];
  relevantExperience: string[];
}

export default function JobMatchFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeMatch = async () => {
    if (!jobDescription.trim()) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      
      const prompt = `
        You are an expert technical recruiter and CTO. 
        Analyze the following portfolio data against the provided job description.
        
        Portfolio Data:
        ${JSON.stringify(portfolioData)}
        
        Job Description:
        ${jobDescription}
        
        Return a JSON object with the following structure:
        {
          "score": number (0-100),
          "summary": "A 2-3 sentence summary of why this candidate is a match",
          "matchingSkills": ["Skill 1", "Skill 2"],
          "relevantProjects": ["Project Title 1", "Project Title 2"],
          "relevantExperience": ["Company Name 1", "Company Name 2"]
        }
        
        Only return the JSON object.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data);
    } catch (err) {
      console.error("AI Analysis Error:", err);
      setError("Failed to analyze job description. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 md:right-12 z-40 p-4 bg-primary text-bg rounded-full shadow-2xl hover:scale-110 transition-transform group"
        title="AI Job Matcher"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-zinc-900 text-white text-[10px] uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          AI Job Matcher
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 md:p-8 border-b border-zinc-100 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-medium tracking-tight flex items-center gap-2">
                    <Sparkles className="text-primary w-5 h-5" />
                    AI Job Matcher
                  </h2>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">For Recruiters & CTOs</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                {!result ? (
                  <div className="space-y-6">
                    <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        Paste a job description below. Our AI will analyze Maryam&apos;s portfolio to show you exactly how she fits your role.
                      </p>
                    </div>

                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste job description here..."
                      className="w-full h-64 p-4 rounded-2xl border border-zinc-200 focus:border-primary focus:ring-0 transition-all text-sm resize-none custom-scrollbar"
                    />

                    {error && (
                      <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl">
                        <AlertCircle size={16} />
                        {error}
                      </div>
                    )}

                    <button
                      onClick={analyzeMatch}
                      disabled={isAnalyzing || !jobDescription.trim()}
                      className="w-full py-4 bg-primary text-bg rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 hover:opacity-90 transition-all"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analyzing Match...
                        </>
                      ) : (
                        <>
                          <Search size={20} />
                          Analyze Match
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* Score Header */}
                    <div className="flex items-center justify-between bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">Match Score</p>
                        <p className="text-5xl font-medium tracking-tighter text-primary">{result.score}%</p>
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-primary/20 flex items-center justify-center relative">
                        <div 
                          className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent -rotate-45"
                          style={{ clipPath: `inset(0 0 ${100 - result.score}% 0)` }}
                        />
                        <CheckCircle2 className="text-primary w-8 h-8" />
                      </div>
                    </div>

                    {/* Summary */}
                    <section>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Analysis Summary</h3>
                      <p className="text-lg text-zinc-700 leading-relaxed font-medium">
                        {result.summary}
                      </p>
                    </section>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Matching Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {result.matchingSkills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-highlight/10 text-primary text-[10px] font-medium rounded-full border border-highlight/20">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Relevant Projects</h3>
                        <div className="space-y-2">
                          {result.relevantProjects.map(project => (
                            <div key={project} className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
                              <div className="w-1 h-1 bg-primary rounded-full" />
                              {project}
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    <button
                      onClick={() => {
                        setResult(null);
                        setJobDescription('');
                      }}
                      className="w-full py-4 border border-zinc-200 text-zinc-500 rounded-xl font-medium hover:bg-zinc-50 transition-all text-sm"
                    >
                      Analyze Another Job
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
