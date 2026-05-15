"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView, type Variants } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
    once?: boolean;
    threshold?: number;
}

const makeVariants = (dir: string, dist: number): Variants => {
    const offset = {
        up: { y: dist }, down: { y: -dist },
        left: { x: dist }, right: { x: -dist },
        none: {},
    };
    return {
        hidden: { opacity: 0, ...(offset[dir as keyof typeof offset] ?? {}) },
        visible: { opacity: 1, x: 0, y: 0 },
    };
};

export function RevealOnScroll({
    children, className,
    delay = 0, duration = 0.75, direction = "up", distance = 28, once = true, threshold = 0.1,
}: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once, amount: threshold });
    const variants = makeVariants(direction, distance);

    return (
        <LazyMotion features={domAnimation} strict>
            <m.div
                ref={ref}
                className={className}
                variants={variants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </m.div>
        </LazyMotion>
    );
}