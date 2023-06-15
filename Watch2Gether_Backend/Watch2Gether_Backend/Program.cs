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
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    policy =>
                    {
                        policy.AllowAnyOrigin();
                        policy.AllowAnyHeader();
                        policy.AllowAnyMethod();
                    });
            });

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

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}