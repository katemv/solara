import { NextRequest } from "next/server";
import { IUser } from "@/models/User";
import { withAuth } from "@/lib/auth/utils/withAuth";

export const GET = withAuth(async (_: NextRequest, user: IUser) => {
    return Response.json({
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        }
    });
});

export const PUT = withAuth(async (_: NextRequest, user: IUser) => {
    try {
        return Response.json({
            message: "Profile updated successfully",
            userId: user.id
        });
    } catch (error) {
        return Response.json(
            { error: "Failed to update profile" },
            { status: 400 }
        );
    }
});
