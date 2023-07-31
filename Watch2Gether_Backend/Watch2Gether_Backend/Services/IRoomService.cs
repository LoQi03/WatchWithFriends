using Watch2Gether_Backend.Model;

namespace Watch2Gether_Backend.Services
{
    public interface IRoomService
    {
        IEnumerable<RoomDTO>? GetAllRooms();
        RoomDTO? CreateRoom(RoomDTO room);
        RoomDTO? DeleteRoom(Guid roomId);
        RoomDTO? GetRoom(Guid id);
        RoomDTO? JoinRoom(Guid roomid, Guid userid, string connectionId, string name);
        RoomDTO? GetRoomById(Guid id);
        RoomDTO? DisconnectRoom(string roomUserId);
        List<UserDTO>? GetRoomUsers(RoomDTO room);
    }
}
