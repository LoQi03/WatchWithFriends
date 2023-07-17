import HttpClient from "../HttpClient";
import { RoomDto } from "../models/roomDto";

export const getRooms = async (): Promise<RoomDto[]> => {
    const { data } = await HttpClient.get<RoomDto[]>(`Rooms`);
    return data;
};