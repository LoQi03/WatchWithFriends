using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Watch2Gether_Backend.Model;
using WatchWithFriends.Model;
using WatchWithFriends_Data.Model;
using WatchWithFriends_Data.Repositories;

namespace WatchWithFriends.Services
{
    internal sealed class RoomService : IRoomService
    {
        private readonly IRoomRepository _roomRepository;
        private readonly IUserRepository _userRepository;
        private readonly IRoomUserRepository _roomUserRepository;
        private readonly IVideoRepository _videoRepository;

        public RoomService
            (
                IRoomRepository roomRepository,
                IUserRepository userRepository,
                IRoomUserRepository roomUserRepository,
                IVideoRepository videoRepository
            )
        {
            _roomRepository = roomRepository;
            _userRepository = userRepository;
            _roomUserRepository = roomUserRepository;
            _videoRepository = videoRepository;
        }
        public async Task<IEnumerable<RoomDTO>?> GetAllRooms()
        {
            var result = await _roomRepository.GetRoomsAsync();
            return result.Select(x => RoomDTO.FromModel(x));
        }

        public async Task UpdateRoom(RoomDTO roomDTO)
        {
            var room = roomDTO.ToModel();
            await _roomRepository.UpdateRoomAsync(room);
        }
        public async Task<RoomDTO?> CreateRoom(RoomDTO room)
        {
            if (room == null)
            {
                return null;
            }

            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hashed = HashPassword(room.Password!, salt);
            var creator = await _userRepository.GetUserByIdAsync(room.CreatorId);

            if (creator == null)
            {
                return null;
            }

            var roomDB = CreateRoom(room, salt, hashed, creator);
            await _roomRepository.InsertRoomAsync(roomDB);
            return RoomDTO.FromModel(roomDB);
        }
        public async Task<List<UserDTO>?> GetRoomUsers(RoomDTO room)
        {
            var users = new List<UserDTO>();
            var userIds = room?.RoomUsers?.Select(x => x.UserId);

            if (userIds == null)
            {
                return null;
            }

            foreach (var userId in userIds)
            {
                var user = await _userRepository.GetUserByIdAsync(userId);
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

        public async Task<RoomDTO?> DeleteRoom(Guid roomId)
        {
            var room = await _roomRepository.DeleteRoomAsync(roomId);
            if (room == null)
            {
                return null;
            }
            return RoomDTO.FromModel(room);
        }
        public async Task<RoomDTO?> GetRoom(Guid id)
        {
            var room = await _roomRepository.GetRoomByIdAsync(id);
            if (room == null)
            {
                return null;
            }
            return RoomDTO.FromModel(room);
        }
        public async Task<RoomDTO?> JoinRoom(Guid roomid, Guid userid, string contextId, string name)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomid);

            if (room == null)
            {
                return null;
            }

            var user = await _userRepository.GetUserByIdAsync(userid);

            if (user == null)
            {
                return null;
            }

            var roomUser = CreateRoomUser(userid, contextId, name, room);
            await _roomUserRepository.InsertRoomUserAsync(roomUser);
            return RoomDTO.FromModel(room);
        }
        public async Task<RoomDTO?> DisconnectRoom(string roomUserId)
        {
            var deletedUser = await _roomUserRepository.DeleteRoomUserAsync(roomUserId);

            if (deletedUser == null)
            {
                return null;
            }

            var room = await _roomRepository.GetRoomByIdAsync(deletedUser.RoomId);

            if (room == null)
            {
                return null;
            }

            if (room.CreatorId != deletedUser.UserId)
            {
                return RoomDTO.FromModel(room);
            }
            room.CreatorId = room?.RoomUsers?.FirstOrDefault(x => x.UserId != room.CreatorId)?.UserId ?? Guid.Empty;
            if (room?.CreatorId != Guid.Empty)
            {
                await _roomRepository.UpdateRoomAsync(room);
                return RoomDTO.FromModel(room);
            }
            await _roomRepository.DeleteRoomAsync(room.Id);
            return RoomDTO.FromModel(room);
        }

        private RoomUser CreateRoomUser(Guid userid, string ContextId, string name, Room room)
        {
            return new RoomUser()
            {
                Id = ContextId,
                UserId = userid,
                Room = room,
                RoomId = room.Id
            };
        }

        public async Task<RoomDTO?> GetRoomById(Guid id)
        {
            var room = await _roomRepository.GetRoomByIdAsync(id);
            if (room == null)
            {
                return null;
            }
            return RoomDTO.FromModel(room);
        }
        public async Task<RoomDTO?> NextVideo(Guid roomId)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomId);
            if (room == null || room.CurrentVideo == null)
            {
                return null;
            }
            await _videoRepository.DeleteVideoAsync(room.CurrentVideo);
            room = await _roomRepository.GetRoomByIdAsync(roomId);
            if (room.PlayList == null)
            {
                return null;
            }
            room.CurrentVideo = room.PlayList?.FirstOrDefault()?.Id;
            await _roomRepository.UpdateRoomAsync(room);
            return RoomDTO.FromModel(room);
        }

        public async Task<RoomDTO> AddVideo(Guid roomId, Video video)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomId);

            if (room == null)
            {
                throw new Exception("Room is not exist!");
            }

            video.RoomId = roomId;
            video.Room = room;

            if (room?.CurrentVideo == null)
            {
                room.CurrentVideo = video.Id;
                await _videoRepository.InsertVideoAsync(video);
            }
            else
            {
                await _videoRepository.InsertVideoAsync(video);
            }
            room = await _roomRepository.GetRoomByIdAsync(room.Id);
            return RoomDTO.FromModel(room);
        }
        public async Task<RoomDTO> DeleteVideo(Guid roomId, Guid videoId)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomId);
            if (room == null)
            {
                throw new Exception("Room is not exist!");
            }
            if (videoId == room.CurrentVideo)
            {
                await _videoRepository.DeleteVideoAsync(videoId);
                room.CurrentVideo = room.PlayList?.FirstOrDefault(v => v.Id != room.CurrentVideo)?.Id;
            }
            else
            {
                await _videoRepository.DeleteVideoAsync(videoId);
            }
            room = await _roomRepository.GetRoomByIdAsync(roomId);
            await _roomRepository.UpdateRoomAsync(room);
            return RoomDTO.FromModel(room);
        }
        public async Task<bool> VerifyRoomConnection(RoomConnectionDTO roomConnectionDTO)
        {
            var room = await _roomRepository.GetRoomByIdAsync(roomConnectionDTO.RoomId);
            if (room == null)
            {
                throw new Exception("Room is not exist!");
            }
            if (roomConnectionDTO.UserId == room.CreatorId)
            {
                return true;
            }
            if (room.Salt == null || room.PasswordHash == null)
            {
                return true;
            }
            var salt = Convert.FromBase64String(room.Salt);
            if (roomConnectionDTO.Password == null)
            {
                return false;
            }
            if (HashPassword(roomConnectionDTO.Password, salt) != room.PasswordHash)
            {
                return false;
            }
            return true;
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
