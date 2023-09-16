using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories
{
    public interface IRoomUserRepository
    {
        Task<IEnumerable<RoomUser>> GetRoomUsersAsync();
        Task<RoomUser?> GetRoomUserByIdAsync(string id);
        Task InsertRoomUserAsync(RoomUser roomUser);
        Task<RoomUser?> DeleteRoomUserAsync(string roomUserId);
        Task UpdateRoomUserAsync(RoomUser roomUser);
    }
}
