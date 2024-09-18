import axios, { AxiosInstance } from 'axios';

export class AxiosService {

    public static get http(): AxiosInstance {
        return axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

}
