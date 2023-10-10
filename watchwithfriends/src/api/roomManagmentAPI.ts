import { AxiosResponse } from "axios";
import { RoomDto } from "../models/roomDto";
import { httpClient } from "../HttpClient";
import { VideoDto } from "../models/videoDto";
import { RoomConnectionDTO } from "../models/roomConnectionDTO";

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
export const addVideoToRoom = async (id: string, video: VideoDto): Promise<AxiosResponse<RoomDto, any>> => {
    const response = await httpClient.post<RoomDto>(`Rooms/${id}/Videos`, video);
    return response;
}
export const getNextVideo = async (id: string): Promise<AxiosResponse<RoomDto, any>> => {
    const response = await httpClient.post<RoomDto>(`Rooms/${id}/NextVideo`, {});
    return response;
}
export const deleteVideo = async (id: string, videoId: string): Promise<AxiosResponse<RoomDto, any>> => {
    const response = await httpClient.delete<RoomDto>(`Rooms/${id}/Videos/${videoId}`);
    return response;
}
export const verifyRoomConnection = async (roomId: string, userId: string, password: string): Promise<AxiosResponse> => {
    const roomConnectionDTO: RoomConnectionDTO = {
        roomId: roomId,
        userId: userId,
        password: password
    }
    const response = await httpClient.post(`Rooms/VerifyRoomConnection`, roomConnectionDTO);
    return response;
}