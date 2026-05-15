"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useLenis } from "@/hooks/useScroll";
import { useTheme } from "@/hooks/useTheme";

// Critical path — SSR'd, zero delay
import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/sections/Hero";

// Client-only overlays — never SSR'd (fixes hydration mismatch #4)
const CommandPalette = dynamic(() => import("@/components/layout/CommandPalette").then(m => ({ default: m.CommandPalette })), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/layout/CustomCursor").then(m => ({ default: m.CustomCursor })), { ssr: false });
const BackgroundScene = dynamic(() => import("@/components/three/BackgroundScene").then(m => ({ default: m.BackgroundScene })), { ssr: false });

// Below-fold sections — lazy loaded, code-split per chunk
const About = dynamic(() => import("@/components/sections/About").then(m => ({ default: m.About })));
const Work = dynamic(() => import("@/components/sections/Work").then(m => ({ default: m.Work })));
const Stack = dynamic(() => import("@/components/sections/Stack").then(m => ({ default: m.Stack })));
const Contact = dynamic(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));

function SectionSkeleton() {
  return (
    <div className="py-32 section-container" aria-hidden="true">
      <div className="h-2 w-24 rounded-full bg-[var(--surface-hover)] mb-16" style={{ animation: "shimmer 2s linear infinite", backgroundImage: "linear-gradient(90deg,var(--surface) 0%,var(--surface-hover) 50%,var(--surface) 100%)", backgroundSize: "200% 100%" }} />
      <div className="h-8 w-80 rounded-lg  bg-[var(--surface-hover)] mb-6" style={{ animation: "shimmer 2s linear infinite 0.1s", backgroundImage: "linear-gradient(90deg,var(--surface) 0%,var(--surface-hover) 50%,var(--surface) 100%)", backgroundSize: "200% 100%" }} />
      <div className="h-4 w-56 rounded-full bg-[var(--surface)]" style={{ animation: "shimmer 2s linear infinite 0.2s", backgroundImage: "linear-gradient(90deg,var(--surface) 0%,var(--surface-hover) 50%,var(--surface) 100%)", backgroundSize: "200% 100%" }} />
    </div>
  );
}

export default function Home() {
  useLenis();
  useTheme();

  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <BackgroundScene />
      <Navigation />
      <main>
        <Hero id="hero" />
        <Suspense fallback={<SectionSkeleton />}><About id="about" /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Work id="work" /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Stack id="stack" /></Suspense>
        <Suspense fallback={<SectionSkeleton />}><Contact id="contact" /></Suspense>
      </main>
    </>
  );
}