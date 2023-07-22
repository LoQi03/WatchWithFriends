import axios from 'axios';
import * as AppConfig from './AppConfig';

export const httpClient = axios.create({
    baseURL: AppConfig.GetConfig().apiUrl,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const updateAuthorizationHeader = () => {
    const newToken = localStorage.getItem('token');
    httpClient.defaults.headers.common["Authorization"] = newToken ? `Bearer ${newToken}` : "";
};
