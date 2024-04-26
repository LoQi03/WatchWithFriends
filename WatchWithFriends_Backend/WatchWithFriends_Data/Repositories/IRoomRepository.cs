using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories
{
    public interface IRoomRepository : IDisposable
    {
        Task<IEnumerable<Room>> GetRoomsAsync();
        Task<Room?> GetRoomByIdAsync(Guid RoomId);
        Task InsertRoomAsync(Room Room);
        Task<Room?> DeleteRoomAsync(Guid RoomID);
        Task UpdateRoomAsync(Room room);
        Task SaveAsync();
    }
}