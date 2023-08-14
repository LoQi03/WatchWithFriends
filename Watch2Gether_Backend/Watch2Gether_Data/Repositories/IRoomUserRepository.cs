using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories
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
