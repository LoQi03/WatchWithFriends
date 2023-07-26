﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;
using Watch2Gether_Data.Repositories;
using Watch2Gether_Data.Repositories.Core;

namespace Watch2Gether_Data.Extensions
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
                    services.AddDbContext<Watch2GetherDBContext>(options =>
                    {
                        options.UseInMemoryDatabase(databaseName: "Watch2Gether");
                        options.EnableSensitiveDataLogging(true);
                    });
                    break;
                case DataBaseType.SQLServer:
                    var IConfigugration = services.BuildServiceProvider().GetRequiredService<IConfiguration>();
                    var connstring = IConfigugration.GetConnectionString("watch2gether");
                    services.AddDbContext<Watch2GetherDBContext>(options =>
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
        }
    }
}
