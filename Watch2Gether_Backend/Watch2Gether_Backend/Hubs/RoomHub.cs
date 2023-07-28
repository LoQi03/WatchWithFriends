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
        public async Task VideoPlayer(VideoPlayerDTO videoPlayerDTO)
        {
            var room = _roomService.DisconnectRoom(Context.ConnectionId);
            foreach (var roomUser in room?.RoomUsers)
            {
                await Clients.Clients(roomUser.Id).SendAsync("VideoPlayerHandler", videoPlayerDTO);
            }
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var room = _roomService.DisconnectRoom(Context.ConnectionId);
            var users = _roomService.GetRoomUsers(room);
            foreach (var roomUser in room?.RoomUsers)
            {
                await Clients.Clients(roomUser.Id).SendAsync("GetRoomUsers", users);
            }
        }
        public async Task SendMessage(ChatEntryDTO chatEntry)
        {
            var room = _roomService.GetRoom(chatEntry.RoomId);
            if (!room.Validition())
            {
                return;
            }
            foreach (var roomUser in room?.RoomUsers)
            {
                await Clients.Clients(roomUser.Id).SendAsync("ReciveMessage", chatEntry);
            }
        }
        public async Task JoinRoom(Guid roomId, Guid userId, string name)
        {
            var room = _roomService.GetRoom(roomId);
            if (!room.Validition())
            {
                return;
            }
            room = _roomService.JoinRoom(roomId, userId, Context.ConnectionId, name);
            var users = _roomService.GetRoomUsers(room);
            foreach (var roomUser in room?.RoomUsers)
            {
                await Clients.Clients(roomUser.Id).SendAsync("GetRoomUsers", users);
            }
        }
    }
}
