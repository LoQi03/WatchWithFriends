import HttpClient from "../HttpClient";
import { LoginCredentialsDto } from "../models/loginCredentialsDto";
import { LoggedInUserDto } from "../models/loggedInUserDto";
import { RegisterUserDto } from "../models/registerUserDto";
import { UserDto } from "../models/userDto";
import { UpdateUserDto } from "../models/updateUserDto";
import { AxiosResponse } from "axios";

export const login = async (loginUserDto: LoginCredentialsDto): Promise<LoggedInUserDto> => {
    const { data } = await HttpClient.post<LoggedInUserDto>(`Users/login`, loginUserDto);
    return data;
}
export const register = async (registerUserDto: RegisterUserDto): Promise<number> => {
    const { status } = await HttpClient.post<UserDto>(`Users/register`, registerUserDto);
    return status;
}
export const getUserByToken = async (token: string): Promise<UserDto> => {
    const { data } = await HttpClient.get<UserDto>(`Users/token/${token}`);
    return data;
}
export const updateUser = async (user: UpdateUserDto): Promise<AxiosResponse> => {
    const response = await HttpClient.put<UserDto>(`Users`, user);
    return response;
}
export const uploadProfilePicture = async (file: File, userid: string): Promise<AxiosResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await HttpClient.post<UserDto>(`Users/${userid}/image`, formData, { headers: { "Content-Type": "multipart/form-data" } });
    return response;
}