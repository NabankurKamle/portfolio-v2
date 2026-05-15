"use client";

import { useState, useCallback } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useScrolledPast } from "@/hooks/useScroll";
import { useThemeStore } from "@/stores/theme.store";
import { useCursorHandlers } from "@/hooks/useCursor";
import { navLinks, themes } from "@/lib/data";
import { cn } from "@/lib/utils";

let _openPalette: (() => void) | null = null;
export function registerPaletteOpener(fn: () => void) { _openPalette = fn; }
export function openCommandPalette() { _openPalette?.(); }

export function Navigation() {
    const scrolled = useScrolledPast(60);
    const { theme, setTheme } = useThemeStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const cursorLink = useCursorHandlers("link");

    const handleNav = useCallback((href: string) => {
        setMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <LazyMotion features={domAnimation} strict>
            <m.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="fixed top-0 left-0 right-0 z-50"
            >
                <div
                    className={cn(
                        "mx-auto my-4 h-14 rounded-2xl px-5 transition-all duration-500",
                        "grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-center",
                        scrolled
                            ? "glass max-w-2xl shadow-glass"
                            : "bg-transparent max-w-5xl"
                    )}
                >
                    {/* Left */}
                    <div className="flex items-center justify-start">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase hover:text-[var(--text-primary)] transition-colors duration-300"
                            {...cursorLink}
                        >
                            Nabankur
                        </button>
                    </div>

                    {/* Center */}
                    <nav className="hidden md:flex items-center justify-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNav(link.href)}
                                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 font-medium"
                                {...cursorLink}
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* Right */}
                    <div className="flex items-center justify-end gap-3">
                        {/* Theme dots */}
                        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-lg border border-[var(--border-subtle)]">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id)}
                                    title={t.label}
                                    className={cn(
                                        "w-3.5 h-3.5 rounded-full transition-all duration-300",
                                        theme === t.id
                                            ? "ring-2 ring-offset-1 ring-offset-transparent ring-[var(--border-strong)] scale-125"
                                            : "opacity-50 hover:opacity-80"
                                    )}
                                    style={{ backgroundColor: t.color }}
                                />
                            ))}
                        </div>

                        {/* ⌘K */}
                        <button
                            onClick={() => openCommandPalette()}
                            className="hidden md:flex items-center gap-1.5 px-3 h-8 rounded-lg glass-sm text-[var(--text-tertiary)] text-xs font-mono hover:text-[var(--text-secondary)] transition-all duration-300"
                            {...cursorLink}
                        >
                            <span>⌘</span>
                            <span>K</span>
                        </button>

                        {/* Mobile burger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden flex flex-col gap-1.5 p-2"
                            aria-label="Menu"
                        >
                            <m.span
                                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="block w-5 h-px bg-[var(--text-primary)]"
                                transition={{ duration: 0.3 }}
                            />

                            <m.span
                                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="block w-5 h-px bg-[var(--text-primary)]"
                                transition={{ duration: 0.3 }}
                            />

                            <m.span
                                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="block w-5 h-px bg-[var(--text-primary)]"
                                transition={{ duration: 0.3 }}
                            />
                        </button>
                    </div>
                </div>
            </m.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <m.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-24 left-4 right-4 z-40 glass rounded-2xl p-6"
                    >
                        <nav className="flex flex-col gap-4">
                            {navLinks.map((link, i) => (
                                <m.button key={link.href}
                                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={() => handleNav(link.href)}
                                    className="text-left text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 py-2 border-b border-[var(--border-subtle)] last:border-0"
                                >
                                    {link.label}
                                </m.button>
                            ))}
                        </nav>
                        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[var(--border-subtle)]">
                            <span className="font-mono text-xs text-[var(--text-tertiary)] mr-2">Theme</span>
                            {themes.map((t) => (
                                <button key={t.id} onClick={() => setTheme(t.id)} title={t.label}
                                    className={cn("w-5 h-5 rounded-full transition-all duration-300", theme === t.id ? "ring-2 ring-offset-1 ring-[var(--border-strong)] scale-110" : "opacity-50")}
                                    style={{ backgroundColor: t.color }}
                                />
                            ))}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}