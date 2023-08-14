namespace Watch2Gether_Backend.Model
{
    public class VideoPlayerDTO
    {
        public Guid RoomId { get; set; }
        public bool? IsPlaying { get; set; }
        public bool? IsPaused { get; set; }
        public int? Duration { get; set; }
        public string? CurrentVideoUrl { get; set; }
    }
}
