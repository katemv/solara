import { NextRequest, NextResponse } from "next/server";
import { revokeRefreshToken } from "@/lib/auth/auth-server";
import { withAuth } from "@/lib/auth/auth-server";

export const POST = withAuth(async (_: NextRequest, user) => {
    try {
        await revokeRefreshToken(user._id?.toString() || "");

        return NextResponse.json({
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Logout error:", error);

        return NextResponse.json({
            message: "Logout successful"
        });
    }
});
