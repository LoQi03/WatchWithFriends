using Microsoft.AspNetCore.SignalR;
using Watch2Gether_Backend.Model;
using Watch2Gether_Backend.Services;

namespace Watch2Gether_Backend.Hubs
{
    public class RoomHub : Hub
    {
        private readonly IRoomService _roomService;
        public RoomHub(IRoomService roomService) 
        {
            _roomService = roomService;
        }
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
        public Task SendMessage(ChatEntryDTO chatEntry)
        {
            return Clients.All.SendAsync("ReciveMessage", chatEntry);
        }
    }
}
