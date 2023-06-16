using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using Watch2Gether_Backend.Extensions;
using Watch2Gether_Backend.Misc;
using Watch2Gether_Data.Extensions;

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
                    builder.Services.UseWatch2GetherData(DataBaseType.InMemory);
                    break;
                case "Development":
                    builder.Services.UseWatch2GetherData(DataBaseType.SQLServer);
                    break;
                case "Production":
                    builder.Services.UseWatch2GetherData(DataBaseType.SQLServer);
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

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors();

            app.MapControllers();

            app.Run();
        }
    }
}