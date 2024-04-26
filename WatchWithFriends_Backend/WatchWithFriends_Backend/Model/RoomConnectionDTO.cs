namespace WatchWithFriends.Model
{
    public class RoomConnectionDTO
    {
        public Guid UserId { get; set; }
        public Guid RoomId { get; set; }
        public string? Password { get; set; }
    }
}
