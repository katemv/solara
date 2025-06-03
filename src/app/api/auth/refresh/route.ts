import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/auth/auth-server";

export async function POST(request: NextRequest) {
    try {
        const { refreshToken } = await request.json();

        if (!refreshToken) {
            return NextResponse.json(
                { message: "Refresh token is required" },
                { status: 400 }
            );
        }

        const tokenPair = await refreshAccessToken(refreshToken);

        if (!tokenPair) {
            return NextResponse.json(
                { message: "Invalid or expired refresh token" },
                { status: 401 }
            );
        }

        return NextResponse.json({
            message: "Token refreshed successfully",
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken
        });
    } catch (error) {
        console.error("Token refresh error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
