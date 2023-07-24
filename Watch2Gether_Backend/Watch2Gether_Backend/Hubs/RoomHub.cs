using Microsoft.AspNetCore.SignalR;
using Watch2Gether_Backend.Model;
using Watch2Gether_Backend.Services;

namespace Watch2Gether_Backend.Hubs
{
    public sealed class RoomHub : Hub
    {
        private readonly IRoomService _roomService;
        public RoomHub(IRoomService roomService) 
        {
            _roomService = roomService;
        }
        public Task BroadcastMessage(ChatEntryDTO chatEntry)
        {
            return Clients.All.SendAsync("ReciveMessage", chatEntry);
        }
    }
}
