namespace Watch2Gether_Data.Model
{
    public class Video
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public byte[] Image { get; set; }
        public Guid? RoomId { get; set; }
        public Room? Room { get; set; }
    }
}
