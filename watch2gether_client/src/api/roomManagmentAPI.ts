import { AxiosResponse } from "axios";
import { RoomDto } from "../models/roomDto";
import { httpClient } from "../HttpClient";

export const getRooms = async (): Promise<AxiosResponse<RoomDto[], any>> => {
    const response = await httpClient.get<RoomDto[]>(`Rooms`);
    return response;
};
export const createRoom = async (room: RoomDto): Promise<AxiosResponse<RoomDto, any>> => {
    const response = await httpClient.post<RoomDto>(`Rooms`, room);
    return response;
};
export const getRoomById = async (id: string): Promise<AxiosResponse<RoomDto, any>> => {
    const response = await httpClient.get<RoomDto>(`Rooms/${id}`);
    return response;
};