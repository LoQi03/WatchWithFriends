import { UserDto } from "./userDto";

export interface LoginUserDto {
    user?: UserDto;
    password?: string;
}