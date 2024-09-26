import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://gosang-d9esgjhxbsa0cwav.southindia-01.azurewebsites.net/api',
    timeout: 1000,
    headers: {'X-Custom-Header': 'Gosang', Authorization:''}
});