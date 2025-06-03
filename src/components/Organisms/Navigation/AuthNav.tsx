"use client";

import { User, ChevronDown, LogOut, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/Atoms/Button";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/UI/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/UI/dropdown-menu";

export function AuthNav() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    if (!isAuthenticated) {
        return (
            <div className={"flex items-center gap-4"}>
                <Link href={"/login"}>
                    <Button variant={"gradient-outlined"} size={"sm"}>
                        {"Sign In"}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={"flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"}>
                    <User size={20} />
                    <span className={"text-white text-sm"}>{user?.name}</span>
                    <ChevronDown size={16} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className={"w-56"}>
                <DropdownMenuLabel>
                    <div>
                        <div className={"flex justify-between items-center w-full"}>
                            <p className={"text-white font-medium"}>{user?.name}</p>
                            {isAdmin && (
                                <Badge variant={"purple"}>
                                    {"Admin"}
                                </Badge>
                            )}
                        </div>
                        <p className={"text-gray-400 text-xs font-normal"}>{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                    <DropdownMenuItem asChild>
                        <Link href={"/admin"} className={"flex items-center gap-2"}>
                            <Shield size={16} />
                            {"Admin Panel"}
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className={"flex items-center gap-2"}>
                    <LogOut size={16} />
                    {"Sign Out"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
