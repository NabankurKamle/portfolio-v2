import type { Metadata, Viewport } from "next";
import { fontSans, fontMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { person } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${person.name} — ${person.role}`,
    template: `%s — ${person.name}`,
  },
  description: person.bio,
  keywords: [
    "Full Stack Engineer",
    "Frontend Engineer",
    "Backend Development",
    "Full Stack Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "API Development",
    "Motion Design",
    "Design Systems",
    "UI Engineering",
  ],
  authors: [{ name: person.name }],
  creator: person.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${person.name} — ${person.role}`,
    description: person.bio,
    siteName: person.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — ${person.role}`,
    description: person.bio,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: "#08090c",
  width: "device-width",
  initialScale: 1,
};

// Tiny inline script — avoids FOTWT (flash of wrong theme).
// Lives in <head> only, never inside React tree (fixes script warning).
const themeBootstrap =
  `(function(){try{var s=localStorage.getItem('portfolio-theme');` +
  `var t=s?JSON.parse(s).state?.theme:null;` +
  `document.documentElement.setAttribute('data-theme',t||'eclipse')}` +
  `catch(e){document.documentElement.setAttribute('data-theme','eclipse')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="eclipse"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontMono.variable, "antialiased")}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body
        className="grain bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}