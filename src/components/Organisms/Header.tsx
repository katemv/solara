"use client";

import { SolaraLogo } from "@/assets/icons";
import { AuthNav } from "@/components/Organisms/Navigation/AuthNav";
import Link from "next/link";

export const Header = () => {
    return (
        <header className={"w-full h-24 bg-gray-900"}>
            <div className={"max-w-7xl flex items-center justify-between px-6 mx-auto h-full"}>
                <Link href={"/"} className={"flex items-center gap-4 hover:opacity-80 transition-opacity"}>
                    <SolaraLogo className={"size-14 text-white"} />
                </Link>
                <AuthNav />
            </div>
        </header>
    );
};
