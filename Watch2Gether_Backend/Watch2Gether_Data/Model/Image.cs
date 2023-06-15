using System.ComponentModel.DataAnnotations;

namespace Watch2Gether_Data.Model
{
    public class Image
    {
        [Required] public Guid Id { get; set; }
        [Required] public Byte[]? Data { get; set; }
    }
}
