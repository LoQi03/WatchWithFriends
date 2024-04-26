namespace WatchWithFriends_Data.Model
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? Salt { get; set; }
        public DateTime BirthDate { get; set; }
        public Guid? ImageId { get; set; }
    }
}
