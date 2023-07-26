using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories
{
    public interface IRoomRepository : IDisposable
    {
        IEnumerable<Room> GetRooms();
        Room? GetRoomById(Guid RoomId);
        void InsertRoom(Room Room);
        Room? DeleteRoom(Guid RoomID);
        void UpdateRoom(Room Room);
        void Save();
    }
}
