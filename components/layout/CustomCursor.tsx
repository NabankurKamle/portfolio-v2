"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursorStore } from "@/hooks/useCursor";
import { cn } from "@/lib/utils";

const SPRING = { stiffness: 500, damping: 40, mass: 0.3 };
const SPRING_SLOW = { stiffness: 200, damping: 30, mass: 0.5 };

const variantStyles: Record<string, string> = {
    default: "w-4 h-4 border border-[var(--text-secondary)] bg-transparent",
    text: "w-1 h-8 rounded-full bg-[var(--text-primary)]",
    link: "w-8 h-8 border-2 border-[var(--accent)] bg-[var(--accent-dim)]",
    button: "w-12 h-12 border border-[var(--border-glow)] bg-[var(--accent-dim)]",
    project: "w-20 h-20 border border-[var(--border-glow)] bg-[var(--surface-glass)] backdrop-blur-md",
    drag: "w-16 h-16 border-2 border-[var(--accent)] bg-[var(--accent-dim)]",
    hidden: "opacity-0 w-0 h-0",
};

function CursorInner() {
    const { x, y, variant, label, isVisible } = useCursorStore();

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const dotX = useSpring(mx, SPRING);
    const dotY = useSpring(my, SPRING);
    const ringX = useSpring(mx, SPRING_SLOW);
    const ringY = useSpring(my, SPRING_SLOW);

    useEffect(() => { mx.set(x); my.set(y); }, [x, y, mx, my]);

    useEffect(() => {
        document.body.style.cursor = "none";
        return () => { document.body.style.cursor = ""; };
    }, []);

    return (
        <div
            className="hidden md:block fixed inset-0 pointer-events-none"
            style={{ zIndex: 9999 }}
            aria-hidden="true"
        >
            {/* Dot */}
            <motion.div
                className="absolute rounded-full bg-[var(--text-primary)]"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: variant === "text" ? 3 : 6,
                    height: variant === "text" ? 3 : 6,
                    opacity: isVisible ? 1 : 0,
                    transition: "width 0.3s, height 0.3s",
                }}
            />

            {/* Ring */}
            <motion.div
                className={cn(
                    "absolute rounded-full transition-all duration-300 ease-[var(--ease-cinematic)]",
                    variantStyles[variant] ?? variantStyles.default
                )}
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
            >
                {variant === "project" && label && (
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono tracking-widest text-[var(--text-secondary)] uppercase">
                        {label}
                    </span>
                )}
                {variant === "drag" && (
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono tracking-widest text-[var(--text-accent)] uppercase">
                        Drag
                    </span>
                )}
            </motion.div>
        </div>
    );
}

export function CustomCursor() {
    // Fix #4: never render on server; only mount after first client paint.
    // This eliminates the server/client HTML mismatch entirely.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return <CursorInner />;
}