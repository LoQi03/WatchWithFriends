import { RoomUser } from "./roomUser";
import { VideoDto } from "./videoDto";

export interface RoomDto {
    id?: string;
    name?: string;
    creatorId: string;
    userIds?: RoomUser[];
    password?: string;
    currentVideo?: string;
    playList?: VideoDto[];
};