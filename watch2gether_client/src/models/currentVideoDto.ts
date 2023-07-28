export interface VideoPlayerDto {
    roomId: string;
    isPlaying?: boolean;
    isPaused?: boolean;
    duration?: number;
    currentVideoUrl?: string;
    pendingVideos?: string[];
}