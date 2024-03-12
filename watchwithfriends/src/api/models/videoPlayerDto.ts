export interface VideoPlayerDTO {
    roomId: string;
    isPlaying?: boolean;
    isPaused?: boolean;
    duration?: number;
    currentVideoUrl?: string | null;
}