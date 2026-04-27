import React from "react";
import { projects } from "../mock";
import { SectionHeader } from "./About";
import { Folder, ArrowUpRight, Star } from "lucide-react";

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          num="04"
          title="Featured Projects"
          subtitle="A selection of production systems I've architected and shipped."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, idx) => (
            <article
              key={p.id}
              className={`group relative p-7 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 ${
                idx === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <Folder size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400/80 uppercase tracking-wider">
                      {p.category}
                    </div>
                  </div>
                </div>
                {p.featured && (
                  <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
                    <Star size={10} fill="currentColor" /> Featured
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-1 flex items-center gap-2">
                {p.name}
                <ArrowUpRight
                  size={18}
                  className="text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </h3>
              <div className="text-sm text-emerald-300/80 mb-4 font-mono">
                {p.subtitle}
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {p.description}
              </p>

              <ul className="space-y-1.5 mb-5">
                {p.details.slice(0, idx === 0 ? 5 : 3).map((d, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-xs text-zinc-400 leading-relaxed"
                  >
                    <span className="text-emerald-500 font-mono shrink-0">○</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono text-zinc-400 bg-zinc-900/80 border border-white/5 px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
