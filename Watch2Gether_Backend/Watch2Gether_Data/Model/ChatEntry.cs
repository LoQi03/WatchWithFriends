namespace Watch2Gether_Data.Model
{
    public class ChatEntry
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public DateTime MessageTime { get; set; }
    }
}
