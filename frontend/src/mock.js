// Mock data for Hetal Patil's Portfolio

export const personalInfo = {
  name: "Hetal Patil",
  firstName: "Hetal",
  lastName: "Patil",
  title: "Full Stack Developer",
  tagline: "Crafting scalable web experiences with Next.js, React & Node.js",
  bio: "Full Stack Developer with 4+ years of experience specializing in Next.js, React, Node.js, PostgreSQL, MongoDB, REST APIs, Stripe, Docker, and TypeScript. I build and deploy full-stack web applications for clients across UAE, USA, and India — with strong ownership of end-to-end development, API integrations, and performance-driven engineering.",
  location: "Ahmedabad, India",
  email: "hetalpatil149@gmail.com",
  phone: "+91 97144 42108",
  linkedin: "https://linkedin.com/in/hetal-patil",
  github: "https://github.com/hetal-patil",
  resumeUrl: "https://customer-assets.emergentagent.com/job_d82af3b9-0fc5-4cc4-ae54-fa411eb47580/artifacts/wi0z2qxd_Hetal_Patil_Resume.pdf",
  available: true,
};

export const stats = [
  { label: "Years of Experience", value: "4+" },
  { label: "Production Apps Shipped", value: "3+" },
  { label: "International Clients", value: "UAE · USA · UK" },
  { label: "Search Perf. Improved", value: "35-40%" },
];

export const skills = [
  {
    category: "Frontend",
    items: ["Next.js", "React.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Material UI", "Bootstrap"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "NestJS", "Strapi", "Medusa.js"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "APIs & Integrations",
    items: ["Stripe", "Google Maps API", "Meilisearch", "Postcoder", "PostHog", "Brevo", "Omnisend", "Navattic"],
  },
  {
    category: "Cloud & DevOps",
    items: ["Docker", "Git", "GitHub", "Bitbucket", "JIRA"],
  },
  {
    category: "AI & Productivity",
    items: ["GitHub Copilot", "Cursor", "Claude", "ChatGPT", "Gemini"],
  },
];

export const experience = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Rlogical Techsoft Pvt. Ltd.",
    period: "Aug 2023 — Present",
    location: "Ahmedabad, India",
    description:
      "Primary technical point of contact for international clients across UAE, USA, and UK — translating business requirements into clear milestones and consistently delivering projects on time.",
    highlights: [
      "Designed and implemented end-to-end full-stack features using Next.js, React, Node.js, Express, and PostgreSQL across 3+ production applications serving thousands of active users.",
      "Integrated Stripe payment gateway with webhook support, enabling secure and seamless checkout flows across multiple storefronts.",
      "Improved search performance by implementing Meilisearch with Redis caching, reducing average search response time by ~35-40%.",
      "Integrated Google Maps API for real-time delivery address validation, reducing incorrect address submissions significantly.",
    ],
  },
  {
    id: 2,
    role: "Associate Software Developer",
    company: "Krish Compusoft Services",
    period: "Feb 2022 — Aug 2023",
    location: "Ahmedabad, India",
    description:
      "Built and maintained front-end and back-end features for a national-scale service provider platform (NSP) serving thousands of users across the USA.",
    highlights: [
      "Developed server-side rendered pages using Next.js and RESTful APIs using Node.js/Express.js — ensuring high performance under heavy traffic loads.",
      "Maintained sprint deadlines consistently and collaborated with cross-functional teams including Design, QA, and Product.",
      "Participated in regular client feedback loops to address blockers, incorporate feedback, and ensure quality deliverables.",
      "Followed industry best practices under senior mentorship, steadily taking on more independent ownership.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "HeroGo",
    subtitle: "Headless eCommerce Platform",
    description:
      "A fully headless eCommerce storefront architected with Next.js and Medusa.js — decoupled, scalable, and maintainable for high-traffic retail.",
    details: [
      "Integrated Meilisearch + Redis caching for fast, accurate product search.",
      "Implemented Stripe for secure end-to-end payment processing.",
      "Google Maps API for real-time delivery address validation at checkout.",
      "Managed Strapi CMS so non-technical teams could update content independently.",
      "Led direct client communication and coordinated feature releases.",
    ],
    stack: ["Next.js", "Medusa.js", "Strapi", "Meilisearch", "Stripe", "Google Maps", "PostgreSQL", "Redis", "Docker"],
    category: "eCommerce",
    featured: true,
  },
  {
    id: 2,
    name: "NSP",
    subtitle: "National Service Provider Platform",
    description:
      "Full-stack development for a national-scale platform serving thousands of users across the USA — meeting strict client SLAs and sprint deadlines.",
    details: [
      "Server-side rendered pages with Next.js for SEO and performance.",
      "Scalable RESTful APIs using Node.js and Express.js for high-traffic reliability.",
      "Regular client feedback loops to adapt to changing requirements.",
      "Quality deliverables at every sprint cycle.",
    ],
    stack: ["Next.js", "Node.js", "Express.js", "MongoDB"],
    category: "SaaS Platform",
    featured: true,
  },
  {
    id: 3,
    name: "eCard Management System",
    subtitle: "Full-stack eCard App",
    description:
      "A full-stack eCard management application built from scratch — from SSR frontend to the backend API layer.",
    details: [
      "Next.js for server-side rendering and SEO optimization.",
      "Node.js backend with a clean, well-documented API layer.",
      "Translated complex client requirements into maintainable code.",
      "Collaborated with designers for seamless feature integration.",
    ],
    stack: ["Next.js", "Node.js", "MongoDB", "Bootstrap"],
    category: "Web App",
    featured: false,
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering",
    major: "Information Technology",
    institution: "Government Engineering College",
    period: "Jul 2018 — Jun 2022",
  },
];

export const certifications = [
  {
    name: "VSkills Certified ReactJS Developer",
    issuer: "VSkills",
    year: "2023",
  },
];

export const languages = ["English", "Hindi", "Marathi", "Gujarati"];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
