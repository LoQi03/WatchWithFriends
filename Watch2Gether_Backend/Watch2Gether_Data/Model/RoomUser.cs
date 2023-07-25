using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Watch2Gether_Data.Model
{
    public class RoomUser
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
    }
}
