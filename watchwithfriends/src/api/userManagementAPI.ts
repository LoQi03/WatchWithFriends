import { LoginCredentialsDto } from "../models/loginCredentialsDto";
import { RegisterUserDto } from "../models/registerUserDto";
import { UserDto } from "../models/userDto";
import { UpdateUserDto } from "../models/updateUserDto";
import { AxiosResponse } from "axios";
import { httpClient } from "../HttpClient";

export const login = async (loginUserDto: LoginCredentialsDto): Promise<AxiosResponse<UserDto>> => {
    const response = await httpClient.post<UserDto>(`Users/login`, loginUserDto);
    return response;
};

export const register = async (registerUserDto: RegisterUserDto): Promise<number> => {
    const { status } = await httpClient.post<UserDto>(`Users/register`, registerUserDto);
    return status;
};

export const getUserById = async (id: string): Promise<AxiosResponse<UserDto>> => {
    const response = await httpClient.get<UserDto>(`Users/${id}`);
    return response;
};

export const getUserByToken = async (): Promise<AxiosResponse<UserDto>> => {
    const response = await httpClient.get<UserDto>(`Users/token`);
    return response;
};

export const updateUser = async (user: UpdateUserDto): Promise<AxiosResponse> => {
    const response = await httpClient.put<UserDto>(`Users`, user);
    return response;
};

export const uploadProfilePicture = async (file: File, userid: string): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await httpClient.post<UserDto>(`Users/${userid}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
}

