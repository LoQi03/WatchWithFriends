using Watch2Gether_Data.Model;

public class Video
{
    public Guid? Id { get; set; }
    public string Title { get; set; }
    public string Url { get; set; }
    public string Image { get; set; } 
    public Guid? RoomId { get; set; }
    public Room? Room { get; set; }
}