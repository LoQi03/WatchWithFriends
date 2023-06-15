using System.ComponentModel.DataAnnotations;


namespace Watch2Gether_Data.Model
{
    public class User
    {

        [Required] public Guid Id { get; set; }

        [Required] public string? Name { get; set; }

        [Required] public string? Email { get; set; }

        [Required] public string? PasswordHash { get; set; }

        [Required] public string? Salt { get; set; }

        [Required] public DateTime BirthDate { get; set; }

        public Guid? ImageId { get; set; }

    }
}
