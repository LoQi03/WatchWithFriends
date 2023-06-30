using Microsoft.EntityFrameworkCore;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Data
{
    internal class Watch2GetherDBContext : DbContext
    {
        public Watch2GetherDBContext(DbContextOptions<Watch2GetherDBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Room> Rooms { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Room>()
                .HasMany(r => r.Users)
                .WithMany(u => u.Rooms)
                .UsingEntity<Dictionary<string, object>>(
                    "RoomUser",
                    j => j
                        .HasOne<User>()
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j => j
                        .HasOne<Room>()
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j =>
                    {
                        j.HasKey("RoomId", "UserId");
                        j.HasIndex("UserId").IsUnique(false);
                        j.HasIndex("RoomId").IsUnique(false);
                    }
                );
        }
    }
}
