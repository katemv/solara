import { http } from "../http-client";
import { TokenManager } from "../token-manager";

export interface User {
    id: string;
    email: string;
    name: string;
    role: "user" | "admin";
    isActive: boolean;
    createdAt: string;
}

export interface AuthResponse {
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
    role?: "user" | "admin";
}

class AuthClient {
    private userKey = "authUser";

    getUser(): User | null {
        if (typeof window === "undefined") return null;
        const user = localStorage.getItem(this.userKey);

        return user ? JSON.parse(user) : null;
    }

    setUser(user: User): void {
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    removeUser(): void {
        localStorage.removeItem(this.userKey);
    }

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await http.post("/api/auth/login", credentials);
        const data = response.data;

        TokenManager.setTokens(data.accessToken, data.refreshToken);
        this.setUser(data.user);

        return data;
    }

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await http.post("/api/auth/register", credentials);
        const data = response.data;

        TokenManager.setTokens(data.accessToken, data.refreshToken);
        this.setUser(data.user);

        return data;
    }

    async logout(): Promise<void> {
        try {
            // Use TokenManager logout which calls the API and clears tokens
            await TokenManager.logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Always clear user data locally
            this.removeUser();
        }
    }

    async getCurrentUser(): Promise<User> {
        const token = await TokenManager.getValidAccessToken();

        if (!token) {
            throw new Error("No valid authentication token");
        }

        const response = await http.get("/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const user = response.data.user;

        this.setUser(user);

        return user;
    }

    isAuthenticated(): boolean {
        return !!TokenManager.getAccessToken();
    }

    isAdmin(): boolean {
        const user = this.getUser();

        return user?.role === "admin";
    }

    setupAxiosInterceptor(): void {
        http.interceptors.request.use(async (config) => {
            const token = await TokenManager.getValidAccessToken();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        http.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    const refreshed = await TokenManager.refreshTokens();

                    if (refreshed) {
                        const newToken = TokenManager.getAccessToken();

                        if (newToken) {
                            error.config.headers.Authorization = `Bearer ${newToken}`;
                            return http.request(error.config);
                        }
                    } else {
                        this.removeUser();
                        TokenManager.clearTokens();

                        if (typeof window !== "undefined") {
                            window.location.href = "/login";
                        }
                    }
                }
                return Promise.reject(error);
            }
        );
    }
}

export const authClient = new AuthClient();
