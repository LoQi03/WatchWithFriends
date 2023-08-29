import { RoomUser } from "./roomUser";
import { VideoDto } from "./videoDto";

export interface RoomDto {
    id?: string;
    name?: string;
    creatorId: string;
    roomUsers?: RoomUser[];
    password?: string;
    currentVideo?: string;
    playList?: VideoDto[];
};