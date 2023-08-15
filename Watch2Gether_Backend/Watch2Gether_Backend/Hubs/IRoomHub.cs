using Watch2Gether_Backend.Model;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Backend.Hubs
{
    public interface IRoomHub
    {
        Task VideoPlayer(VideoPlayer videoPlayerDTO);
        Task SendMessage(ChatEntryDTO chatEntry);
        Task JoinRoom(Guid roomId, Guid userId, string name);
        Task UpdateRoom(RoomDTO room);
    }
}
