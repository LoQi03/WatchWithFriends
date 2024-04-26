# Futtatási útmutató

## Futtatás Docker nélkül

A program futtatásához két fontos keretrendszer kell telepíteni.

1. .NET 8 sdk: https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-8.0.204-windows-x64-installer

2. node js 18.20.2: https://nodejs.org/en/download

### Kliens futtatása

1. A klienshez tartozó csomagok telepítése: `npm install`
2. A kliens buildelése: `npm run build`
3. Kliens futtatása: `npm run preview`

### Szerver futtatása

1. A szerverhez tartozó csomagok telepítése: `dotnet restore`
2. A szerver buildelése: `dotnet build -c Release -o /app`
3. A szerver publikálása: `dotnet publish -c Release -o /app`
4. A szerver futtatása: `dotnet WatchWithFriends.dll`

## Futtatás Docker segítségével

Docker letöltése Windowsra: https://www.docker.com/products/docker-desktop/

Docker letöltése Linuxon:

1. Docker telepítése: `sudo apt install docker`
2. Docker compose telepítése: `sudo apt install docker-compose`

A backend és a frontend-nél és használhatjuk a compose filet, így a következő parancsal futtathatjuk őket: `docker compose up -d`
