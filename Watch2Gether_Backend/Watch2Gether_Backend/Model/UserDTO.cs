using Watch2Gether_Data.Model;

namespace Watch2Gether_Backend.Model
{
    public class UserDTO
    {
        public Guid? Id { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public DateTime? BirthDate { get; set; }

        public Guid? ImageId { get; set; }

        public static UserDTO FromModel(User model)
        {
            return new UserDTO
            {
                Id = model.Id,
                Name = model.Name,
                Email = model.Email,
                BirthDate = model.BirthDate,
                ImageId = model.ImageId,
                Password = null
            };
        }

        public User ToModel()
        {
            return new User
            {
                Id = Id ?? Guid.NewGuid(),
                Name = Name,
                Email = Email,
                PasswordHash = Password ?? "",
                Salt = string.Empty,
                BirthDate = BirthDate ?? DateTime.Now,
                ImageId = ImageId
            };
        }
        public bool Validition()
        {
            if (this == null)
            {
                return false;
            }
            return true;
        }

    }
}
