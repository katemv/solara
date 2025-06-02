"use client";

import "./globals.css";
import { Play, Zen_Dots } from "next/font/google";
import Layout from "@/components/Templates/Layout";
import AuthLayout from "@/components/Templates/AuthLayout";
import { usePathname } from "next/navigation";

const play = Play({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-play",
    display: "swap"
});

const zenDots = Zen_Dots({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-zen-dots",
    display: "swap"
});

const AUTH_ROUTES = ["/login"];

export default function RootLayout({
    children
}: {
  children: React.ReactNode
}) {
    const pathname = usePathname();
    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    const SelectedLayout = isAuthRoute ? AuthLayout : Layout;

    return (
        <html lang={"en"} className={`${play.variable} ${zenDots.variable}`}>
            <body>
                <SelectedLayout>{children}</SelectedLayout>
            </body>
        </html>
    );
}
