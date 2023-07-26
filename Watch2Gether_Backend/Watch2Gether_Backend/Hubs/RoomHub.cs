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
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var room = _roomService.DisconnectRoom(Context.ConnectionId);
            var users = _roomService.GetRoomUsers(room);
            foreach (var user in room?.RoomUsers)
            {
                await Clients.Clients(user.Id).SendAsync("GetRoomUsers", users);
            }
        }
        public async Task SendMessage(ChatEntryDTO chatEntry)
        {
            var room = _roomService.GetRoom(chatEntry.RoomId);
            if (!_roomService.RoomValidition(room))
            {
                return;
            }
            foreach (var user in room?.RoomUsers)
            {
                await Clients.Clients(user.Id).SendAsync("ReciveMessage", chatEntry);
            }
        }
        public async Task JoinRoom(Guid roomId,Guid userId,string name)
        {
            var room = _roomService.GetRoom(roomId);
            if(!_roomService.RoomValidition(room))
            {
                return;
            }
            room = _roomService.JoinRoom(roomId, userId,Context.ConnectionId, name);
            var users =_roomService.GetRoomUsers(room);
            foreach (var user in room?.RoomUsers)
            {
                await Clients.Clients(user.Id).SendAsync("GetRoomUsers", users);
            } 
        }
    }
}
