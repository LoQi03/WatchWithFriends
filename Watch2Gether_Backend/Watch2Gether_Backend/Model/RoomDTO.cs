using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Backend.Model
{
    public class RoomDTO
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public Guid Creator { get; set; }
        public Collection<Guid>? Users { get; set; }
        public string? Password { get; set; }

        public static RoomDTO FromModel(Room model)
        {
            return new RoomDTO
            {
                Id = model.Id,
                Name = model.Name,
                Creator = model.Creator,
                Users = model.Users,
                Password = null
            };
        }

        public Room ToModel()
        {
            return new Room
            {
                Id = Id,
                Name = Name,
                Creator = Creator,
                Users = Users,
                PasswordHash = Password ?? "",
                Salt = string.Empty
            };
        }
    }
}
