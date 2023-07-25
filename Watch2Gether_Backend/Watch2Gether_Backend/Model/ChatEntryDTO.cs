namespace Watch2Gether_Backend.Model
{
    public class ChatEntryDTO
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public DateTime MessageTime { get; set; }
    }
}
