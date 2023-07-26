using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories
{
    public interface IRoomUserRepository
    {
        IEnumerable<RoomUser> GetRoomUsers();
        RoomUser? GetRoomUserById(string id);
        void InsertRoomUser(RoomUser roomUser);
        RoomUser? DeleteRoomUser(string roomUserId);
        void UpdateRoomUser(RoomUser roomUser);
    }
}
