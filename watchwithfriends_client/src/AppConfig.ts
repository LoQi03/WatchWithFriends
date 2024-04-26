import joi from "joi";
import axios from "axios";

interface AppConfig {
    apiUrl: string;
}

export const config: AppConfig = {
    apiUrl: import.meta.env.VITE_WATCH_2_GETHER_BACKEND_ADDRESS ?? "https://watchwithfriends-backend.mt-dev.site/",
}

const schema = joi.object({
    apiUrl: joi.string().required(),
});

export const getConfig=(): AppConfig => {
    const { error, value } = schema.validate(config);
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
    else {
        return value;
    }
}
export const setAxiosConfig = (apiUrl: string) => {
    axios.defaults.baseURL = apiUrl;
    axios.defaults.withCredentials = true;
};