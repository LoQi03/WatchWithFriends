using Microsoft.EntityFrameworkCore;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Data
{
    internal class RoomsDBContext : DbContext
    {
        public RoomsDBContext(DbContextOptions<RoomsDBContext> options) : base(options) { }
        public DbSet<Room> Rooms { get; set; }
    }
}
