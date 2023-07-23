namespace Watch2Gether_Data.Model
{
    public class Room
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid Creator { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<ChatEntry>? ChatEntries { get; set; }
        public string? PasswordHash { get; set; }
        public DateTime CreationTime { get; set; }
        public string? Salt { get; set; }
    }
}
