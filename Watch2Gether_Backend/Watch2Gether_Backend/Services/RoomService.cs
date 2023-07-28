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
        private readonly IRoomUserRepository _roomUserRepository;
        public RoomService(IRoomRepository roomRepository, IUserRepository userRepository, IRoomUserRepository roomUserRepository)
        {
            _roomRepository = roomRepository;
            _userRepository = userRepository;
            _roomUserRepository = roomUserRepository;
        }
        public IEnumerable<RoomDTO>? GetAllRooms()
        {
            var result = _roomRepository.GetRooms();
            return result.Select(x => RoomDTO.FromModel(x));
        }
        public RoomDTO? CreateRoom(RoomDTO room)
        {
            if (!room.Validition())
            {
                return null;
            }
            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hashed = HashPassword(room.Password!, salt);
            var creator = _userRepository.GetUserById(room.CreatorId);
            if (creator == null)
            {
                return null;
            }
            var roomDB = CreateRoom(room, salt, hashed, creator);
            _roomRepository.InsertRoom(roomDB);
            return RoomDTO.FromModel(roomDB);
        }
        public List<UserDTO> GetRoomUsers(RoomDTO room)
        {
            var users = new List<UserDTO>();
            var userIds = room?.RoomUsers?.Select(x => x.UserId);
            foreach (var userId in userIds)
            {
                var user = _userRepository.GetUserById(userId);
                users.Add(UserDTO.FromModel(user));
            }
            return users;
        }
        private Room CreateRoom(RoomDTO room, byte[] salt, string hashed, User creator)
        {
            return new Room()
            {
                Id = Guid.NewGuid(),
                Name = room.Name!,
                Salt = Convert.ToBase64String(salt),
                PasswordHash = hashed,
                CreatorId = creator.Id,
                CreationTime = DateTime.Now,
            };
        }

        public RoomDTO? DeleteRoom(Guid roomId)
        {
            var room = _roomRepository.DeleteRoom(roomId);
            if (room == null)
            {
                return null;
            }
            return RoomDTO.FromModel(room);
        }
        public RoomDTO? GetRoom(Guid id)
        {
            var room = _roomRepository.GetRoomById(id);
            if (room == null)
            {
                return null;
            }
            return RoomDTO.FromModel(room);
        }
        public RoomDTO? JoinRoom(Guid roomid, Guid userid, string contextId, string name)
        {
            var room = _roomRepository.GetRoomById(roomid);
            if (room == null)
            {
                return null;
            }
            var user = _userRepository.GetUserById(userid);
            if (user == null)
            {
                return null;
            }
            var roomUser = CreateRoomUser(userid, contextId, name, room);
            _roomUserRepository.InsertRoomUser(roomUser);
            return RoomDTO.FromModel(room);
        }
        public RoomDTO? DisconnectRoom(string roomUserId)
        {
            var deletedUser = _roomUserRepository.DeleteRoomUser(roomUserId);
            if (deletedUser == null)
            {
                return null;
            }
            var room = _roomRepository.GetRoomById(deletedUser.RoomId);
            if (room == null)
            {
                return null;
            }
            return RoomDTO.FromModel(room);
        }

        private RoomUser CreateRoomUser(Guid userid, string ContextId, string name, Room room)
        {
            return new RoomUser()
            {
                Name = name,
                Id = ContextId,
                UserId = userid,
                Room = room,
                RoomId = room.Id
            };
        }

        public RoomDTO? GetRoomById(Guid id)
        {
            var room = _roomRepository.GetRoomById(id);
            if (room == null)
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
