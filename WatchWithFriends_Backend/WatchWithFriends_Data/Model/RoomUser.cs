namespace WatchWithFriends_Data.Model
{
    public class RoomUser
    {
        public string Id { get; set; }
        public Guid UserId { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
    }
}
