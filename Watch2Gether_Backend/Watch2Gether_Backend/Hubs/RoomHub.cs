using Microsoft.AspNetCore.SignalR;
using Watch2Gether_Backend.Model;
using Watch2Gether_Backend.Services;

namespace Watch2Gether_Backend.Hubs
{
    public class RoomHub : Hub, IRoomHub
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
            var room = await _roomService.GetRoom(videoPlayerDTO.RoomId);
            foreach (var roomUser in room?.RoomUsers)
            {
                await Clients.Clients(roomUser.Id).SendAsync("VideoPlayerHandler", videoPlayerDTO);
            }
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var room = await _roomService.DisconnectRoom(Context.ConnectionId);
            var users = await _roomService.GetRoomUsers(room);
            foreach (var roomUser in room?.RoomUsers)
            {
                await Clients.Clients(roomUser.Id).SendAsync("GetRoomUsers", users);
            }
        }
        public async Task SendMessage(ChatEntryDTO chatEntry)
        {
            var room = await _roomService.GetRoom(chatEntry.RoomId);
            if (room == null)
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
            var room = await _roomService.GetRoom(roomId);
            if (room == null)
            {
                return;
            }
            room = await _roomService.JoinRoom(roomId, userId, Context.ConnectionId, name);
            var users = await _roomService.GetRoomUsers(room);
            foreach (var roomUser in room?.RoomUsers)
            {
                await Clients.Clients(roomUser.Id).SendAsync("GetRoomUsers", users);
            }
        }
    }
}
