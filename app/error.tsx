"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("[Portfolio Error]", error);
    }, [error]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-primary)] overflow-hidden">
            {/* Atmospheric background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: "radial-gradient(ellipse, rgba(255,80,80,0.06) 0%, transparent 70%)",
                        filter: "blur(60px)",
                        animation: "glow-pulse 4s ease-in-out infinite",
                    }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] rounded-full"
                    style={{
                        background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
                        filter: "blur(80px)",
                        opacity: 0.3,
                    }}
                />
            </div>

            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

            <div className="relative section-container flex flex-col items-start max-w-2xl">

                {/* Error code */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex items-center gap-3 mb-8"
                >
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{
                            backgroundColor: "rgba(255,80,80,0.8)",
                            boxShadow: "0 0 8px rgba(255,80,80,0.4)",
                            animation: "glow-pulse 2s ease-in-out infinite",
                        }}
                    />
                    <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
                        500 — Runtime Error
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                    className="text-display font-display font-[450] text-[var(--text-primary)] leading-[0.95] tracking-[-0.04em] mb-6"
                >
                    Something{" "}
                    <span className="text-[var(--text-secondary)]">broke.</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                    className="text-base text-[var(--text-secondary)] leading-relaxed mb-4 max-w-md"
                >
                    An unexpected error occurred. This has been noted. Try refreshing — it usually resolves itself.
                </motion.p>

                {/* Error digest */}
                {error.digest && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                        className="font-mono text-[10px] tracking-wider text-[var(--text-tertiary)] mb-10 px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)]"
                    >
                        digest: {error.digest}
                    </motion.p>
                )}
                {!error.digest && <div className="mb-10" />}

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
                    className="flex items-center gap-4"
                >
                    <button
                        onClick={reset}
                        className="btn-cinema btn-cinema-primary px-6 py-3 rounded-xl text-sm"
                    >
                        Try again
                        <span className="ml-2 opacity-60">↺</span>
                    </button>
                    <button
                        onClick={() => (window.location.href = "/")}
                        className="btn-cinema btn-cinema-ghost px-6 py-3 rounded-xl text-sm"
                    >
                        Go home
                    </button>
                </motion.div>

                {/* Bottom meta */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.6 }}
                    className="absolute bottom-12 left-0 right-0 px-[clamp(1.5rem,5vw,6rem)]"
                >
                    <div className="divider mb-6" />
                    <p className="font-mono text-[10px] tracking-widest text-[var(--text-tertiary)] uppercase">
                        If the problem persists,{" "}
                        <a
                            href="mailto:nabankurkamle@gmail.com"
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 underline underline-offset-2"
                        >
                            get in touch
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}