namespace WatchWithFriends.Model;

public class VideoPlayer
{
    public Guid RoomId { get; set; }
    public bool IsPlaying { get; set; }
    public int Duration { get; set; }
    public string? CurrentVideoUrl { get; set; }
}
