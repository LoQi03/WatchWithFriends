using Watch2Gether_Backend.Model;

namespace Watch2Gether_Backend.Services
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomDTO>?> GetAllRooms();
        Task<RoomDTO?> CreateRoom(RoomDTO room);
        Task<RoomDTO?> DeleteRoom(Guid roomId);
        Task<RoomDTO?> GetRoom(Guid id);
        Task<RoomDTO?> JoinRoom(Guid roomid, Guid userid, string connectionId, string name);
        Task<RoomDTO?> GetRoomById(Guid id);
        Task<RoomDTO?> DisconnectRoom(string roomUserId);
        Task<List<UserDTO>?> GetRoomUsers(RoomDTO room);
        Task<RoomDTO> AddVideo(Guid roomId, Video video);
        Task UpdateRoom(RoomDTO roomDTO);
        Task<RoomDTO> DeleteVideo(Guid roomId, Guid videoId);
        Task<RoomDTO?> NextVideo(Guid roomId);
    }
}
