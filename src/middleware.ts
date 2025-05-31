import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimit = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 60;

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (request.method === "OPTIONS") {
        return response;
    }

    if (request.nextUrl.pathname.startsWith("/api")) {
        const ip = request.ip ?? "anonymous";
        const now = Date.now();
        const windowStart = now - RATE_LIMIT_WINDOW;

        Array.from(rateLimit.entries()).forEach(([key, value]) => {
            if (value.timestamp < windowStart) {
                rateLimit.delete(key);
            }
        });

        const rateLimitInfo = rateLimit.get(ip) ?? { count: 0, timestamp: now };

        if (rateLimitInfo.timestamp < windowStart) {
            rateLimitInfo.count = 0;
            rateLimitInfo.timestamp = now;
        }

        rateLimitInfo.count++;
        rateLimit.set(ip, rateLimitInfo);

        response.headers.set("X-RateLimit-Limit", MAX_REQUESTS.toString());
        response.headers.set(
            "X-RateLimit-Remaining",
            Math.max(0, MAX_REQUESTS - rateLimitInfo.count).toString()
        );

        if (rateLimitInfo.count > MAX_REQUESTS) {
            return NextResponse.json(
                { message: "Too many requests" },
                { status: 429 }
            );
        }
    }

    return response;
}

export const config = {
    matcher: [
        "/api/:path*"
    ]
};
