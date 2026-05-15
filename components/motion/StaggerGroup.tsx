"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView, type Variants } from "framer-motion";

interface StaggerGroupProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    once?: boolean;
    threshold?: number;
}

const containerVariants: Variants = {
    hidden: {},
    visible: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

export const staggerItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export function StaggerGroup({ children, className, staggerDelay = 0.08, once = true, threshold = 0.08 }: StaggerGroupProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once, amount: threshold });

    return (
        <LazyMotion features={domAnimation} strict>
            <m.div
                ref={ref}
                className={className}
                variants={containerVariants}
                custom={staggerDelay}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {children}
            </m.div>
        </LazyMotion>
    );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return <m.div className={className} variants={staggerItemVariants}>{children}</m.div>;
}