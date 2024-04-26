namespace WatchWithFriends_Data.Model
{
    public class Room
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CreatorId { get; set; }
        public string? PasswordHash { get; set; }
        public DateTime CreationTime { get; set; }
        public string? Salt { get; set; }
        public ICollection<RoomUser> RoomUsers { get; set; }
        public Guid? CurrentVideo { get; set; }
        public ICollection<Video>? PlayList { get; set; }
    }
}
