import { DM_Sans, JetBrains_Mono } from "next/font/google";

export const fontSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-sans",
    display: "swap",
    preload: true,
    adjustFontFallback: true,
});

export const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-mono",
    display: "swap",
    preload: false,
    adjustFontFallback: false,
});