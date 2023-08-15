using Watch2Gether_Data.Model;

namespace Watch2Gether_Backend.Model
{
    public class RoomDTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public Guid CreatorId { get; set; }
        public List<RoomUser>? RoomUsers { get; set; }
        public string? Password { get; set; }
        public List<Video>? PlayList { get; set; }
        public Guid? CurrentVideo { get; set; }

        public static RoomDTO FromModel(Room model)
        {
            return new RoomDTO
            {
                Id = model.Id,
                Name = model.Name,
                CreatorId = model.CreatorId,
                Password = null,
                RoomUsers = model.RoomUsers?.ToList(),
                CurrentVideo = model.CurrentVideo,
                PlayList = model.PlayList?.ToList(),
            };
        }

        public Room ToModel()
        {
            return new Room
            {
                Id = Id,
                Name = Name,
                CreatorId = CreatorId,
                PasswordHash = Password ?? "",
                Salt = string.Empty,
                RoomUsers = RoomUsers,
                CurrentVideo = CurrentVideo,
                PlayList = PlayList?.ToList(),
            };
        }
    }
}
