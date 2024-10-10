import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://gosang-backend-c9e0h5dwdtcbfafr.southindia-01.azurewebsites.net/api',
    timeout: 4000,
    headers: {'X-Custom-Header': 'Gosang', Authorization:''}
});