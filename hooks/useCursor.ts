"use client";

import { useEffect, useRef, useCallback } from "react";
import { create } from "zustand";
import type { CursorVariant } from "@/types";

// ─── Cursor Store ─────────────────────────────────────────────────────
interface CursorStore {
    x: number;
    y: number;
    variant: CursorVariant;
    label: string;
    isVisible: boolean;
    set: (state: Partial<CursorStore>) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
    x: 0,
    y: 0,
    variant: "default",
    label: "",
    isVisible: false,
    set: (state) => set(state),
}));

// ─── useCursor hook ───────────────────────────────────────────────────
export function useCursor() {
    const { variant, label, isVisible, set } = useCursorStore();
    const rafRef = useRef<number>(0);
    const posRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                set({ x: posRef.current.x, y: posRef.current.y, isVisible: true });
            });
        };

        const leave = () => set({ isVisible: false });
        const enter = () => set({ isVisible: true });

        window.addEventListener("mousemove", move, { passive: true });
        document.addEventListener("mouseleave", leave);
        document.addEventListener("mouseenter", enter);

        return () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseleave", leave);
            document.removeEventListener("mouseenter", enter);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [set]);

    const setCursorVariant = useCallback(
        (v: CursorVariant, l?: string) => {
            set({ variant: v, label: l ?? "" });
        },
        [set]
    );

    const resetCursor = useCallback(() => {
        set({ variant: "default", label: "" });
    }, [set]);

    return { variant, label, isVisible, setCursorVariant, resetCursor };
}

// ─── Element-level helpers ────────────────────────────────────────────
export function useCursorHandlers(variant: CursorVariant, label?: string) {
    const { setCursorVariant, resetCursor } = useCursor();
    return {
        onMouseEnter: () => setCursorVariant(variant, label),
        onMouseLeave: () => resetCursor(),
    };
}