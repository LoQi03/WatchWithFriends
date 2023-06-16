import { UserDto } from "./userDto";

export interface LoggedInUserDto {
    userDetails?: UserDto;
    token?: string;
}