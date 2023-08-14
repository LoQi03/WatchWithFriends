using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories
{
    public interface IRoomRepository : IDisposable
    {
        Task<IEnumerable<Room>> GetRoomsAsync();
        Task<Room?> GetRoomByIdAsync(Guid RoomId);
        Task InsertRoomAsync(Room Room);
        Task<Room?> DeleteRoomAsync(Guid RoomID);
        Task<Room?> UpdateRoomAsync(Room room);
        Task SaveAsync();
    }
}