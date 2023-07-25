using Watch2Gether_Data.Model;

namespace Watch2Gether_Backend.Model
{
    public class RoomDTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public Guid CreatorId { get; set; }
        public List<RoomUser>? UserIds { get; set; }
        public string? Password { get; set; }

        public static RoomDTO FromModel(Room model)
        {
            return new RoomDTO
            {
                Id = model.Id,
                Name = model.Name,
                CreatorId = model.CreatorId,
                Password = null,
                UserIds = model.RoomUsers?.ToList(),
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
                RoomUsers = UserIds,
            };
        }
    }
}
