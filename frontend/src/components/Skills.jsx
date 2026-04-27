import React from "react";
import { skills } from "../mock";
import { SectionHeader } from "./About";
import {
  Layout,
  Server,
  Database,
  Plug,
  Cloud,
  Sparkles,
} from "lucide-react";

const iconMap = {
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  "APIs & Integrations": Plug,
  "Cloud & DevOps": Cloud,
  "AI & Productivity": Sparkles,
};

const Skills = () => {
  const allTech = skills.flatMap((s) => s.items);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          num="02"
          title="Skills & Tech Stack"
          subtitle="The tools and technologies I use to architect, build, and ship products."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group) => {
            const Icon = iconMap[group.category] || Layout;
            return (
              <div
                key={group.category}
                className="group p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Icon size={18} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-900/60 border border-white/10 text-zinc-300 hover:text-emerald-300 hover:border-emerald-500/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Marquee */}
        <div className="mt-14 relative overflow-hidden py-6 border-y border-white/5">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0b] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0b] to-transparent z-10" />
          <div className="flex marquee-track gap-8 whitespace-nowrap">
            {[...allTech, ...allTech].map((t, i) => (
              <span
                key={i}
                className="font-mono text-sm text-zinc-500 hover:text-emerald-400 transition-colors"
              >
                <span className="text-emerald-500/60">/</span> {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
