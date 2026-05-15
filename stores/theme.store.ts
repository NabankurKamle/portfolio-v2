"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeId } from "@/types";

interface ThemeStore {
    theme: ThemeId;
    setTheme: (theme: ThemeId) => void;
    toggleTheme: () => void;
    isTransitioning: boolean;
}

const themeOrder: ThemeId[] = ["eclipse", "polar", "ember", "mono"];

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            theme: "eclipse",
            isTransitioning: false,

            setTheme: (theme: ThemeId) => {
                set({ isTransitioning: true });

                // Apply theme to document
                if (typeof document !== "undefined") {
                    document.documentElement.setAttribute("data-theme", theme);
                }

                setTimeout(() => {
                    set({ theme, isTransitioning: false });
                }, 300);
            },

            toggleTheme: () => {
                const current = get().theme;
                const idx = themeOrder.indexOf(current);
                const next = themeOrder[(idx + 1) % themeOrder.length];
                get().setTheme(next);
            },
        }),
        {
            name: "portfolio-theme",
            onRehydrateStorage: () => (state) => {
                if (state && typeof document !== "undefined") {
                    document.documentElement.setAttribute("data-theme", state.theme);
                }
            },
        }
    )
);