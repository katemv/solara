"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    adminOnly?: boolean;
    redirectTo?: string;
}

export function ProtectedRoute({ children, adminOnly = false, redirectTo = "/login" }: ProtectedRouteProps) {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push(redirectTo);
                return;
            }

            if (adminOnly && !isAdmin) {
                router.push("/");
                return;
            }
        }
    }, [isAuthenticated, isAdmin, loading, adminOnly, redirectTo, router]);

    if (loading) {
        return (
            <div className={"flex justify-center items-center min-h-screen bg-dark-100 text-light-80"}>
                <div className={"animate-pulse text-purple-80 text-xl"}>{"Loading..."}</div>
            </div>
        );
    }

    if (!isAuthenticated || (adminOnly && !isAdmin)) {
        return null;
    }

    return <>{children}</>;
}
