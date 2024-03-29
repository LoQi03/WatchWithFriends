using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text;
using WatchWithFriends.Misc;
using WatchWithFriends.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using WatchWithFriends.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace WatchWithFriends.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void UseWatch2GetherBackend(this IServiceCollection services)
        {
            services.AddSignalR().AddNewtonsoftJsonProtocol(options => SetSignalRJsonProtocolOption(options));
            services.AddControllers()
                    .AddJsonOptions(options => SetJsonOption(options));

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options => SetSwaggerGenOptions(options));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options => SetJwtBearerOptions(options));
            services.AddAuthorization();

            services.AddCors(options => SetCorsOptions(options));

            // Dependencies
            services.AddScoped<IRoomService, RoomService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IRoomHub, RoomHub>();
        }
        private static void SetJsonOption(JsonOptions options)
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        }
        private static void SetSignalRJsonProtocolOption(NewtonsoftJsonHubProtocolOptions options)
        {
            options.PayloadSerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }
        private static void SetCorsOptions(CorsOptions options)
        {

            options.AddDefaultPolicy(
                policy =>
                {
                    policy
                        .WithOrigins
                        (
                            "http://192.168.0.200:5173",
                            "https://watchwithfriends.mt-dev.site",
                            "http://localhost:5173",
                            "http://127.0.0.1:5173"
                        ) 
                        .AllowCredentials()
                        .AllowAnyHeader()
                        .WithExposedHeaders("Set-Cookie","set-cookie")
                        .AllowAnyMethod();
                });

        }
        private static void SetJwtBearerOptions(JwtBearerOptions options)
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Config.Instance?.Jwt?.Issuer,
                ValidAudience = Config.Instance?.Jwt?.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config.Instance?.Jwt?.Key ?? string.Empty))
            };
        }
        private static void SetSwaggerGenOptions(SwaggerGenOptions options)
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "WatchWithFriendsAPI", Version = "v1" });
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            options.AddServer(new OpenApiServer { Url = "http://localhost:5000/" });
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });
        }
    }

}
