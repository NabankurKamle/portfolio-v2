"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, } from "framer-motion";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { useCursorHandlers } from "@/hooks/useCursor";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

function ProjectCard({ project }: { project: Project }) {
    const [hovered, setHovered] = useState(false);
    const {
        onMouseEnter: cursorEnter,
        onMouseLeave: cursorLeave,
    } = useCursorHandlers("link", "view");

    return (
        <LazyMotion features={domAnimation} strict>
            <StaggerItem>
                <m.article
                    onMouseEnter={(e) => {
                        setHovered(true);
                        cursorEnter?.();
                    }}
                    onMouseLeave={(e) => {
                        setHovered(false);
                        cursorLeave?.();
                    }}
                    className="group relative border-t border-[var(--border-subtle)] hover:border-[var(--border)] transition-colors duration-500"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-0 lg:gap-16 py-10 lg:py-14">

                        {/* Index */}
                        <div className="hidden lg:flex flex-col justify-between w-12">
                            <span className="font-mono text-xs text-[var(--text-tertiary)]">{project.index}</span>
                            <span className="w-2 h-2 rounded-full transition-opacity duration-500"
                                style={{ backgroundColor: project.color, opacity: hovered ? 1 : 0.3 }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="lg:hidden font-mono text-xs text-[var(--text-tertiary)]">{project.index}</span>
                                        <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                                            style={{ color: project.color, borderColor: `${project.color}40`, backgroundColor: `${project.color}10` }}>
                                            {project.status}
                                        </span>
                                        <span className="font-mono text-[10px] text-[var(--text-tertiary)]">{project.year}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-sans font-[500] text-[var(--text-primary)] tracking-tight mb-1">{project.title}</h3>
                                    <p className="text-sm text-[var(--text-tertiary)]">{project.subtitle}</p>
                                </div>
                            </div>

                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">{project.description}</p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map(tag => (
                                    <span key={tag} className="font-mono text-[10px] tracking-wider text-[var(--text-tertiary)] uppercase px-2 py-1 rounded border border-[var(--border-subtle)]">{tag}</span>
                                ))}
                            </div>

                            {project.metrics.length > 0 && (
                                <div className="flex gap-8">
                                    {project.metrics.map(m2 => (
                                        <div key={m2.label}>
                                            <p className="text-lg font-sans font-[500] tracking-tight" style={{ color: project.color }}>{m2.value}</p>
                                            <p className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-widest uppercase">{m2.label}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className="flex lg:flex-col items-start lg:items-end gap-3 pt-1">
                            {project.link && (
                                <m.a href={project.link} target="_blank" rel="noopener noreferrer"
                                    animate={{ opacity: hovered ? 1 : 0.4 }} transition={{ duration: 0.3 }}
                                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    onClick={e => e.stopPropagation()}>
                                    Live ↗
                                </m.a>
                            )}
                            {project.github && (
                                <m.a href={project.github} target="_blank" rel="noopener noreferrer"
                                    animate={{ opacity: hovered ? 1 : 0.4 }} transition={{ duration: 0.3 }}
                                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                    onClick={e => e.stopPropagation()}>
                                    GitHub ↗
                                </m.a>
                            )}
                        </div>
                    </div>

                    {/* Hover accent */}
                    <m.div className="absolute left-1 top-0 bottom-0 w-px"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: "top", backgroundColor: project.color }}
                    />
                </m.article>
            </StaggerItem>
        </LazyMotion>
    );
}

export function Work({ id }: { id: string }) {
    const [showAll, setShowAll] = useState(false);
    const featured = projects.filter(p => p.featured);
    const rest = projects.filter(p => !p.featured);
    const displayed = showAll ? projects : featured;

    return (
        <section id={id} className="relative py-32 md:py-48" style={{ zIndex: 1 }}>
            <div className="section-container">
                <RevealOnScroll>
                    <div className="flex items-center justify-between mb-20">
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">02 — Work</span>
                            <span className="divider flex-1 max-w-16" />
                        </div>
                        <span className="font-mono text-xs text-[var(--text-tertiary)]">{projects.length} projects</span>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1} className="mb-20">
                    <h2 className="text-display font-sans font-[500] text-[var(--text-primary)] leading-[0.95] tracking-[-0.04em] max-w-3xl">
                        Selected <span className="text-[var(--text-secondary)]">projects & systems.</span>
                    </h2>
                </RevealOnScroll>

                <StaggerGroup staggerDelay={0.1} className="mb-12">
                    {displayed.map((project, i) => <ProjectCard key={project.id} project={project} />)}
                </StaggerGroup>

                <div className="divider mb-12" />

                {rest.length > 0 && (
                    <RevealOnScroll>
                        <button onClick={() => setShowAll(!showAll)} className="btn-cinema btn-cinema-ghost rounded-xl text-sm px-5 py-2.5">
                            {showAll ? "Show less ↑" : `Show ${rest.length} more ↓`}
                        </button>
                    </RevealOnScroll>
                )}
            </div>
        </section>
    );
}