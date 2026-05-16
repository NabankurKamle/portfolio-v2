"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useCursorHandlers } from "@/hooks/useCursor";
import { person, socialLinks } from "@/lib/data";

export function Contact({ id }: { id: string }) {
    const [copied, setCopied] = useState(false);
    const cursorLink = useCursorHandlers("link");
    const cursorBtn = useCursorHandlers("button");

    const copyEmail = async () => {
        await navigator.clipboard.writeText(person.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            id={id}
            className="relative py-32 md:py-48 overflow-hidden"
            style={{ zIndex: 1 }}
        >
            {/* Ambient glow */}
            <div
                className="glow-orb w-[600px] h-[400px] -bottom-32 left-1/2 -translate-x-1/2"
                style={{ backgroundColor: "var(--accent)", opacity: 0.04 }}
            />

            <div className="section-container relative">

                {/* ── Section label ─────────────────────────────────────── */}
                <RevealOnScroll>
                    <div className="flex items-center gap-4 mb-20">
                        <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
                            04 — Contact
                        </span>
                        <span className="divider flex-1 max-w-16" />
                    </div>
                </RevealOnScroll>

                {/* ── CTA headline ──────────────────────────────────────── */}
                <div className="max-w-4xl mb-16">
                    <RevealOnScroll delay={0.1}>
                        <h2 className="text-display font-display font-[450] text-[var(--text-primary)] leading-[0.95] tracking-[-0.04em] mb-8">
                            Let&apos;s build something{" "}
                            <span className="text-[var(--text-secondary)]">
                                worth remembering.
                            </span>
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2}>
                        <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
                            I&apos;m open to full-time roles, contract engagements, and interesting conversations. If you&apos;re building something with craft and ambition, reach out.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* ── Email + actions ───────────────────────────────────── */}
                <RevealOnScroll delay={0.3} className="mb-20">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

                        {/* Email display */}
                        <button
                            onClick={copyEmail}
                            className="group flex items-center gap-3 glass rounded-xl px-5 py-3.5 transition-all duration-300 hover:border-[var(--border-strong)]"
                            {...cursorBtn}
                        >
                            <span className="text-sm text-[var(--text-primary)]">
                                {person.email}
                            </span>
                            <m.span
                                key={copied ? "check" : "copy"}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="font-mono text-[10px] tracking-widest text-[var(--text-tertiary)] uppercase"
                            >
                                {copied ? "Copied ✓" : "Copy"}
                            </m.span>
                        </button>

                        <MagneticButton
                            href={`mailto:${person.email}`}
                            className="btn-cinema btn-cinema-primary rounded-xl text-sm px-6 py-3.5"
                        >
                            Send Email
                            <span className="opacity-60 ml-1">→</span>
                        </MagneticButton>
                    </div>
                </RevealOnScroll>

                {/* ── Divider ───────────────────────────────────────────── */}
                <RevealOnScroll>
                    <div className="divider mb-16" />
                </RevealOnScroll>

                {/* ── Footer ────────────────────────────────────────────── */}
                <RevealOnScroll delay={0.1}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

                        {/* Left — name + credit */}
                        <div>
                            <p className="font-mono text-xs text-[var(--text-tertiary)] tracking-widest uppercase mb-1">
                                {person.name}
                            </p>
                            <p className="font-mono text-[10px] text-[var(--text-tertiary)] opacity-50">
                                Designed &amp; built with intention · {new Date().getFullYear()}
                            </p>
                        </div>

                        {/* Center — socials */}
                        <div className="flex flex-wrap items-center gap-6">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-[10px] tracking-widest text-[var(--text-tertiary)] uppercase hover:text-[var(--text-primary)] transition-colors duration-300"
                                    {...cursorLink}
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>

                        {/* Right — back to top */}
                        <MagneticButton
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="font-mono text-[10px] tracking-widest text-[var(--text-tertiary)] uppercase hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-2"
                        >
                            Back to top ↑
                        </MagneticButton>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}