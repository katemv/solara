import { NextRequest } from "next/server";

import { IUser } from "@/models/User";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { withAdmin } from "@/lib/auth/auth-server";

export const GET = withAdmin(async (_: NextRequest, user: IUser) => {
    try {
        await connectDB();

        const users = await User.find({}, {
            password: 0,
            refreshToken: 0
        });

        return Response.json({
            users,
            total: users.length,
            requestedBy: user.email
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return Response.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
});

export const DELETE = withAdmin(async (request: NextRequest, user: IUser) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return Response.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        if (userId === user.id) {
            return Response.json(
                { error: "Cannot delete your own account" },
                { status: 400 }
            );
        }

        await connectDB();
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return Response.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return Response.json({
            message: "User deleted successfully",
            deletedUser: {
                id: deletedUser.id,
                email: deletedUser.email
            },
            deletedBy: user.email
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return Response.json(
            { error: "Failed to delete user" },
            { status: 500 }
        );
    }
});
