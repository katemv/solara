import axios, { AxiosInstance } from "axios";

function createHttpInstance(): AxiosInstance {
    const instance = axios.create({
        timeout: 10000,
        headers: {
            "Content-Type": "application/json"
        }
    });

    instance.interceptors.response.use((res) => res, (error) => {
        console.error(error);
        return Promise.reject(error);
    });

    return instance;
}

export const http: AxiosInstance = createHttpInstance();
