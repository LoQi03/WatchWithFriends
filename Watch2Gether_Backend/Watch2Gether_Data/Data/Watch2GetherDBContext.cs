using Microsoft.EntityFrameworkCore;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Data
{
    internal class Watch2GetherDBContext : DbContext
    {
        public Watch2GetherDBContext(DbContextOptions<Watch2GetherDBContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
