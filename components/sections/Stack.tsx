"use client";

import { m } from "framer-motion";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { stackHighlights } from "@/lib/data";

const categoryColors: Record<string, string> = {
    Framework: "var(--accent)",
    Motion: "var(--accent)",
    Language: "var(--text-secondary)",
    Styling: "var(--text-accent)",
    State: "var(--text-tertiary)",
};

export function Stack({ id }: { id: string }) {
    return (
        <section
            id={id}
            className="relative py-32 md:py-48"
            style={{ zIndex: 1 }}
        >
            <div className="section-container">

                {/* ── Section label ─────────────────────────────────────── */}
                <RevealOnScroll>
                    <div className="flex items-center gap-4 mb-20">
                        <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
                            03 — Stack
                        </span>
                        <span className="divider flex-1 max-w-16" />
                    </div>
                </RevealOnScroll>

                {/* ── Main grid ─────────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24">

                    {/* Left — philosophy */}
                    <RevealOnScroll delay={0.1}>
                        <h2 className="text-headline font-display font-[450] text-[var(--text-primary)] leading-tight mb-8">
                            Tools chosen for{" "}
                            <span className="text-[var(--text-secondary)]">
                                intentional reasons.
                            </span>
                        </h2>
                        <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-4">
                            Every tool in my stack was selected because it either enables better experiences for users or better developer ergonomics that translate to shipping quality faster.
                        </p>
                        <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                            I value composability over completeness, correctness over speed, and restraint over feature maximalism.
                        </p>
                    </RevealOnScroll>

                    {/* Right — principles */}
                    <div className="space-y-6">
                        {[
                            { n: "01", title: "Type-safe by default", body: "Strict TypeScript everywhere. Types as documentation, as contracts, as design." },
                            { n: "02", title: "Motion as communication", body: "Animation should carry meaning. Every transition communicates hierarchy or causality." },
                            { n: "03", title: "Performance is UX", body: "Bundle size discipline, lazy loading strategy, and render budget awareness at every layer." },
                        ].map((p, i) => (
                            <RevealOnScroll key={p.n} delay={0.1 + i * 0.1}>
                                <div className="flex gap-5 p-5 rounded-xl surface-card">
                                    <span className="font-mono text-xs text-[var(--text-tertiary)] mt-0.5 flex-shrink-0">
                                        {p.n}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--text-primary)] mb-1.5">
                                            {p.title}
                                        </p>
                                        <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
                                            {p.body}
                                        </p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>

                {/* ── Stack highlights grid ──────────────────────────────── */}
                <RevealOnScroll delay={0.1} className="mb-10">
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
                            Primary tools
                        </span>
                        <span className="divider flex-1 max-w-12" />
                    </div>
                </RevealOnScroll>

                <StaggerGroup
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-subtle)] rounded-2xl overflow-hidden"
                    staggerDelay={0.07}
                >
                    {stackHighlights.map((item) => (
                        <StaggerItem key={item.name}>
                            <m.div
                                whileHover={{ backgroundColor: "var(--surface-hover)" }}
                                transition={{ duration: 0.2 }}
                                className="p-6 bg-[var(--surface)] flex flex-col gap-3 h-full"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-[var(--text-primary)]">
                                        {item.name}
                                    </h3>
                                    <span
                                        className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                                        style={{
                                            color: categoryColors[item.category] ?? "var(--text-tertiary)",
                                            borderColor: `color-mix(in srgb, ${categoryColors[item.category] ?? "var(--text-tertiary)"} 30%, transparent)`,
                                        }}
                                    >
                                        {item.category}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                                    {item.description}
                                </p>
                            </m.div>
                        </StaggerItem>
                    ))}
                </StaggerGroup>
            </div>
        </section>
    );
}