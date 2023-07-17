import { UserDto } from "./userDto";

export interface RoomDto {
    id?: string;
    name?: string;
    creator?: string;
    users?: UserDto[];
    password?: string;
};