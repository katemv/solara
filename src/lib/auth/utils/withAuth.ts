
import { NextRequest } from "next/server";
import { requireAdmin } from "../auth-server";
import { requireAuth } from "../auth-server";
import { IUser } from "@/models/User";

export type AuthenticatedHandler = (request: NextRequest, user: IUser) => Promise<Response>;
export type AdminHandler = (request: NextRequest, user: IUser) => Promise<Response>;

/**
 * Wraps an API route handler with authentication
 * Automatically handles auth errors and returns appropriate responses
 */
export function withAuth(handler: AuthenticatedHandler) {
    return async (request: NextRequest): Promise<Response> => {
        try {
            const user = await requireAuth(request);

            return await handler(request, user);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const statusCode = error?.code === "AUTH_REQUIRED" ? 401 : 500;

            return Response.json(
                {
                    error: error?.message || "Authentication error",
                    code: error?.code || "UNKNOWN_ERROR"
                },
                { status: statusCode }
            );
        }
    };
}

/**
 * Wraps an API route handler with admin authentication
 * Automatically handles auth errors and returns appropriate responses
 */
export function withAdmin(handler: AdminHandler) {
    return async (request: NextRequest): Promise<Response> => {
        try {
            const user = await requireAdmin(request);

            return await handler(request, user);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            let statusCode = 500;

            if (error?.code === "AUTH_REQUIRED") {
                statusCode = 401;
            } else if (error?.code === "ADMIN_REQUIRED") {
                statusCode = 403;
            }

            return Response.json(
                {
                    error: error?.message || "Authentication error",
                    code: error?.code || "UNKNOWN_ERROR"
                },
                { status: statusCode }
            );
        }
    };
}

