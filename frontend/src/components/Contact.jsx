import React, { useState } from "react";
import axios from "axios";
import { personalInfo } from "../mock";
import { SectionHeader } from "./About";
import { Mail, MapPin, Phone, Linkedin, Github, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    if (form.message.trim().length < 10) {
      toast.error("Message should be at least 10 characters.");
      return;
    }
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/contact`, {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject?.trim() || null,
        message: form.message.trim(),
      });
      if (data?.email_sent) {
        toast.success("Message sent successfully!", {
          description: `Thanks ${form.name}, I'll get back to you soon.`,
        });
      } else {
        toast.success("Message received!", {
          description: "I've got your message saved and will reach out soon.",
        });
      }
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      const detail = err?.response?.data?.detail;
      toast.error("Could not send message", {
        description:
          typeof detail === "string"
            ? detail
            : "Please try again in a moment or email me directly.",
      });
    } finally {
      setSending(false);
    }
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
    { icon: MapPin, label: "Location", value: personalInfo.location },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/hetal-patil", href: personalInfo.linkedin },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-x-0 top-0 h-96 radial-fade opacity-70 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionHeader
          num="06"
          title="Get In Touch"
          subtitle="Have a project, opportunity or idea? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="font-display text-xl font-semibold text-white mb-2">
                Let's build something great.
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Whether you need a full-stack build, a performance audit, or just
                want to chat about tech — my inbox is open.
              </p>
            </div>

            <div className="space-y-2">
              {contactItems.map((c) => (
                <a
                  key={c.label}
                  href={c.href || "#"}
                  target={c.href?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.04] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <c.icon size={16} className="text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">
                      {c.label}
                    </div>
                    <div className="text-sm text-zinc-200 truncate">{c.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-zinc-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors text-sm"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-zinc-300 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors text-sm"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 sm:p-8 rounded-xl border border-white/10 bg-white/[0.02] space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="mt-2 bg-zinc-950/50 border-white/10 text-white focus-visible:ring-emerald-500 focus-visible:ring-offset-0 focus-visible:border-emerald-500/50 placeholder:text-zinc-600"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="mt-2 bg-zinc-950/50 border-white/10 text-white focus-visible:ring-emerald-500 focus-visible:ring-offset-0 focus-visible:border-emerald-500/50 placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
                className="mt-2 bg-zinc-950/50 border-white/10 text-white focus-visible:ring-emerald-500 focus-visible:ring-offset-0 focus-visible:border-emerald-500/50 placeholder:text-zinc-600"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, timeline, stack..."
                className="mt-2 bg-zinc-950/50 border-white/10 text-white focus-visible:ring-emerald-500 focus-visible:ring-offset-0 focus-visible:border-emerald-500/50 placeholder:text-zinc-600 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={sending}
              size="lg"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold disabled:opacity-60"
            >
              {sending ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" /> Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
