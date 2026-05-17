"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useCursorHandlers } from "@/hooks/useCursor";
import { person, socialLinks } from "@/lib/data";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function Word({ word, delay }: { word: string; delay: number }) {
    return (
        <m.span
            className="inline-block"
            initial={{ opacity: 0, y: 48, skewY: 3 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 1, ease: EASE, delay }}
        >
            {word}
        </m.span>
    );
}

export function Hero({ id }: { id: string }) {
    const ref = useRef<HTMLElement>(null);
    const cursorLink = useCursorHandlers("link");

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.6], [0, -80]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.96]);

    const lines = person.tagline.split("\n");

    return (
        <LazyMotion features={domAnimation} strict>
            <section id={id} ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ zIndex: 1 }}>
                <m.div style={{ opacity, y, scale }} className="section-container pt-32 pb-24 md:pt-40">

                    {/* Status badge */}
                    <m.div
                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                        className="inline-flex items-center gap-2 mb-12"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-40" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                        </span>
                        <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
                            {person.available ? "Available for work" : "Currently busy"}
                        </span>
                    </m.div>

                    {/* Headline */}
                    <div className="mb-8 overflow-hidden">
                        <h1 className="text-hero font-sans font-[500] text-[var(--text-primary)] leading-[0.9] tracking-[-0.05em]">
                            {["Software", "Engineer."].map((w, i) => (
                                <span key={w} className="block overflow-hidden">
                                    <Word word={w} delay={0.3 + i * 0.12} />
                                </span>
                            ))}
                        </h1>
                    </div>

                    {/* Tagline */}
                    <div className="max-w-xl mb-12">
                        {lines.map((line, i) => (
                            <m.p
                                key={i}
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: EASE, delay: 0.6 + i * 0.1 }}
                                className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-light"
                            >
                                {line}
                            </m.p>
                        ))}
                    </div>

                    {/* Actions */}
                    <m.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
                        className="flex items-center gap-4 flex-wrap"
                    >
                        <MagneticButton
                            onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
                            className="btn-cinema btn-cinema-primary px-6 py-3 rounded-xl text-sm"
                        >
                            View Work <span className="opacity-60 ml-1">→</span>
                        </MagneticButton>
                        <MagneticButton
                            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                            className="btn-cinema btn-cinema-ghost px-6 py-3 rounded-xl text-sm"
                        >
                            Get in Touch
                        </MagneticButton>
                    </m.div>

                    {/* Socials */}
                    <m.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
                        className="flex flex-wrap  items-center gap-6 mt-16"
                    >
                        <span className="divider w-8 flex-shrink-0" />
                        {socialLinks.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase hover:text-[var(--text-primary)] transition-colors duration-300"
                                {...cursorLink}
                            >
                                {s.label}
                            </a>
                        ))}
                    </m.div>
                </m.div>

                {/* Scroll indicator */}
                <m.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="font-mono text-[10px] tracking-widest text-[var(--text-tertiary)] uppercase">Scroll</span>
                    <m.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-10 bg-gradient-to-b from-[var(--border)] to-transparent"
                    />
                </m.div>

                {/* Corner meta */}
                <m.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute bottom-10 right-8 md:right-16 hidden md:flex flex-col items-end gap-1"
                >
                    <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-widest uppercase">{person.location}</span>
                    <span className="font-mono text-[10px] text-[var(--text-tertiary)] tracking-widest uppercase">{new Date().getFullYear()}</span>
                </m.div>
            </section>
        </LazyMotion>
    );
}