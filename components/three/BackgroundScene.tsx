"use client";

import { useEffect, useRef } from "react";
import { useThemeStore } from "@/stores/theme.store";

type RGB = readonly [number, number, number];

const PALETTES: Record<string, { bg: RGB; secondary: RGB; accent: RGB }> = {
    eclipse: { bg: [8, 9, 12], secondary: [17, 21, 32], accent: [138, 174, 255] },
    polar: { bg: [250, 250, 250], secondary: [238, 238, 242], accent: [38, 80, 216] },
    ember: { bg: [14, 10, 8], secondary: [26, 18, 8], accent: [240, 160, 96] },
    mono: { bg: [10, 10, 10], secondary: [20, 20, 20], accent: [160, 160, 160] },
};

// Static — defined once, never reallocated
const ORBS = [
    { x: 0.15, y: 0.20, r: 0.40, sp: 0.0003, ph: 0, accent: true },
    { x: 0.85, y: 0.70, r: 0.35, sp: 0.0002, ph: 2, accent: false },
    { x: 0.50, y: 0.45, r: 0.25, sp: 0.0004, ph: 4, accent: true },
    { x: 0.10, y: 0.85, r: 0.20, sp: 0.0003, ph: 1, accent: false },
] as const;

export function BackgroundScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafId = useRef<number>(0);
    const size = useRef({ w: 0, h: 0 });
    const theme = useThemeStore((s) => s.theme);
    const themeRef = useRef(theme);

    useEffect(() => { themeRef.current = theme; }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
        if (!ctx) return;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 1.5); // cap fill-rate
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            canvas.style.width = w + "px";
            canvas.style.height = h + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            size.current = { w, h };
        };
        resize();

        let rt: ReturnType<typeof setTimeout>;
        const onResize = () => { clearTimeout(rt); rt = setTimeout(resize, 150); };
        window.addEventListener("resize", onResize, { passive: true });

        const draw = (t: number) => {
            const { w, h } = size.current;
            const pal = PALETTES[themeRef.current] ?? PALETTES.eclipse;
            const [pr, pg, pb] = pal.bg;
            const [ar, ag, ab] = pal.accent;
            const [sr, sg, sb] = pal.secondary;
            const mn = Math.min(w, h);

            // Solid base — no alpha compositing cost
            ctx.fillStyle = `rgb(${pr},${pg},${pb})`;
            ctx.fillRect(0, 0, w, h);

            // Orbs
            for (let i = 0; i < ORBS.length; i++) {
                const o = ORBS[i];
                const px = o.x * w + Math.sin(t * o.sp + o.ph) * w * 0.06;
                const py = o.y * h + Math.cos(t * o.sp + o.ph) * h * 0.05;
                const r = o.r * mn;
                const g = ctx.createRadialGradient(px, py, 0, px, py, r);

                if (o.accent) {
                    g.addColorStop(0, `rgba(${ar},${ag},${ab},0.07)`);
                    g.addColorStop(0.5, `rgba(${ar},${ag},${ab},0.025)`);
                    g.addColorStop(1, "rgba(0,0,0,0)");
                } else {
                    g.addColorStop(0, `rgba(${sr},${sg},${sb},0.65)`);
                    g.addColorStop(0.55, `rgba(${sr},${sg},${sb},0.12)`);
                    g.addColorStop(1, "rgba(0,0,0,0)");
                }
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
            }

            // Vignette — darkens edges, hides canvas border
            const vg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.72);
            vg.addColorStop(0, "rgba(0,0,0,0)");
            vg.addColorStop(0.62, "rgba(0,0,0,0)");
            vg.addColorStop(1, `rgba(${pr},${pg},${pb},0.6)`);
            ctx.fillStyle = vg;
            ctx.fillRect(0, 0, w, h);

            rafId.current = requestAnimationFrame(draw);
        };

        rafId.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", onResize);
            clearTimeout(rt);
            cancelAnimationFrame(rafId.current);
        };
    }, []); // zero deps — reads everything via refs

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}