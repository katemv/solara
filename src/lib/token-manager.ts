export class TokenManager {
    private static readonly ACCESS_TOKEN_KEY = "access_token";
    private static readonly REFRESH_TOKEN_KEY = "refresh_token";
    private static refreshPromise: Promise<boolean> | null = null;

    static setTokens(accessToken: string, refreshToken: string): void {
        if (typeof window === "undefined") return; // Server-side check

        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    static getAccessToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    static getRefreshToken(): string | null {
        if (typeof window === "undefined") return null;
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    static clearTokens(): void {
        if (typeof window === "undefined") return;

        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    static isAccessTokenExpired(): boolean {
        const token = this.getAccessToken();

        if (!token) return true;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Date.now() / 1000;

            return payload.exp < currentTime;
        } catch {
            return true;
        }
    }

    static async refreshTokens(): Promise<boolean> {
        // Prevent multiple simultaneous refresh attempts
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        this.refreshPromise = this._performRefresh();
        const result = await this.refreshPromise;

        this.refreshPromise = null;

        return result;
    }

    private static async _performRefresh(): Promise<boolean> {
        const refreshToken = this.getRefreshToken();

        if (!refreshToken) return false;

        try {
            const response = await fetch("/api/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ refreshToken })
            });

            if (!response.ok) {
                this.clearTokens();
                return false;
            }

            const data = await response.json();

            this.setTokens(data.accessToken, data.refreshToken);
            return true;
        } catch (error) {
            console.error("Token refresh failed:", error);
            this.clearTokens();
            return false;
        }
    }

    static async getValidAccessToken(): Promise<string | null> {
        const accessToken = this.getAccessToken();

        if (!accessToken) return null;

        // If token is not expired, return it
        if (!this.isAccessTokenExpired()) {
            return accessToken;
        }

        // Try to refresh the token
        const refreshed = await this.refreshTokens();

        if (refreshed) {
            return this.getAccessToken();
        }

        return null;
    }

    static async logout(): Promise<void> {
        try {
            await fetch("/api/auth/logout", {
                method: "POST"
            });
        } catch (error) {
            console.error("Logout API call failed:", error);
        } finally {
            this.clearTokens();
        }
    }
}
