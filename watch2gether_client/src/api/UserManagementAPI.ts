import HttpClient from "../HttpClient";
import { LoginCredentialsDto } from "../models/loginCredentialsDto";
import { LoggedInUserDto } from "../models/loggedInUserDto";
import { RegisterUserDto } from "../models/registerUserDto";
import { UserDto } from "../models/userDto";

export const login = async (loginUserDto: LoginCredentialsDto): Promise<LoggedInUserDto> => {
    const { data } = await HttpClient.post<LoggedInUserDto>(`Users/login`, loginUserDto);
    return data;
}
export const register = async (registerUserDto: RegisterUserDto): Promise<any> => {
    const { data } = await HttpClient.post<RegisterUserDto>(`Users/register`, registerUserDto);
    return data;
}
export const getUserByToken = async (token: string): Promise<UserDto> => {
    const { data } = await HttpClient.get<UserDto>(`Users/token/${token}`);
    return data;
}