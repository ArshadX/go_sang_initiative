import axios from "axios";

export const instance = axios.create({
    // baseURL: 'https://gosang-backend-c9e0h5dwdtcbfafr.southindia-01.azurewebsites.net/api',
    baseURL: 'http://127.0.0.1:8000/api',

    timeout: 4000,
    headers: {'X-Custom-Header': 'Gosang', Authorization:''}
});