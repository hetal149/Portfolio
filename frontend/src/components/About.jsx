import React from "react";
import { Globe2, Zap, Users, Code2 } from "lucide-react";
import { personalInfo, languages } from "../mock";

const pillars = [
  {
    icon: Code2,
    title: "End-to-end Ownership",
    text: "From architecture to deployment — I design, build, and ship features that go to production.",
  },
  {
    icon: Zap,
    title: "Performance First",
    text: "Reduced search latency by 35-40% with Meilisearch + Redis caching across production apps.",
  },
  {
    icon: Globe2,
    title: "International Clients",
    text: "Directly engage with clients across UAE, USA, and UK — translating requirements into delivery.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    text: "Cross-functional partnership with Design, QA, and Product to hit sprint goals reliably.",
  },
];

const SectionHeader = ({ num, title, subtitle }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-sm text-emerald-400">{num}.</span>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent ml-2" />
    </div>
    {subtitle && <p className="text-zinc-400 max-w-2xl">{subtitle}</p>}
  </div>
);

export { SectionHeader };

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          num="01"
          title="About Me"
          subtitle="A quick story of how I build, ship and grow."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-5 text-zinc-300 leading-relaxed">
            <p>{personalInfo.bio}</p>
            <p>
              Currently working as a{" "}
              <span className="text-emerald-300 font-medium">Full Stack Developer</span>{" "}
              at Rlogical Techsoft, I serve as the primary technical point of
              contact for international clients — translating business
              requirements into clear milestones and consistently delivering on
              time.
            </p>
            <p>
              I love working on the{" "}
              <span className="text-emerald-300 font-medium">full slice</span> of a
              product — from polished SSR frontends to performant APIs,
              payment integrations, search, caching and deployment.
            </p>

            <div className="pt-4">
              <div className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                Languages
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <span
                    key={l}
                    className="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/5 text-zinc-300"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3 group-hover:bg-emerald-500/20 transition-colors">
                  <p.icon size={18} className="text-emerald-400" />
                </div>
                <div className="font-display font-semibold text-white mb-1">
                  {p.title}
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
