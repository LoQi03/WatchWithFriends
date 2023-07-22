import { LoginCredentialsDto } from "../models/loginCredentialsDto";
import { LoggedInUserDto } from "../models/loggedInUserDto";
import { RegisterUserDto } from "../models/registerUserDto";
import { UserDto } from "../models/userDto";
import { UpdateUserDto } from "../models/updateUserDto";
import { AxiosResponse } from "axios";
import { httpClient } from "../HttpClient";

export const login = async (loginUserDto: LoginCredentialsDto): Promise<LoggedInUserDto> => {
    const { data } = await httpClient.post<LoggedInUserDto>(`Users/login`, loginUserDto);
    return data;
}
export const register = async (registerUserDto: RegisterUserDto): Promise<number> => {
    const { status } = await httpClient.post<UserDto>(`Users/register`, registerUserDto);
    return status;
}
export const getUserByToken = async (token: string): Promise<UserDto> => {
    const { data } = await httpClient.get<UserDto>(`Users/token/${token}`);
    return data;
}
export const updateUser = async (user: UpdateUserDto): Promise<AxiosResponse> => {
    const response = await httpClient.put<UserDto>(`Users`, user);
    return response;
}
export const uploadProfilePicture = async (file: File, userid: string): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await httpClient.post<UserDto>(`Users/${userid}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
}