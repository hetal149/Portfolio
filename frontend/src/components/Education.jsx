import React from "react";
import { education, certifications } from "../mock";
import { SectionHeader } from "./About";
import { GraduationCap, Award, Calendar } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          num="05"
          title="Education & Certifications"
          subtitle="Academic background and continuous learning."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-emerald-400">
              <GraduationCap size={14} /> Education
            </div>
            {education.map((e, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors"
              >
                <h3 className="font-display text-lg font-semibold text-white">
                  {e.degree}
                </h3>
                <div className="text-emerald-300 text-sm mt-1">{e.major}</div>
                <div className="text-zinc-400 text-sm mt-3">{e.institution}</div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 mt-2">
                  <Calendar size={12} /> {e.period}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-emerald-400">
              <Award size={14} /> Certifications
            </div>
            <div className="space-y-3">
              {certifications.map((c, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Award size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {c.name}
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        {c.issuer}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
                    {c.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
