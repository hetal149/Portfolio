import React from "react";
import { ArrowRight, MapPin, Mail, Download } from "lucide-react";
import { Button } from "./ui/button";
import { personalInfo, stats } from "../mock";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 radial-fade" />
      <div className="absolute top-40 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 fade-up">
            {/* Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-emerald-300">
                Available for new opportunities
              </span>
            </div>

            <p className="font-mono text-sm text-emerald-400 mb-4">
              <span className="text-zinc-500">$</span> whoami
            </p>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4">
              Hetal Patil
              <span className="cursor-blink text-emerald-400">_</span>
            </h1>

            <div className="text-2xl sm:text-3xl font-display font-semibold text-zinc-400 mb-6">
              I build <span className="text-gradient-emerald">scalable full-stack</span>
              <br className="hidden sm:block" />
              web experiences.
            </div>

            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
              A Full Stack Developer with{" "}
              <span className="text-emerald-300 font-medium">4+ years</span> of
              experience shipping production-grade apps with Next.js, React &amp;
              Node.js for clients across UAE, USA, and the UK.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold group"
              >
                <a href="#contact">
                  Get in touch
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-zinc-700 bg-transparent text-zinc-200 hover:bg-white/5 hover:text-emerald-300 hover:border-emerald-500/50"
              >
                <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
                  <Download size={16} className="mr-2" /> Download Resume
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-500" />
                {personalInfo.location}
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Mail size={14} className="text-emerald-500" />
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Code card */}
          <div className="lg:col-span-4 fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/30 to-teal-500/10 rounded-xl blur-lg opacity-60" />
              <div className="relative bg-zinc-950/80 border border-white/10 rounded-xl p-5 font-mono text-[13px] leading-relaxed backdrop-blur">
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 text-xs text-zinc-500">profile.ts</span>
                </div>
                <div className="text-zinc-400">
                  <span className="text-pink-400">const</span>{" "}
                  <span className="text-emerald-300">developer</span>{" "}
                  <span className="text-zinc-500">=</span> {"{"}
                </div>
                <div className="pl-4 text-zinc-400">
                  <div>
                    <span className="text-sky-300">name</span>:{" "}
                    <span className="text-amber-300">'Hetal Patil'</span>,
                  </div>
                  <div>
                    <span className="text-sky-300">role</span>:{" "}
                    <span className="text-amber-300">'Full Stack Dev'</span>,
                  </div>
                  <div>
                    <span className="text-sky-300">stack</span>: [
                    <span className="text-amber-300">'Next.js'</span>,{" "}
                    <span className="text-amber-300">'Node'</span>,{" "}
                    <span className="text-amber-300">'TS'</span>],
                  </div>
                  <div>
                    <span className="text-sky-300">experience</span>:{" "}
                    <span className="text-orange-300">4</span>,
                  </div>
                  <div>
                    <span className="text-sky-300">focus</span>:{" "}
                    <span className="text-amber-300">'scalable apps'</span>,
                  </div>
                  <div>
                    <span className="text-sky-300">available</span>:{" "}
                    <span className="text-emerald-400">true</span>,
                  </div>
                </div>
                <div className="text-zinc-400">{"};"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#0a0a0b] p-5 hover:bg-emerald-500/5 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                {s.value}
              </div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
