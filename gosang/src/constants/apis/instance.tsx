import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://go-sang-initiative-backend.vercel.app/api',
    timeout: 1000,
    headers: {'X-Custom-Header': 'Gosang', Authorization:''}
});