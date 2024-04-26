using Watch2Gether_Backend.Model;
using WatchWithFriends.Model;

namespace WatchWithFriends.Hubs
{
    public interface IRoomHub
    {
        Task VideoPlayerHandler(VideoPlayer videoPlayerDTO, string senderId);
        Task SendMessage(ChatEntryDTO chatEntry);
        Task JoinRoom(Guid roomId, Guid userId, string name, string connId);
        Task UpdateRoom(RoomDTO room);
        Task HandleNewUserJoinToRoom(string connId, VideoPlayer videoPlayer);
    }
}
