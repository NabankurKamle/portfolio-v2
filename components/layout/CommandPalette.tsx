"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import * as FaIcons from "react-icons/fa6";

import { useThemeStore } from "@/stores/theme.store";
import { registerPaletteOpener } from "./Navigation";
import { themes, navLinks, socialLinks, person } from "@/lib/data";
import { cn } from "@/lib/utils";

interface CommandItem {
    id: string;
    label: string;
    description?: string;
    group: string;
    icon: string;
    action: () => void;
    shortcut?: string;
}

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [idx, setIdx] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLButtonElement>(null);

    const { setTheme } = useThemeStore();

    const close = useCallback(() => {
        setOpen(false);
        setQuery("");
        setIdx(0);
    }, []);

    useEffect(() => {
        registerPaletteOpener(() => setOpen(true));
    }, []);

    const commands: CommandItem[] = [
        ...navLinks.map((l) => ({
            id: `nav-${l.href}`,
            label: l.label,
            group: "Navigate",
            icon: "FaArrowRight",
            action: () => {
                document
                    .querySelector(l.href)
                    ?.scrollIntoView({ behavior: "smooth" });

                close();
            },
        })),

        ...themes.map((t) => ({
            id: `theme-${t.id}`,
            label: `${t.label} theme`,
            description: t.description,
            group: "Theme",
            icon: "FaCircle",
            action: () => {
                setTheme(t.id);
                close();
            },
        })),

        ...socialLinks.map((s) => ({
            id: `social-${s.label}`,
            label: s.label,
            group: "Links",
            icon: s.icon,
            action: () => {
                window.open(s.href, "_blank");
                close();
            },
        })),

        {
            id: "resume",
            label: "Open Resume",
            group: "Links",
            icon: "FaFileArrowDown",
            // shortcut: "R",
            action: () => {
                window.open(person.resume, "_blank");
                close();
            },
        },

        {
            id: "email",
            label: "Copy Email",
            group: "Contact",
            icon: "FaEnvelope",
            // shortcut: "E",
            action: () => {
                navigator.clipboard.writeText(person.email);
                close();
            },
        },

        {
            id: "top",
            label: "Scroll to Top",
            group: "Navigate",
            icon: "FaArrowUp",
            action: () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });

                close();
            },
        },
    ];


    const filtered = query
        ? commands.filter(
            (c) =>
                c.label.toLowerCase().includes(query.toLowerCase()) ||
                (c.description ?? "")
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                c.group.toLowerCase().includes(query.toLowerCase())
        )
        : commands;

    const groups = filtered.reduce<Record<string, CommandItem[]>>((a, c) => {
        (a[c.group] ??= []).push(c);
        return a;
    }, {});

    const flat = Object.values(groups).flat();

    const run = useCallback((command: CommandItem) => command.action(), []);

    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();

                setOpen((o) => {
                    if (!o) {
                        setQuery("");
                        setIdx(0);
                    }

                    return !o;
                });

                return;
            }

            if (!open) return;

            if (e.key === "Escape") {
                e.preventDefault();
                close();
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setIdx((i) => Math.min(i + 1, flat.length - 1));
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setIdx((i) => Math.max(i - 1, 0));
            }

            if (e.key === "Enter") {
                e.preventDefault();

                if (flat[idx]) run(flat[idx]);
            }
        };

        window.addEventListener("keydown", h);

        return () => window.removeEventListener("keydown", h);
    }, [open, flat, idx, run, close]);

    useEffect(() => {
        setIdx(0);
    }, [query]);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    useEffect(() => {
        activeRef.current?.scrollIntoView({ block: "nearest" });
    }, [idx]);

    let itemIdx = 0;

    return (
        <LazyMotion features={domAnimation} strict>
            <AnimatePresence>
                {open && (
                    <>
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.16 }}
                            className="fixed inset-0 z-[100] bg-[var(--bg-primary)]/60 backdrop-blur-sm"
                            onClick={close}
                        />

                        <m.div
                            initial={{ opacity: 0, scale: 0.96, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -10 }}
                            transition={{
                                duration: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="fixed top-[18vh] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg px-4"
                        >
                            <div className="glass-xl rounded-2xl overflow-hidden flex flex-col max-h-[60vh]">
                                {/* Search bar */}
                                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border-subtle)] flex-shrink-0">
                                    <svg
                                        width="13"
                                        height="13"
                                        viewBox="0 0 13 13"
                                        fill="none"
                                        className="text-[var(--text-tertiary)] flex-shrink-0"
                                    >
                                        <circle
                                            cx="5.5"
                                            cy="5.5"
                                            r="4"
                                            stroke="currentColor"
                                            strokeWidth="1.3"
                                        />
                                        <path
                                            d="M9 9L11.5 11.5"
                                            stroke="currentColor"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search commands…"
                                        className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] text-sm outline-none"
                                    />

                                    <kbd className="font-mono text-[10px] text-[var(--text-tertiary)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)] flex-shrink-0">
                                        ESC
                                    </kbd>
                                </div>

                                {/* Results */}
                                <div
                                    ref={listRef}
                                    className="overflow-y-auto overscroll-contain py-2 flex-1 min-h-0"
                                    style={{ scrollbarWidth: "none" }}
                                >
                                    {Object.entries(groups).map(
                                        ([group, items]) => (
                                            <div key={group}>
                                                <p className="px-4 pt-3 pb-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--text-tertiary)] sticky top-0 bg-[var(--surface-glass)] backdrop-blur-sm">
                                                    {group}
                                                </p>

                                                {items.map((item) => {
                                                    const ci = itemIdx++;

                                                    const isActive =
                                                        ci === idx;

                                                    const Icon =
                                                        FaIcons[
                                                        item.icon as keyof typeof FaIcons
                                                        ];

                                                    return (
                                                        <button
                                                            key={item.id}
                                                            ref={
                                                                isActive
                                                                    ? activeRef
                                                                    : undefined
                                                            }
                                                            onMouseEnter={() =>
                                                                setIdx(ci)
                                                            }
                                                            onClick={() =>
                                                                run(item)
                                                            }
                                                            className={cn(
                                                                "w-full flex items-center gap-3 px-4 py-2.5",
                                                                "text-left transition-colors duration-100",
                                                                isActive
                                                                    ? "bg-[var(--surface-hover)] text-[var(--text-primary)]"
                                                                    : "text-[var(--text-secondary)]"
                                                            )}
                                                        >
                                                            <span className="w-4 h-4 flex items-center justify-center text-[var(--text-tertiary)] flex-shrink-0">
                                                                {Icon && (
                                                                    <Icon className="text-xs" />
                                                                )}
                                                            </span>

                                                            <span className="flex-1 text-sm truncate">
                                                                {item.label}
                                                            </span>

                                                            {item.description && (
                                                                <span className="text-xs text-[var(--text-tertiary)] truncate max-w-[120px]">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </span>
                                                            )}

                                                            {item.shortcut && (
                                                                <kbd className="font-mono text-[10px] text-[var(--text-tertiary)] px-1.5 py-0.5 rounded border border-[var(--border-subtle)] flex-shrink-0">
                                                                    {
                                                                        item.shortcut
                                                                    }
                                                                </kbd>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )
                                    )}

                                    {flat.length === 0 && (
                                        <p className="px-4 py-10 text-center text-sm text-[var(--text-tertiary)]">
                                            No results for &ldquo;{query}
                                            &rdquo;
                                        </p>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-4 py-2.5 border-t border-[var(--border-subtle)] flex-shrink-0">
                                    <p className="font-mono text-[10px] text-[var(--text-tertiary)]">
                                        ↑↓ navigate · ↵ select · esc close
                                    </p>
                                </div>
                            </div>
                        </m.div>
                    </>
                )}
            </AnimatePresence>
        </LazyMotion>
    );
}