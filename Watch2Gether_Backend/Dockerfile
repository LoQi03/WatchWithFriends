# Build stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY *.sln ./
COPY ["Watch2Gether_Backend/Watch2Gether_Backend.csproj", "Watch2Gether_Backend/"]
COPY ["Watch2Gether_Data/Watch2Gether_Data.csproj", "Watch2Gether_Data/"]
RUN dotnet restore

COPY . .
WORKDIR "/src/Watch2Gether_Backend"
RUN dotnet build -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

COPY ["Watch2Gether_Backend/Assets", "Assets/"]

# Install libgdiplus
RUN apt-get update && \
    apt-get install -y libgdiplus && \
    ln -s /usr/lib/libgdiplus.so /usr/lib/gdiplus.dll

# Set DOTNET_SYSTEM_DRAWING_COMMON to enable System.Drawing.Common on Linux
ENV DOTNET_SYSTEM_DRAWING_COMMON=true

ENTRYPOINT ["dotnet", "Watch2Gether_Backend.dll"]
