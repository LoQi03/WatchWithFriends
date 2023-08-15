using Watch2Gether_Backend.Model;

namespace Watch2Gether_Backend.Hubs
{
    public interface IRoomHub
    {
        Task VideoPlayer(VideoPlayerDTO videoPlayerDTO);
        Task SendMessage(ChatEntryDTO chatEntry);
        Task JoinRoom(Guid roomId, Guid userId, string name);
    }
}
