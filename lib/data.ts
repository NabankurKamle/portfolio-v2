import type { Project, Experience, Skill, NavLink, SocialLink } from "@/types";

// ─── Personal Info ──────────────────────────────────────────────────
export const person = {
    name: "Nabankur Kamle",
    role: "Software Engineer & Creative Developer",
    tagline:
        "Crafting immersive digital products\nthrough scalable systems, cinematic motion, and modern engineering.",
    bio: "I build full stack digital experiences that combine scalable engineering with refined visual design. My work focuses on frontend architecture, backend systems, motion-driven interfaces, and building products that feel immersive, fast, and deeply intentional.",
    location: "Kolkata, India",
    available: true,
    email: "nabankurkamle@gmail.com",
    resume: "/resume.pdf",
} as const;

// ─── Navigation ─────────────────────────────────────────────────────
export const navLinks: NavLink[] = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
];

// ─── Socials ─────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/NabankurKamle",
        icon: "FaGithub",
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/nabankurkamle",
        icon: "FaLinkedin",
    },
    {
        label: "Twitter",
        href: "https://twitter.com/KamleNabankur",
        icon: "FaSquareXTwitter",
    },
    {
        label: "Instagram",
        href: "https://instagram.com/rambler_ghost",
        icon: "FaInstagram",
    },
    {
        label: "PlayStation",
        href: "https://profile.playstation.com/decent_ghost69",
        icon: "FaPlaystation",
    },
];

// ─── Projects ────────────────────────────────────────────────────────
export const projects: Project[] = [
    {
        id: "astrava",
        index: "01",
        title: "Astrava",
        subtitle: "Cinematic productivity platform",
        description:
            "An immersive productivity and focus platform centered around deep work, atmospheric interaction design, cinematic motion systems, and scalable premium UI architecture with strong emphasis on visual rhythm and user experience.",
        tags: [
            "Next.js",
            "TypeScript",
            "Framer Motion",
            "Tailwind CSS",
            "Zustand",
        ],
        year: "2026",
        status: "WIP",
        link: "https://example.com",
        github: "https://github.com/yourusername",
        featured: true,
        color: "#8aaeff",
        metrics: [
            { label: "Motion systems", value: "25+" },
            { label: "Reusable components", value: "80+" },
            { label: "Design iterations", value: "120+" },
        ],
    },

    {
        id: "317am",
        index: "02",
        title: "3:17AM - Midnight Archive",
        subtitle: "Late-night creative experience",
        description:
            "An experimental digital experience exploring solitude, creativity, and late-night focus through cinematic layouts, immersive storytelling, editorial typography, layered transitions, and emotionally driven interaction systems.",
        tags: [
            "TypeScript",
            "JavaScript",
            "NodeJS",
            "ExpressJS",
            "NextJS",
            "Tailwind CSS",
            "NextUI",
            "MongoDB",
        ],
        year: "2026",
        status: "Production",
        link: "https://317am.vercel.app/",
        github: "https://github.com/NabankurKamle/317am",
        featured: true,
        color: "#a78bfa",
        metrics: [
            { label: "Custom animations", value: "40+" },
            { label: "Scenes designed", value: "18" },
            { label: "Interaction layers", value: "12" },
        ],
    },

    {
        id: "pctflex",
        index: "03",
        title: "PCT FLEX",
        subtitle: "Enterprise manufacturing ecosystem",
        description:
            "Currently contributing to large-scale manufacturing solution platforms at Paapri Cloud Technologies with focus on scalable frontend architecture, business workflows, enterprise dashboard systems, API integrations, and maintainable component ecosystems.",
        tags: [
            "ReactJS",
            "NodeJS",
            "ExpressJS",
            "MongoDB",
            "Bootstrap",
            "React Bootstrap",
            "Axios",
        ],
        year: "2026",
        status: "Production",
        link: "https://www.pctflex.com/",
        github: "",
        featured: true,
        color: "#22c55e",
        metrics: [
            { label: "Enterprise modules", value: "25+" },
            { label: "API integrations", value: "40+" },
            { label: "Scalable components", value: "60+" },
        ],
    },

    {
        id: "waxcraft",
        index: "04",
        title: "WaxCraft",
        subtitle: "Jewellery manufacturing management software",
        description:
            "Developed frontend systems for a jewellery manufacturing management platform focused on production workflows, inventory processes, operational tracking, and scalable enterprise-grade management interfaces.",
        tags: [
            "TypeScript",
            "ReactJS",
            "NextJS",
            "Tailwind CSS",
            "ShadCN",
            "ReduxJS",
        ],
        year: "2025",
        status: "Production",
        link: "https://waxcraft.prioritysolutions.in",
        github: "",
        featured: false,
        color: "#f59e0b",
        metrics: [
            { label: "Production workflows", value: "20+" },
            { label: "Management interfaces", value: "35+" },
            { label: "Reusable components", value: "50+" },
        ],
    },

    {
        id: "chilloptix",
        index: "05",
        title: "ChillOptix",
        subtitle: "Cold storage management platform",
        description:
            "Contributed to a cold storage management solution handling inventory tracking, warehouse workflows, operational monitoring, reporting systems, and responsive enterprise dashboard interfaces for large-scale storage operations.",
        tags: [
            "TypeScript",
            "ReactJS",
            "NextJS",
            "ReduxJS",
            "Tailwind CSS",
            "Axios",
        ],
        year: "2025",
        status: "Production",
        link: "https://chilloptix.prioritysolutions.in/",
        github: "",
        featured: false,
        color: "#38bdf8",
        metrics: [
            { label: "Operational modules", value: "15+" },
            { label: "Dashboard systems", value: "8+" },
            { label: "Enterprise workflows", value: "25+" },
        ],
    },

    {
        id: "priobank",
        index: "06",
        title: "PrioBank",
        subtitle: "Cooperative banking management system",
        description:
            "Worked on a cooperative banking management platform focused on account operations, financial workflows, transaction management, and scalable frontend interfaces for internal banking operations during internship tenure at Priority Solutions.",
        tags: [
            "JavaScript",
            "ReactJS",
            "ReduxJS",
            "Tailwind CSS",
            "Axios",
        ],
        year: "2024",
        status: "Production",
        link: "https://priobank.prioritysolutions.in",
        github: "",
        featured: false,
        color: "#4f46e5",
        metrics: [
            { label: "Banking modules", value: "10+" },
            { label: "UI screens", value: "30+" },
            { label: "API integrations", value: "20+" },
        ],
    },


];

// ─── Experience ──────────────────────────────────────────────────────
export const experience: Experience[] = [
    {
        company: "Paapri Cloud Technologies",
        role: "Fullstack Developer",
        period: "August, 2025 — Present",
        description:
            "Building scalable fullstack applications with modern React ecosystems, REST API integrations, backend services, authentication flows, cron-based automation, and responsive UI systems focused on performance and maintainability.",
        tags: [
            "JavaScript",
            "ReactJS",
            "Bootstrap",
            "React Bootstrap",
            "Axios",
            "NodeJS",
            "ExpressJS",
            "Node Cron",
            "MongoDB",
        ],
    },

    {
        company: "Priority Solutions",
        role: "Frontend Developer",
        period: "October, 2024 — July, 2025",
        description:
            "Developed scalable frontend architectures, reusable UI components, dashboard interfaces, and responsive web experiences using modern React and Next.js ecosystems with optimized state management and API handling.",
        tags: [
            "TypeScript",
            "Reactjs",
            "Nextjs",
            "Tailwind CSS",
            "ShadCN",
            "NextUI",
            "Reduxjs",
            "Axios",
        ],
    },

    {
        company: "Priority Solutions",
        role: "Frontend Developer Intern",
        period: "July, 2024 — September, 2024",
        description:
            "Contributed to frontend development workflows by building responsive interfaces, integrating APIs, improving component reusability, and collaborating on modern React-based application features and UI systems.",
        tags: [
            "JavaScript",
            "Reactjs",
            "Tailwind CSS",
            "ShadCN",
            "Reduxjs",
            "Axios",
        ],
    },
];

// ─── Skills ──────────────────────────────────────────────────────────
export const skills: Skill[] = [
    {
        category: "Core",
        items: [
            "TypeScript",
            "JavaScript",
            "React",
            "Next.js",
            "Node.js",
            "Express.js",
        ],
    },
    {
        category: "Frontend",
        items: [
            "Tailwind CSS",
            "HeroUI",
            "shadcn/ui",
            "Framer Motion",
            "GSAP",
            "Responsive Design",
        ],
    },
    {
        category: "Backend",
        items: [
            "REST APIs",
            "Authentication",
            "MongoDB",
            "PostgreSQL",
            "Prisma",
            "Mongoose",
        ],
    },
    {
        category: "Architecture",
        items: [
            "Full Stack Architecture",
            "Design Systems",
            "Component Architecture",
            "API Design",
            "Performance Optimization",
            "Scalable Systems",
        ],
    },
    {
        category: "Tools",
        items: [
            "Git",
            "GitHub",
            "Postman",
            "Figma",
            "Turborepo",
            "VS Code",
        ],
    },
];
// ─── Stack Highlights ────────────────────────────────────────────────
export const stackHighlights = [
    {
        name: "Next.js",
        description:
            "Building scalable full-stack applications with App Router, server actions, and modern rendering architecture.",
        category: "Framework",
    },
    {
        name: "Node.js",
        description:
            "Designing backend systems, APIs, authentication flows, and scalable server-side architecture.",
        category: "Backend",
    },
    {
        name: "TypeScript",
        description:
            "End-to-end type safety across frontend interfaces, backend services, and shared application logic.",
        category: "Language",
    },
    {
        name: "MongoDB",
        description:
            "Schema-driven database architecture with optimized querying and scalable document modeling.",
        category: "Database",
    },
    {
        name: "Framer Motion",
        description:
            "Crafting immersive interaction systems with cinematic motion and smooth physics-driven animation.",
        category: "Motion",
    },
    {
        name: "Tailwind CSS",
        description:
            "Utility-first styling architecture for scalable UI systems and consistent design implementation.",
        category: "Styling",
    },
];

// ─── Themes ──────────────────────────────────────────────────────────
export const themes = [
    {
        id: "eclipse",
        label: "Eclipse",
        description: "Deep cinematic dark",
        color: "#8aaeff",
    },
    {
        id: "polar",
        label: "Polar",
        description: "Luxury editorial white",
        color: "#2650d8",
    },
    {
        id: "ember",
        label: "Ember",
        description: "Warm cinematic atmosphere",
        color: "#f0a060",
    },
    {
        id: "mono",
        label: "Mono",
        description: "Architectural monochrome",
        color: "#c8c8c8",
    },
] as const;

export type ThemeId = (typeof themes)[number]["id"];