FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS http://*:5000
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS builder
ARG Configuration=Release
WORKDIR /src
COPY *.sln ./
COPY ["/Watch2Gether_Backend/Watch2Gether_Backend.csproj", "Watch2Gether_Backend/"]
COPY ["/Watch2Gether_Data/Watch2Gether_Data.csproj", "Watch2Gether_Data/"]
RUN dotnet restore
COPY . .
WORKDIR /src/Watch2Gether_Backend
RUN dotnet build -c $Configuration -o /app

FROM builder AS publish
ARG Configuration=Release
RUN dotnet publish -c $Configuration -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Watch2Gether_Backend.dll"]