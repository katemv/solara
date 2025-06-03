"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authClient, User, LoginCredentials, RegisterCredentials } from "@/lib/auth/auth-client";
import { TokenManager } from "@/lib/token-manager";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authClient.setupAxiosInterceptor();

        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        try {
            const storedUser = authClient.getUser();
            const hasTokens = TokenManager.getAccessToken() && TokenManager.getRefreshToken();

            if (storedUser && hasTokens) {
                try {
                    const currentUser = await authClient.getCurrentUser();

                    setUser(currentUser);
                } catch (error) {
                    console.error("Auth verification failed:", error);
                    await clearAuthData();
                }
            } else {
                await clearAuthData();
            }
        } catch (error) {
            console.error("Auth initialization error:", error);
            await clearAuthData();
        } finally {
            setLoading(false);
        }
    };

    const clearAuthData = async () => {
        TokenManager.clearTokens();
        authClient.removeUser();
        setUser(null);
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            setLoading(true);
            const response = await authClient.login(credentials);

            setUser(response.user);
        } finally {
            setLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        try {
            setLoading(true);
            const response = await authClient.register(credentials);

            setUser(response.user);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await authClient.logout();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
            await clearAuthData();
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        try {
            const currentUser = await authClient.getCurrentUser();

            setUser(currentUser);
        } catch (error) {
            console.error("Refresh user error:", error);
            await clearAuthData();
        }
    };

    const isAuthenticated = !!user && !!TokenManager.getAccessToken();
    const isAdmin = user?.role === "admin";

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        refreshUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
