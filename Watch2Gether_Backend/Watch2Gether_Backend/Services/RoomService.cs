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
        private readonly IUserRepository _userRepository;
        public RoomService(IRoomRepository roomRepository, IUserRepository userRepository)
        {
            _roomRepository = roomRepository;
            _userRepository = userRepository;
        }
        public IEnumerable<Room> GetAllRooms()
        {
            return _roomRepository.GetRooms();
        }
        public RoomDTO? CreateRoom(RoomDTO room)
        {
            if (room is null) return null;
            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hashed = HashPassword(room.Password!, salt);
            var creator = _userRepository.GetUserByID(room.Creator);
            if (creator is null) return null;
            var users = new List<User>() { creator };
            var roomDB = new Room()
            {
                Id = Guid.NewGuid(),
                Name = room.Name!,
                Salt = Convert.ToBase64String(salt),
                PasswordHash = hashed,
                Creator = room.Creator,
                Users = users,
                CreationTime = DateTime.Now,
            };
            _roomRepository.InsertRoom(roomDB);
            return RoomDTO.FromModel(roomDB);
        }
        public RoomDTO? DeleteRoom(Guid roomId)
        {
            var room = _roomRepository.DeleteRoom(roomId);
            if (room is null)
            {
                return null;
            } 
            return RoomDTO.FromModel(room);
        }
        public RoomDTO? GetRoom(Guid id)
        {
            var room = _roomRepository.GetRoomByID(id);
            if (room is null) 
            {
                return null;
            } 
            return RoomDTO.FromModel(room);
        }
        public RoomDTO? AddUserToRoom(Guid roomid, Guid userid)
        {
            var room = _roomRepository.GetRoomByID(roomid);
            if (room is null) 
            {
                return null;
            }
            if (room.Users?.Count() > 0)
            {
                return null;
            } 
            var users = room.Users?.ToList();
            var user = _userRepository.GetUserByID(userid);
            if (user is null)
            {
                return null;
            } 
            users?.Add(user);
            room.Users = users;
            _roomRepository.UpdateRoom(room);
            return RoomDTO.FromModel(room);
        }
        public RoomDTO? GetRoomById(Guid id)
        {
            var room = _roomRepository.GetRoomByID(id);
            if (room is null)
            {
                return null;
            } 
            return RoomDTO.FromModel(room);
        }
        private static string HashPassword(string password, byte[] salt)
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
