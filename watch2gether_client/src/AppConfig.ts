import joi from "joi";

interface AppConfig {
    apiUrl: string;
}

export const config: AppConfig = {
    apiUrl: process.env.REACT_APP_WATCH_2_GETHER_BACKEND_ADDRESS!,
}

const schema = joi.object({
    apiUrl: joi.string().required(),
});

export function GetConfig(): AppConfig {
    const { error, value } = schema.validate(config);
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
    else {
        return value;
    }
}