"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
    href?: string;
    disabled?: boolean;
}

export function MagneticButton({ children, className, strength = 0.3, onClick, href, disabled }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const rawX = useSpring(0, { stiffness: 280, damping: 22 });
    const rawY = useSpring(0, { stiffness: 280, damping: 22 });
    const innerX = useTransform(rawX, (v) => v * 0.45);
    const innerY = useTransform(rawY, (v) => v * 0.45);

    const onMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        rawX.set((e.clientX - r.left - r.width / 2) * strength);
        rawY.set((e.clientY - r.top - r.height / 2) * strength);
    };
    const onLeave = () => { rawX.set(0); rawY.set(0); };

    const Tag = href ? "a" : "button";

    return (
        <LazyMotion features={domAnimation} strict>
            <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative inline-flex">
                <m.div style={{ x: rawX, y: rawY }}>
                    <Tag
                        {...(href ? { href } : {})}
                        {...(onClick ? { onClick } : {})}
                        {...(disabled ? { disabled } : {})}
                        className={cn("relative inline-flex items-center justify-center transition-all duration-300", disabled && "pointer-events-none opacity-40", className)}
                    >
                        <m.span className="relative z-10 flex items-center gap-2" style={{ x: innerX, y: innerY }}>
                            {children}
                        </m.span>
                    </Tag>
                </m.div>
            </div>
        </LazyMotion>
    );
}