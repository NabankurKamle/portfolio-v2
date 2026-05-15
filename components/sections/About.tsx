"use client";

import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { person, experience, skills } from "@/lib/data";

export function About({ id }: { id: string }) {
    return (
        <section
            id={id}
            className="relative py-32 md:py-48"
            style={{ zIndex: 1 }}
        >
            <div className="section-container">

                {/* ── Section label ───────────────────────────────────── */}
                <RevealOnScroll>
                    <div className="flex items-center gap-4 mb-20">
                        <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
                            01 — About
                        </span>
                        <span className="divider flex-1 max-w-16" />
                    </div>
                </RevealOnScroll>

                {/* ── Main grid ───────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-28">

                    {/* Left — headline */}
                    <RevealOnScroll delay={0.1}>
                        <h2 className="text-headline font-display font-[450] text-[var(--text-primary)] text-balance leading-tight">
                            Building at the edge of{" "}
                            <span className="text-[var(--text-secondary)]">
                                engineering and craft.
                            </span>
                        </h2>
                    </RevealOnScroll>

                    {/* Right — bio + detail */}
                    <div className="flex flex-col gap-6">
                        <RevealOnScroll delay={0.2}>
                            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                                {person.bio}
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.3}>
                            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                                I care about the things that are hard to quantify - the feeling of a transition, the weight of a typeface, the moment an interface becomes invisible. Good engineering makes that possible.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.4}>
                            <a
                                href={person.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-cinema btn-cinema-ghost inline-flex w-fit mt-2 rounded-xl text-sm px-5 py-2.5"
                            >
                                Resume
                                <span className="ml-2 opacity-50">↗</span>
                            </a>
                        </RevealOnScroll>
                    </div>
                </div>

                {/* ── Experience timeline ─────────────────────────────── */}
                <RevealOnScroll delay={0.1} className="mb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
                            Experience
                        </span>
                        <span className="divider flex-1 max-w-12" />
                    </div>
                </RevealOnScroll>

                <StaggerGroup className="space-y-0" staggerDelay={0.1}>
                    {experience.map((exp, i) => (
                        <StaggerItem key={exp.company + i}>
                            <div className="group relative grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-16 py-8 border-t border-[var(--border-subtle)] last:border-b hover:border-[var(--border)] transition-colors duration-300">

                                {/* Left */}
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                                        {exp.company}
                                    </p>
                                    <p className="font-mono text-xs text-[var(--text-tertiary)] tracking-wide">
                                        {exp.period}
                                    </p>
                                </div>

                                {/* Right */}
                                <div>
                                    <p className="text-sm font-medium text-[var(--text-secondary)] mb-3">
                                        {exp.role}
                                    </p>
                                    <p className="text-sm text-[var(--text-tertiary)] leading-relaxed mb-4">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono text-[10px] tracking-wider text-[var(--text-tertiary)] uppercase px-2 py-1 rounded border border-[var(--border-subtle)]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Index */}
                                <span className="absolute right-0 top-8 font-mono text-[10px] text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    0{i + 1}
                                </span>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerGroup>

                {/* ── Skills grid ─────────────────────────────────────── */}
                <RevealOnScroll delay={0.1} className="mt-24">
                    <div className="flex items-center gap-4 mb-12">
                        <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
                            Skills
                        </span>
                        <span className="divider flex-1 max-w-12" />
                    </div>
                </RevealOnScroll>

                <StaggerGroup
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px border border-[var(--border-subtle)] rounded-2xl overflow-hidden"
                    staggerDelay={0.06}
                >
                    {skills.map((skill) => (
                        <StaggerItem className="h-full " key={skill.category}>
                            <div className="p-5 bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors duration-300 h-full">
                                <p className="font-mono text-[10px] tracking-widest text-[var(--text-tertiary)] uppercase mb-3">
                                    {skill.category}
                                </p>
                                <ul className="space-y-1.5">
                                    {skill.items.map((item) => (
                                        <li
                                            key={item}
                                            className="text-sm text-[var(--text-secondary)] leading-snug"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerGroup>
            </div>
        </section>
    );
}