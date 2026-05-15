"use client";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg-primary)]" style={{ zIndex: 50 }}>
            {/* Ambient glow */}
            <div
                className="absolute w-[600px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
                    filter: "blur(80px)",
                    opacity: 0.4,
                    animation: "glow-pulse 3s ease-in-out infinite",
                }}
            />

            <div className="relative flex flex-col items-center gap-12">
                {/* Logo mark */}
                <div className="flex flex-col items-center gap-6">
                    <div
                        className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center"
                        style={{ background: "var(--surface)" }}
                    >
                        <span
                            className="font-mono text-xs tracking-widest text-[var(--text-tertiary)]"
                            style={{ animation: "fade-in 0.6s ease forwards" }}
                        >
                            NK
                        </span>
                    </div>

                    {/* Cinematic bar loader */}
                    <div className="flex items-center gap-1.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="w-1 rounded-full bg-[var(--border-strong)]"
                                style={{
                                    height: "20px",
                                    animation: `float 1.2s ease-in-out infinite`,
                                    animationDelay: `${i * 0.12}s`,
                                    opacity: 0.6,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Skeleton sections */}
                <div className="w-80 flex flex-col gap-3">
                    {[
                        { w: "100%", h: 6, delay: 0 },
                        { w: "80%", h: 6, delay: 0.08 },
                        { w: "60%", h: 6, delay: 0.16 },
                    ].map((line, i) => (
                        <div
                            key={i}
                            className="rounded-full"
                            style={{
                                width: line.w,
                                height: line.h,
                                background: "var(--surface-hover)",
                                animation: "shimmer 2s linear infinite",
                                backgroundImage:
                                    "linear-gradient(90deg, var(--surface) 0%, var(--surface-hover) 50%, var(--surface) 100%)",
                                backgroundSize: "200% 100%",
                                animationDelay: `${line.delay}s`,
                            }}
                        />
                    ))}
                </div>

                <p
                    className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-tertiary)] uppercase"
                    style={{ animation: "fade-in 1s ease 0.4s both" }}
                >
                    Loading
                </p>
            </div>
        </div>
    );
}