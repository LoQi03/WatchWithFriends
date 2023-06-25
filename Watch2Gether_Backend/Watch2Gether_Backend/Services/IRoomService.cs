using Watch2Gether_Backend.Model;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Backend.Services
{
    public interface IRoomService
    {
        IEnumerable<Room> GetAllRooms();
        RoomDTO? CreateRoom(RoomDTO room);
        RoomDTO? DeleteRoom(Guid roomId);
        RoomDTO? GetRoom(Guid id);
        RoomDTO? AddUserToRoom(Guid roomid, Guid userid);
    }
}
