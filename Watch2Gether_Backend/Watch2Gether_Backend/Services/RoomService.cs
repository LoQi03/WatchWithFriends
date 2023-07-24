using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.SignalR;
using System.Security.Cryptography;
using Watch2Gether_Backend.Hubs;
using Watch2Gether_Backend.Model;
using Watch2Gether_Data.Model;
using Watch2Gether_Data.Repositories;

namespace Watch2Gether_Backend.Services
{
    internal sealed class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHubContext<RoomHub> _chatHubContext;
        public RoomService(IRoomRepository roomRepository, IUserRepository userRepository, IHubContext<RoomHub> chatHubContext)
        {
            _roomRepository = roomRepository;
            _userRepository = userRepository;
            _chatHubContext = chatHubContext;
        }
        public IEnumerable<Room> GetAllRooms()
        {
            return _roomRepository.GetRooms();
        }
        public RoomDTO? CreateRoom(RoomDTO room)
        {
            if (room is null)
            {
                return null;
            }
            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hashed = HashPassword(room.Password!, salt);
            var creator = _userRepository.GetUserById(room.Creator);
            if (creator is null)
            {
                return null;
            } 
            var users = new List<User>() { creator };
            var roomDB = CreateRoom(room, salt, hashed, users);
            _roomRepository.InsertRoom(roomDB);
            return RoomDTO.FromModel(roomDB);
        }

        private Room CreateRoom(RoomDTO room, byte[] salt, string hashed, List<User> users)
        {
            return new Room()
            {
                Id = Guid.NewGuid(),
                Name = room.Name!,
                Salt = Convert.ToBase64String(salt),
                PasswordHash = hashed,
                Creator = room.Creator,
                Users = users,
                CreationTime = DateTime.Now,
            };
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
            var room = _roomRepository.GetRoomById(id);
            if (room is null) 
            {
                return null;
            } 
            return RoomDTO.FromModel(room);
        }
        public RoomDTO? AddUserToRoom(Guid roomid, Guid userid)
        {
            var room = _roomRepository.GetRoomById(roomid);
            if (room is null) 
            {
                return null;
            }
            if (room.Users?.Count() > 0)
            {
                return null;
            } 
            var users = room.Users?.ToList();
            var user = _userRepository.GetUserById(userid);
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
            var room = _roomRepository.GetRoomById(id);
            if (room is null)
            {
                return null;
            } 
            return RoomDTO.FromModel(room);
        }
        private string HashPassword(string password, byte[] salt)
        {
            var hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return hashed;
        }
    }
}
