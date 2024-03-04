import axios, {AxiosInstance} from 'axios';

export const httpAuth:AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});


export const http:AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        credentials: true
    },
});
