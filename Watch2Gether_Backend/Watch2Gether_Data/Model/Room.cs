namespace Watch2Gether_Data.Model
{
    public class Room
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid CreatorId { get; set; }
        public string? PasswordHash { get; set; }
        public ICollection<RoomUser>? UserIds { get; set; }
        public DateTime CreationTime { get; set; }
        public string? Salt { get; set; }
    }
}
