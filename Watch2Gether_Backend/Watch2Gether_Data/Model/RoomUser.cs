using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Watch2Gether_Data.Model
{
    public class RoomUser
    {
        public string Id { get; set; }
        public Guid UserId { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
    }
}
