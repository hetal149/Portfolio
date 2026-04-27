import React, { useEffect, useState } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { navLinks, personalInfo } from "../mock";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono text-emerald-400 text-sm font-semibold group-hover:bg-emerald-500/20 transition-colors">
            {personalInfo.firstName[0]}
            {personalInfo.lastName[0]}
          </div>
          <span className="font-display text-white font-semibold tracking-tight">
            {personalInfo.firstName}
            <span className="text-emerald-400">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <span className="font-mono text-emerald-500/60 mr-1">0{i + 1}.</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-white/5 transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-white/5 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium"
          >
            <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </Button>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0b]">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                <span className="font-mono text-emerald-500/60 mr-2">0{i + 1}.</span>
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950"
            >
              <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer">
                Resume
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
