import React from "react";
import { personalInfo } from "../mock";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono text-emerald-400 text-sm font-semibold">
            HP
          </div>
          <div className="text-sm text-zinc-500">
            © {year} {personalInfo.name}. Crafted with{" "}
            <Heart size={12} className="inline text-emerald-400 -mt-0.5" fill="currentColor" />{" "}
            using React & Tailwind.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-white/10 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
