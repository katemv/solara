"use client";

import { SolaraLogo } from "@/assets/icons";
import { Button } from "@/components/Atoms/Button/Button";
import { useRouter } from "next/navigation";

export const Header = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push("/login");
    };

    return (
        <header className={"w-full h-24 bg-gray-900"}>
            <div className={"max-w-7xl flex items-center justify-between px-6 mx-auto h-full"}>
                <div className={"flex items-center gap-4"}>
                    <SolaraLogo className={"size-14 text-white"} />
                </div>
                <div className={"flex items-center gap-4"}>
                    <Button onClick={handleLoginClick} variant={"gradient-outlined"}>
                        {"Log in"}
                    </Button>
                </div>
            </div>
        </header>
    );
};
