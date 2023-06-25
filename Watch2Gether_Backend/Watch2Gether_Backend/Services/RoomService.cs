using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Watch2Gether_Backend.Model;
using Watch2Gether_Data.Model;
using Watch2Gether_Data.Repositories;

namespace Watch2Gether_Backend.Services
{
    internal class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;
        public RoomService(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }
        public IEnumerable<Room> GetAllRooms()
        {
            return _roomRepository.GetRooms();
        }
        public RoomDTO? CreateRoom(RoomDTO room)
        {
            if (room is null) return null;
            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hashed = HashPassword(room.Password ?? "", salt);
            var users = new List<Guid>() { room.Creator };
            var roomDB = new Room()
            {
                Id = Guid.NewGuid(),
                Name = room.Name,
                Salt = Convert.ToBase64String(salt),
                PasswordHash = hashed,
                Creator = room.Creator,
                Users = users,
            };
            _roomRepository.InsertRoom(roomDB);
            return RoomDTO.FromModel(roomDB);
        }
        public RoomDTO? DeleteRoom(Guid roomId)
        {
            var room = _roomRepository.DeleteRoom(roomId);
            if (room is null) return null;
            return RoomDTO.FromModel(room);
        }
        public RoomDTO? GetRoom(Guid id)
        {
            var room = _roomRepository.GetRoomByID(id);
            if (room is null) return null;
            return RoomDTO.FromModel(room);
        }
        public RoomDTO? AddUserToRoom(Guid roomid, Guid userid)
        {
            var room = _roomRepository.GetRoomByID(roomid);
            if (room is null) return null;
            if (room.Users?.Count() > 0) return null;
            List<Guid>? users = room.Users?.ToList();
            users?.Add(userid);
            room.Users = users;
            _roomRepository.UpdateRoom(room);
            return RoomDTO.FromModel(room);
        }
        private string HashPassword(string password, byte[] salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return hashed;
        }
    }
}
