import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                "play": ["var(--font-play)"],
                "zen-dots": ["var(--font-zen-dots)"]
            },
            colors: {
                purple: {
                    "100": "#eeebff",
                    "200": "#eeebff",
                    "300": "#dad5f4",
                    "400": "#dad5f4",
                    "500": "#bcb3f4",
                    "600": "#9d8ff3",
                    "700": "#8373f3",
                    "800": "#7861FF",
                    "900": "#674deb"
                },
                blue: {
                    "100": "#F5FBFD",
                    "200": "#F5FBFD",
                    "300": "#F5FBFD",
                    "400": "#EAF7FB",
                    "500": "#D6EFF7",
                    "600": "#ADDFEF",
                    "700": "#84D0E7",
                    "800": "#5BC0DF",
                    "900": "#31B0D8"
                },
                gray: {
                    "50": "#F7FAFC",
                    "100": "#EDF2F7",
                    "200": "#E2E8F0",
                    "300": "#CBD5E0",
                    "400": "#7A8084",
                    "500": "#5A5E62",
                    "550": "#42484E",
                    "600": "#34383C",
                    "650": "#292F34",
                    "700": "#272733",
                    "800": "#1c1c26",
                    "900": "#16161E"
                },
                danger: "#EA5B5B",
                warning: "#FFBE21",
                success: "#2ED573",
                white: "#FFFFFF"
            },
            backgroundImage: {
                "blue-gradient": "linear-gradient(to right top, #6d327c, #485da6, #00a1ba, #00bf98, #36c486)",
                "pink-gradient": "linear-gradient(to right top, #38438b, #944b94, #d75a88, #ff7e71, #ffb25f, #ffeb68)",
                "auth-gradient": "linear-gradient(to right top, #3f16d6, #7442e0, #9a69eb, #bb90f5, #d9b7ff)"
            },
            keyframes: {
                flickerPink: {
                    "0%": { opacity: "1" },
                    "50%": { opacity: "0" },
                    "100%": { opacity: "1" }
                },
                flickerBlue: {
                    "0%": { opacity: "0" },
                    "50%": { opacity: "1" },
                    "100%": { opacity: "0" }
                }
            },
            animation: {
                "flicker-pink": "flickerPink 10s ease-in-out infinite",
                "flicker-blue": "flickerBlue 10s ease-in-out infinite"
            }
        }
    },
    plugins: [
        plugin(function({ addBase, addUtilities }) {
            addBase({
                "html": {
                    color: "#FFFFFF",
                    "-webkit-font-smoothing": "antialiased",
                    "-moz-osx-font-smoothing": "grayscale",
                    fontFamily: "var(--font-play)"
                },
                "body": { backgroundColor: "#16161E" }
            });
            addUtilities({
                ".text-balance": {
                    "text-wrap": "balance"
                }
            });
        })
    ]
};

export default config;
