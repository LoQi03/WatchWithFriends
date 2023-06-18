import { UserDto } from "./userDto";

export interface UpdateUserDto {
    userDetails: UserDto;
    newPassword: string;
};