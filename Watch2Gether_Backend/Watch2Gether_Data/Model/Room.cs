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
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid Creator { get; set; }
        public ICollection<User> Users { get; set; }
        public string? PasswordHash { get; set; }
        public DateTime CreationTime { get; set; }
        public string? Salt { get; set; }
    }
}
