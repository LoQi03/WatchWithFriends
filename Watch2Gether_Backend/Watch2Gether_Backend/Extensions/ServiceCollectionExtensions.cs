using Watch2Gether_Backend.Services;

namespace Watch2Gether_Backend.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void UseWatch2GetherBackend(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IImageService, ImageService>();
        }
    }
}
