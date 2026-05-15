// ─── Theme ───────────────────────────────────────────────────────────
export type ThemeId = "eclipse" | "polar" | "ember" | "mono";

export interface Theme {
    id: ThemeId;
    label: string;
    description: string;
    color: string;
}

// ─── Navigation ──────────────────────────────────────────────────────
export interface NavLink {
    label: string;
    href: string;
    external?: boolean;
}

export interface SocialLink {
    label: string;
    href: string;
    icon: string;
}

// ─── Projects ────────────────────────────────────────────────────────
export interface ProjectMetric {
    label: string;
    value: string;
}

export interface Project {
    id: string;
    index: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    year: string;
    status: "Experimental" | "Production" | "Open Source" | "Archived" | "WIP";
    link: string | null;
    github: string | null;
    featured: boolean;
    color: string;
    metrics: ProjectMetric[];
    slug?: string;
}

// ─── Experience ──────────────────────────────────────────────────────
export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    tags: string[];
}

// ─── Skills ──────────────────────────────────────────────────────────
export interface Skill {
    category: string;
    items: string[];
}

// ─── Motion ──────────────────────────────────────────────────────────
export interface MotionConfig {
    duration: number;
    ease: number[] | string;
    delay?: number;
}

// ─── Cursor ──────────────────────────────────────────────────────────
export type CursorVariant =
    | "default"
    | "text"
    | "link"
    | "button"
    | "drag"
    | "hidden"
    | "project";

export interface CursorState {
    x: number;
    y: number;
    variant: CursorVariant;
    label?: string;
}

// ─── Scroll ──────────────────────────────────────────────────────────
export interface ScrollState {
    y: number;
    direction: "up" | "down";
    progress: number;
    velocity: number;
}

// ─── Command Palette ─────────────────────────────────────────────────
export interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon?: string;
    shortcut?: string[];
    action: () => void;
    group: string;
}