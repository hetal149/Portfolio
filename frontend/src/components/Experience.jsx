import React from "react";
import { experience } from "../mock";
import { SectionHeader } from "./About";
import { Briefcase, MapPin } from "lucide-react";

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          num="03"
          title="Experience"
          subtitle="Where I've been building, breaking, and shipping software."
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/60 via-emerald-500/20 to-transparent" />

          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-12 md:pl-20">
                {/* Dot */}
                <div className="absolute left-4 md:left-6 -translate-x-1/2 top-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                </div>

                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm mt-1">
                        <Briefcase size={14} />
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end gap-1 text-xs">
                      <span className="font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full w-fit">
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1 text-zinc-500">
                        <MapPin size={12} /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-zinc-300 leading-relaxed"
                      >
                        <span className="text-emerald-400 font-mono mt-0.5 shrink-0">
                          ▸
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
