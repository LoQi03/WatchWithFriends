export interface CurrentVideoDto {
    roomId: string;
    isPlaying: boolean;
    isPaused: boolean;
    duration: number;
    currentVideoUrl: string;
}