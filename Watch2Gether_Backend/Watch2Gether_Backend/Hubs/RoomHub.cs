using Microsoft.AspNetCore.SignalR;
using Watch2Gether_Backend.Model;
using WatchWithFriends.Model;
using WatchWithFriends.Services;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends.Hubs
{
    public class RoomHub : Hub, IRoomHub
    {
        private readonly IRoomService _roomService;
        private readonly IHubContext<RoomHub> _roomContext;
        public RoomHub(IRoomService roomService, IHubContext<RoomHub> roomContext)
        {
            _roomService = roomService;
            _roomContext = roomContext;
        }
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
        public async Task UpdateRoom(RoomDTO room)
        {
            if (room?.RoomUsers == null)
            {
                return;
            }
            foreach (var roomUser in room.RoomUsers)
            {
                await _roomContext.Clients.Clients(roomUser.Id).SendAsync("UpdateRoomHandler", room);
            }
        }
        public async Task VideoPlayer(VideoPlayer videoPlayer, string senderId)
        {
            var room = await _roomService.GetRoom(videoPlayer.RoomId);
            if (room?.RoomUsers == null)
            {
                return;
            }
            foreach (var roomUser in room.RoomUsers)
            {
                if (roomUser.Id == senderId) continue;
                await _roomContext.Clients.Clients(roomUser.Id).SendAsync("VideoPlayerHandler", videoPlayer);
            }
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var room = await _roomService.DisconnectRoom(Context.ConnectionId);
            if (room == null)
            {
                return;
            }
            var users = await _roomService.GetRoomUsers(room);
            if (room.RoomUsers == null)
            {
                return;
            }
            foreach (var roomUser in room.RoomUsers)
            {
                await _roomContext.Clients.Clients(roomUser.Id).SendAsync("GetRoomUsers", users);
            }
        }
        public async Task SendMessage(ChatEntryDTO chatEntry)
        {
            var room = await _roomService.GetRoom(chatEntry.RoomId);
            if (room == null)
            {
                return;
            }
            if (room.RoomUsers == null)
            {
                return;
            }
            foreach (var roomUser in room.RoomUsers)
            {
                await _roomContext.Clients.Clients(roomUser.Id).SendAsync("ReciveMessage", chatEntry);
            }
        }
        public async Task JoinRoom(Guid roomId, Guid userId, string name, string connId)
        {
            var room = await _roomService.GetRoom(roomId);
            if (room == null)
            {
                return;
            }
            room = await _roomService.JoinRoom(roomId, userId, connId, name);
            var users = await _roomService.GetRoomUsers(room);
            if (room.RoomUsers == null)
            {
                return;
            }
            foreach (var roomUser in room.RoomUsers)
            {
                await _roomContext.Clients.Clients(roomUser.Id).SendAsync("GetRoomUsers", users);
            }
        }
        public Task HandleNewUserJoinToRoom(string connId, VideoPlayer videoPlayer)
        {
            return _roomContext.Clients.Clients(connId).SendAsync("VideoPlayerHandler", videoPlayer);
        }

    }
}
