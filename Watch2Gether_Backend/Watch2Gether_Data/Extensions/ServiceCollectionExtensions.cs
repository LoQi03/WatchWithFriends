using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WatchWithFriends_Data.Data;
using WatchWithFriends_Data.Repositories;
using WatchWithFriends_Data.Repositories.Core;

namespace WatchWithFriends_Data.Extensions
{
    public enum DataBaseType
    {
        InMemory,
        SQLServer
    }
    public static class ServiceCollectionExtensions
    {
        public static void UseWatch2GetherData(this IServiceCollection services, DataBaseType dataBaseType)
        {
            switch (dataBaseType)
            {
                case DataBaseType.InMemory:
                    services.AddDbContext<WatchWithFriendsDBContext>(options =>
                    {
                        options.UseInMemoryDatabase(databaseName: "watchwithfriendsRooms");
                        options.EnableSensitiveDataLogging(true);
                    });
                    break;
                case DataBaseType.SQLServer:
                    var IConfigugration = services.BuildServiceProvider().GetRequiredService<IConfiguration>();
                    var connstring = IConfigugration.GetConnectionString("watchwithfriends");
                    services.AddDbContext<WatchWithFriendsDBContext>(options =>
                    {
                        options.UseSqlServer(connstring);
                    });
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(dataBaseType), dataBaseType, null);
            }
            services.AddDbContext<RoomsDBContext>(options => options.UseInMemoryDatabase("rooms"));
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IImageRepository, ImageRepository>();
            services.AddScoped<IRoomRepository, RoomRepository>();
            services.AddScoped<IRoomUserRepository, RoomUserRepository>();
            services.AddScoped<IVideoRepository, VideoRepository>();
        }
    }
}
