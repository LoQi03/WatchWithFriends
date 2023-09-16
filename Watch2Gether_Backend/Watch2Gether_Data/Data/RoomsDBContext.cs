using Microsoft.EntityFrameworkCore;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Data
{
    internal class RoomsDBContext : DbContext
    {
        public RoomsDBContext(DbContextOptions<RoomsDBContext> options) : base(options) { }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomUser> RoomUsers { get; set;}
        public DbSet<Video> Videos { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>()
                .HasMany(r => r.RoomUsers)
                .WithOne(u => u.Room)
                .HasForeignKey(u => u.RoomId);

            modelBuilder.Entity<Room>()
               .HasMany(r => r.PlayList)
               .WithOne(u => u.Room)
               .HasForeignKey(u => u.RoomId);
        }
    }
}
