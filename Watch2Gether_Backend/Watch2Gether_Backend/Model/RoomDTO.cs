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
        public IEnumerable<UserDTO>? Users { get; set; }
        public string? Password { get; set; }

        public static RoomDTO FromModel(Room model)
        {
            var users = model.Users?.Select(x => UserDTO.FromModel(x));
            return new RoomDTO
            {
                Id = model.Id,
                Name = model.Name,
                Creator = model.Creator,
                Users = users,
                Password = null
            };
        }

        public Room ToModel()
        {
            var users = Users?.Select(x => x.ToModel());
            return new Room
            {
                Id = Id,
                Name = Name,
                Creator = Creator,
                Users = users,
                PasswordHash = Password ?? "",
                Salt = string.Empty
            };
        }
    }
}
