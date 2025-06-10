import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/auth-server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const user = await getAuthUser(request);

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userData = {
            id: user._id?.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            isActive: user.isActive,
            createdAt: user.createdAt
        };

        return NextResponse.json({ user: userData });
    } catch (error) {
        console.error("Get user error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
