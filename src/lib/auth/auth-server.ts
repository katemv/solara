import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import User, { IUser } from "@/models/User";
import connectDB from "../db";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
}

export interface AccessTokenPayload {
    userId: string;
    email: string;
    role: "user" | "admin";
    type: "access";
}

export interface RefreshTokenPayload {
    userId: string;
    type: "refresh";
    tokenId: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

function generateTokenId(): string {
    return crypto.randomBytes(32).toString("hex");
}

export function generateAccessToken(user: IUser): string {
    const payload: AccessTokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        type: "access"
    };

    return jwt.sign(payload, JWT_SECRET!, { expiresIn: "1h" });
}

export function generateRefreshToken(user: IUser): string {
    const tokenId = generateTokenId();

    const payload: RefreshTokenPayload = {
        userId: user.id,
        type: "refresh",
        tokenId
    };

    return jwt.sign(payload, JWT_SECRET!, { expiresIn: "6M" });
}

export async function generateTokenPair(user: IUser): Promise<TokenPair> {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    try {
        await connectDB();
        const refreshTokenExpiresAt = new Date();

        refreshTokenExpiresAt.setMonth(refreshTokenExpiresAt.getMonth() + 6);

        await User.findByIdAndUpdate(user.id, {
            refreshToken: refreshToken,
            refreshTokenExpiresAt: refreshTokenExpiresAt
        });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Failed to generate token pair.");
    }
}

export function verifyAccessToken(token: string): AccessTokenPayload | null {
    try {
        const payload = jwt.verify(token, JWT_SECRET!) as AccessTokenPayload;

        if (payload.type !== "access") {
            console.warn("Token is not an access token");
            return null;
        }

        return payload as AccessTokenPayload;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.warn("Invalid JWT token:", error.message);
        } else if (error instanceof jwt.TokenExpiredError) {
            console.warn("Access token expired.");
        } else {
            console.error("Unexpected error verifying access token:", error);
        }
        return null;
    }
}

export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
    try {
        const payload = jwt.verify(token, JWT_SECRET!) as RefreshTokenPayload;

        if (payload.type !== "refresh") {
            console.warn("Token is not a refresh token");
            return null;
        }

        return payload as RefreshTokenPayload;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.warn("Invalid JWT refresh token:", error.message);
        } else if (error instanceof jwt.TokenExpiredError) {
            console.warn("Refresh token expired.");
        } else {
            console.error("Unexpected error verifying refresh token:", error);
        }
        return null;
    }
}

export async function refreshAccessToken(refreshToken: string): Promise<TokenPair | null> {
    try {
        const payload = verifyRefreshToken(refreshToken);

        if (!payload) {
            console.warn("Failed to verify refresh token payload");
            return null;
        }

        await connectDB();
        const user = await User.findById(payload.userId);

        if (!user) {
            console.warn(`User not found for ID: ${payload.userId}`);
            return null;
        }

        if (!user.isActive) {
            console.warn(`User account is inactive: ${payload.userId}`);
            return null;
        }

        // Check if refresh token matches the one stored in database
        if (user.refreshToken !== refreshToken) {
            console.warn(`Refresh token mismatch for user: ${payload.userId}`);
            return null;
        }

        // Check if refresh token hasn't expired
        if (!user.refreshTokenExpiresAt || user.refreshTokenExpiresAt < new Date()) {
            console.warn(`Refresh token expired for user: ${payload.userId}`);
            await User.findByIdAndUpdate(user._id, {
                refreshToken: null,
                refreshTokenExpiresAt: null
            });
            return null;
        }

        return await generateTokenPair(user);
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        return null;
    }
}

export async function getAuthUser(request: NextRequest): Promise<IUser | null> {
    try {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.warn("Invalid Authorization header");
            return null;
        }

        const token = authHeader.substring(7);

        if (!token) {
            console.warn("No token found in Authorization header");
            return null;
        }

        const payload = verifyAccessToken(token);

        if (!payload) {
            return null;
        }

        await connectDB();
        const user = await User.findById(payload.userId);

        if (!user) {
            console.warn(`User not found for token payload: ${payload.userId}`);
            return null;
        }

        if (!user.isActive) {
            console.warn(`User account is inactive: ${payload.userId}`);
            return null;
        }

        return user;
    } catch (error) {
        console.error("Failed to get authenticated user:", error);
        return null;
    }
}

export async function requireAuth(request: NextRequest): Promise<IUser> {
    const user = await getAuthUser(request);

    if (!user) {
        throw new Error("Authentication required. Please provide a valid access token.");
    }

    return user;
}

export async function requireAdmin(request: NextRequest): Promise<IUser> {
    const user = await requireAuth(request);

    if (user.role !== "admin") {
        throw new Error("Admin access required. Insufficient permissions.");
    }

    return user;
}

export async function revokeRefreshToken(userId: string): Promise<void> {
    if (!userId) {
        throw new Error("Invalid user ID provided for token revocation");
    }

    try {
        await connectDB();
        await User.findByIdAndUpdate(userId, {
            refreshToken: null,
            refreshTokenExpiresAt: null
        });

        console.log(`Refresh token revoked for user: ${userId}`);
    } catch (error) {
        throw new Error("Failed to revoke refresh token due to database error");
    }
}
