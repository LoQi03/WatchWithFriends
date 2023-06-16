import { UserDto } from "./userDto";

export interface LoggedInUserDto {
    user?: UserDto;
    token?: string;
}