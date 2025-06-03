import axios, { AxiosError, AxiosResponse } from "axios";

interface ErrorHandler {
    message: string
    action?: () => void
}

type ErrorHandlers = Record<string, ErrorHandler>

const commonErrorHandlers: ErrorHandlers = {
    "ERR_NETWORK": {
        message: "Network connection problem. Please check your internet connection."
    },
    "ERR_CANCELED": {
        message: "Request was canceled."
    },
    "ETIMEDOUT": {
        message: "Request timed out. Please try again."
    },
    "ERR_FR_TOO_MANY_REDIRECTS": {
        message: "Too many redirects."
    },
    "401": {
        message: "Please login to access this resource.",
        action: () => {
            // Only redirect if not already on login page
            if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
                window.location.href = "/login";
            }
        }
    },
    "403": {
        message: "You do not have permission to access this resource."
    },
    "404": {
        message: "The requested resource was not found."
    },
    "422": {
        message: "Please check your input and try again."
    },
    "500": {
        message: "Internal server error. Please try again later."
    },
    "AxiosError": {
        message: "A network error occurred. Please try again."
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getErrorKey(error: any): string[] {
    const keys: string[] = [];

    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        // Add specific error codes
        if (axiosError.code) {
            keys.push(axiosError.code);
        }

        // Add HTTP status codes
        if (axiosError.response?.status) {
            keys.push(axiosError.response.status.toString());
        }

        // Add generic axios error
        keys.push("AxiosError");
    }

    return keys;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(error: any, customHandlers?: ErrorHandlers): boolean {
    const errorKeys = getErrorKey(error);
    const allHandlers = { ...commonErrorHandlers, ...customHandlers };

    for (const key of errorKeys) {
        const handler = allHandlers[key];

        if (handler) {
            if (handler.message && handler.message.trim() !== "") {
                console.error("Error:", handler.message);
                // toast.error(handler.message)
            }

            if (handler.action) {
                handler.action();
            }

            return true;
        }
    }

    return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const responseErrorHandler = (error: any) => {
    handleError(error);
    return Promise.reject(error);
};

export const responseHandler = (response: AxiosResponse) => {
    return response;
};
