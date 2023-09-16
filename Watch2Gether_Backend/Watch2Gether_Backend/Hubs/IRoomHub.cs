using Watch2Gether_Backend.Model;
using WatchWithFriends.Model;

namespace WatchWithFriends.Hubs
{
    public interface IRoomHub
    {
        Task VideoPlayer(VideoPlayer videoPlayerDTO);
        Task SendMessage(ChatEntryDTO chatEntry);
        Task JoinRoom(Guid roomId, Guid userId, string name);
        Task UpdateRoom(RoomDTO room);
    }
}
