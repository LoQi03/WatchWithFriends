using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Text;
using Watch2Gether_Backend.Misc;
using Watch2Gether_Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using Watch2Gether_Backend.Hubs;

namespace Watch2Gether_Backend.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void UseWatch2GetherBackend(this IServiceCollection services)
        {
            services.AddSignalR();
            services.AddControllers()
                    .AddJsonOptions(options => SetJsonOption(options));

            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(options => SetSwaggerGenOptions(options));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options => SetJwtBearerOptions(options));
            services.AddAuthorization();

            services.AddCors(options => SetCorseOptions(options));

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
        private static void SetCorseOptions(CorsOptions options)
        {

            options.AddDefaultPolicy(
                policy =>
                {
                    policy
                        .WithOrigins
                        (
                            "http://localhost:3000",
                            "http://localhost:5001"
                        ) 
                        .AllowCredentials()
                        .AllowAnyHeader()
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
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Watch2GetherAPI", Version = "v1" });
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
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
