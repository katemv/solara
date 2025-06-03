import { NextRequest, NextResponse } from "next/server";
import { requireAuth, revokeRefreshToken } from "@/lib/auth/auth-server";

export async function POST(request: NextRequest) {
    try {
        const user = await requireAuth(request);

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
}
