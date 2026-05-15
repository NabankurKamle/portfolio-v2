"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme.store";
import type { ThemeId } from "@/types";

export function useTheme() {
    const { theme, setTheme, toggleTheme, isTransitioning } = useThemeStore();

    // Sync theme attr on mount / hydration
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    // Keyboard shortcut: T to cycle themes
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "t" && !e.metaKey && !e.ctrlKey && !e.altKey) {
                const active = document.activeElement;
                const isInput =
                    active instanceof HTMLInputElement ||
                    active instanceof HTMLTextAreaElement;
                if (!isInput) toggleTheme();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [toggleTheme]);

    return {
        theme,
        setTheme: (t: ThemeId) => setTheme(t),
        toggleTheme,
        isTransitioning,
        isDark: theme === "eclipse" || theme === "ember" || theme === "mono",
        isLight: theme === "polar",
    };
}