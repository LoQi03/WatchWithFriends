import axios from 'axios';
import * as AppConfig from './AppConfig';

export const httpClient = axios.create({
    baseURL: AppConfig.GetConfig().apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});



