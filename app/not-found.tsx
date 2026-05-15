import Link from "next/link";

// Server component — no "use client" needed, no framer-motion
// Pure CSS animations keep it lightweight and SSR-safe.
export default function NotFound() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-primary)] overflow-hidden">

            {/* Atmospheric layers */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    style={{
                        position: "absolute",
                        top: "20%",
                        left: "10%",
                        width: 600,
                        height: 400,
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
                        filter: "blur(80px)",
                        opacity: 0.25,
                        animation: "glow-pulse 5s ease-in-out infinite",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "15%",
                        right: "15%",
                        width: 400,
                        height: 300,
                        borderRadius: "50%",
                        background: "radial-gradient(ellipse, var(--atmosphere-cool) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
            </div>

            {/* Dot grid */}
            <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

            <div
                className="relative section-container flex flex-col items-start max-w-2xl"
                style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both" }}
            >

                {/* 404 large numeral — decorative */}
                <div
                    className="absolute -top-8 -left-4 font-display font-[500] text-[var(--border-subtle)] select-none pointer-events-none"
                    style={{
                        fontSize: "clamp(8rem, 20vw, 18rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.06em",
                        opacity: 0.5,
                    }}
                    aria-hidden="true"
                >
                    404
                </div>

                {/* Status badge */}
                <div
                    className="flex items-center gap-3 mb-8 relative"
                    style={{ animation: "fade-in 0.6s ease 0.1s both" }}
                >
                    <span
                        className="w-2 h-2 rounded-full border border-[var(--border-strong)]"
                        style={{ backgroundColor: "var(--surface-active)" }}
                    />
                    <span className="font-mono text-xs tracking-widest text-[var(--text-tertiary)] uppercase">
                        404 — Page not found
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="text-display font-display font-[450] text-[var(--text-primary)] leading-[0.95] tracking-[-0.04em] mb-6 relative"
                    style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s both" }}
                >
                    Lost in{" "}
                    <span className="text-[var(--text-secondary)]">the void.</span>
                </h1>

                {/* Body */}
                <p
                    className="text-base text-[var(--text-secondary)] leading-relaxed mb-12 max-w-sm relative"
                    style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both" }}
                >
                    This page doesn&apos;t exist — or it did, and something moved it. Either way, there&apos;s nothing here.
                </p>

                {/* Actions */}
                <div
                    className="flex items-center gap-4"
                    style={{ animation: "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both" }}
                >
                    <Link href="/" className="btn-cinema btn-cinema-primary px-6 py-3 rounded-xl text-sm">
                        Back home
                        <span className="ml-2 opacity-60">→</span>
                    </Link>
                    <Link
                        href="/#work"
                        className="btn-cinema btn-cinema-ghost px-6 py-3 rounded-xl text-sm"
                    >
                        View work
                    </Link>
                </div>

                {/* Bottom rule */}
                <div
                    className="absolute bottom-16 left-0 right-0 px-[clamp(1.5rem,5vw,6rem)]"
                    style={{ animation: "fade-in 1s ease 0.7s both" }}
                >
                    <div className="divider mb-5" />
                    <p className="font-mono text-[10px] tracking-widest text-[var(--text-tertiary)] uppercase">
                        Nabankur Kamle · Software Engineer
                    </p>
                </div>
            </div>
        </div>
    );
}