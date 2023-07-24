import { RoomUser } from "./roomUser";

export interface RoomDto {
    id?: string;
    name?: string;
    creatorId: string;
    userIds?: RoomUser[];
    password?: string;
};