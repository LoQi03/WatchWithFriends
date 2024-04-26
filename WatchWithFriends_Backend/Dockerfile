FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS http://*:5000
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
ARG Configuration=Release
WORKDIR /src
COPY *.sln ./
COPY ["/WatchWithFriends_Backend/WatchWithFriends.csproj", "WatchWithFriends_Backend/"]
COPY ["/WatchWithFriends_Data/WatchWithFriends_Data.csproj", "WatchWithFriends_Data/"]
COPY ["/WatchWithFriends_uTests/WatchWithFriends_uTests.csproj", "WatchWithFriends_uTests/"]
RUN dotnet restore
COPY . .
WORKDIR /src/WatchWithFriends_Backend
RUN dotnet build -c $Configuration -o /app

FROM builder AS publish
ARG Configuration=Release
RUN dotnet publish -c $Configuration -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .

COPY ["WatchWithFriends_Backend/Assets", "Assets/"]

ENTRYPOINT ["dotnet", "WatchWithFriends.dll"]