using WatchWithFriends.Extensions;
using WatchWithFriends.Hubs;
using WatchWithFriends.Middleware;
using WatchWithFriends.Misc;
using WatchWithFriends_Data.Extensions;

namespace Watch2Gether_Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            Config.Instance = builder.Configuration.Get<Config>();

            switch (builder.Environment.EnvironmentName)
            {
                case "Testing":
                    builder.Services.WatchWithFriendsData(DataBaseType.InMemory);
                    break;
                case "Development":
                    builder.Services.WatchWithFriendsData(DataBaseType.SQLServer);
                    break;
                case "Production":
                    builder.Services.WatchWithFriendsData(DataBaseType.SQLServer);
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(builder.Environment.EnvironmentName),
                        builder.Environment.EnvironmentName, "Unknown environment");
            }

            builder.Services.UseWatch2GetherBackend();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseMiddleware<ExceptionLoggingMiddleware>();
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<RoomHub>("roomHub");

                endpoints.MapControllers();
            });
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");
            app.Run();
        }
    }
}