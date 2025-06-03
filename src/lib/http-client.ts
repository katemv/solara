import axios, { AxiosInstance } from "axios";
import { responseHandler, responseErrorHandler } from "./axios-error-handler";

function createHttpInstance(): AxiosInstance {
    const instance = axios.create({
        timeout: 10000,
        headers: {
            "Content-Type": "application/json"
        }
    });

    instance.interceptors.response.use(responseHandler, responseErrorHandler);

    return instance;
}

export const http: AxiosInstance = createHttpInstance();
