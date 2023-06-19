using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Watch2Gether_Data.Model
{
    public class Room
    {
        [Required] public Guid Id { get; set; }
        [Required] public string? Name { get; set; }
        [Required] public Guid Creator { get; set; }
        [Required] public Collection<Guid> Users { get; set; }
        [Required] public string? PasswordHash { get; set; }
        [Required] public string? Salt { get; set; }
    }
}
