"use client";

import { useEffect, useRef } from "react";
import { create } from "zustand";
import type { ScrollState } from "@/types";

interface ScrollStore extends ScrollState {
    set: (state: Partial<ScrollState>) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
    y: 0, direction: "down", progress: 0, velocity: 0,
    set: (s) => set(s),
}));

export function useLenis() {
    const { set } = useScrollStore();
    const prevY = useRef(0);
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        let rafId: number;

        const init = async () => {
            const { default: Lenis } = await import("lenis");
            const lenis = new Lenis({
                duration: 1.15,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: 0.9,
                touchMultiplier: 1.8,
            });
            lenisRef.current = lenis;

            // Throttle zustand writes to ~30fps; framer reads lenis position directly
            let lastUpdate = 0;
            lenis.on("scroll", ({ scroll, limit, velocity }: any) => {
                const now = performance.now();
                if (now - lastUpdate < 33) return;
                lastUpdate = now;
                set({
                    y: scroll,
                    progress: limit > 0 ? scroll / limit : 0,
                    velocity: Math.abs(velocity),
                    direction: scroll > prevY.current ? "down" : "up",
                });
                prevY.current = scroll;
            });

            const raf = (t: number) => { lenis.raf(t); rafId = requestAnimationFrame(raf); };
            rafId = requestAnimationFrame(raf);
        };

        init();
        return () => { cancelAnimationFrame(rafId); lenisRef.current?.destroy(); };
    }, [set]);

    return lenisRef;
}

export function useScroll() {
    return useScrollStore((s) => ({ scrollY: s.y, direction: s.direction, progress: s.progress, velocity: s.velocity }));
}

// Selector-based — component only re-renders when crossing threshold
export function useScrolledPast(threshold: number) {
    return useScrollStore((s) => s.y > threshold);
}