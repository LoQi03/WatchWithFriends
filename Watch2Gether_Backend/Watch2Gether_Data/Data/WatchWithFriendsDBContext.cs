using Microsoft.EntityFrameworkCore;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Data
{
    internal class WatchWithFriendsDBContext : DbContext
    {
        public WatchWithFriendsDBContext(DbContextOptions<WatchWithFriendsDBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
