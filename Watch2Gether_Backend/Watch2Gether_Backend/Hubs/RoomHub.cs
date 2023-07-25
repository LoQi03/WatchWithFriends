using Microsoft.AspNetCore.SignalR;
using Watch2Gether_Backend.Model;
using Watch2Gether_Backend.Services;
using Watch2Gether_Data.Model;

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
        public async Task JoinRoom(Guid roomId,Guid userId,string name)
        {
            var room = _roomService.GetRoom(roomId);
            if(!_roomService.RoomValidition(room))
            {
                return;
            }
            _roomService.AddUserToRoom(roomId, userId,Context.ConnectionId,name);
            foreach(var user in room.UserIds)
            {
                await Clients.Clients(user.ConnectionId).SendAsync("GetRoomUser", user);
            }
        }
    }
}
