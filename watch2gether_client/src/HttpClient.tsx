import axios from 'axios';
import * as AppConfig from './AppConfig';

export default axios.create({
    baseURL: AppConfig.GetConfig().apiUrl,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}` || "",
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});