import axios from 'axios';
import * as AppConfig from './AppConfig';

export default axios.create({
    baseURL: AppConfig.GetConfig().apiUrl,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});