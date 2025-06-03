import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { generateTokenPair } from "@/lib/auth/auth-server";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { email, password, name, role } = await request.json();

        const missingFields = [];

        if (!email) missingFields.push("email");
        if (!password) missingFields.push("password");
        if (!name) missingFields.push("name");

        if (missingFields.length > 0) {
            return NextResponse.json(
                { message: `Missing required fields: ${missingFields.join(", ")}` },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters long" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Create new user
        const userData = {
            email,
            password,
            name,
            role: role === "admin" ? "admin" : "user" // Only allow admin if explicitly specified
        };

        const user = new User(userData);

        await user.save();

        // Generate token pair
        const { accessToken, refreshToken } = await generateTokenPair(user);

        // Return user data (without password) and tokens
        const responseData = {
            id: user._id?.toString(),
            email: user.email,
            name: user.name,
            role: user.role
        };

        return NextResponse.json({
            message: "User created successfully",
            user: responseData,
            accessToken,
            refreshToken
        }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);

        if (error instanceof Error && error.message.includes("duplicate key")) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
