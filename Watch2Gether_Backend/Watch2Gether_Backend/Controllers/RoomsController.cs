using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchWithFriends.Hubs;
using Watch2Gether_Backend.Model;
using WatchWithFriends.Services;
using WatchWithFriends.Model;

namespace WatchWithFriends.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IRoomHub _roomHub;
        public RoomsController(IRoomService roomService, IRoomHub roomHub)
        {
            _roomHub = roomHub;
            _roomService = roomService;
        }
        [HttpGet("get-rooms",Name = nameof(GetRooms)),Authorize]
        public async Task<ActionResult<IEnumerable<RoomDTO>?>> GetRooms()
        {
            var rooms = await _roomService.GetAllRooms();
            return Ok(rooms);
        }
        [HttpGet("get-room/{id}",Name = nameof(GetRoom)), Authorize]
        public async Task<ActionResult<RoomDTO>> GetRoom(Guid id)
        {
            var room = await _roomService.GetRoomById(id);
            if (room is null)
            {
                return NotFound();
            }
            return Ok(room);
        }
        [HttpPost("create-room",Name = nameof(CreateRoom)), Authorize]
        public async Task<ActionResult<RoomDTO>> CreateRoom(RoomDTO room)
        {
            var result = await _roomService.CreateRoom(room);
            if (result is null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        [HttpDelete("delete-room/{id}",Name = nameof(DeleteRoom)), Authorize]
        public async Task<ActionResult<RoomDTO>> DeleteRoom(Guid id)
        {
            var result = await _roomService.DeleteRoom(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPost("add-video/{id}",Name = nameof(AddVideoToRoom)), Authorize]
        public async Task<ActionResult<RoomDTO>> AddVideoToRoom(Guid id, Video video)
        {
            video.Id = Guid.NewGuid();
            var result = await _roomService.AddVideo(id, video);
            if (result is null)
            {
                return BadRequest();
            }
            await _roomHub.UpdateRoom(result);
            return Ok();
        }
        [HttpDelete("delete-video/{id}/videos/{videoId}",Name = nameof(DeleteVideoFromRoom)), Authorize]
        public async Task<ActionResult<RoomDTO>> DeleteVideoFromRoom(Guid id, Guid videoId)
        {
            var result = await _roomService.DeleteVideo(id, videoId);
            if (result is null)
            {
                return BadRequest();
            }
            await _roomHub.UpdateRoom(result);
            return Ok(result);
        }
        [HttpPost("next-video/{id}",Name = nameof(NextVideoForRoom)), Authorize]
        public async Task<ActionResult<RoomDTO>> NextVideoForRoom(Guid id)
        {
            var result = await _roomService.NextVideo(id);
            if (result is null)
            {
                return BadRequest();
            }
            await _roomHub.UpdateRoom(result);
            return Ok(result);
        }
        [HttpPost("verify-room",Name = nameof(VerifyRoomConnection)), Authorize]
        public async Task<ActionResult<bool>> VerifyRoomConnection(RoomConnectionDTO roomConnectionDTO)
        {
            var result = await _roomService.VerifyRoomConnection(roomConnectionDTO);
            return Ok(result);
        }
        [HttpPost("join-room/{roomId}/user/{connId}",Name = nameof(JoinRoom))]
        public async Task<ActionResult> JoinRoom(string roomId, string connId, UserDTO userDTO)
        {
            if(userDTO.Id == null || userDTO.Name == null)
            {
                return NotFound();
            }
            await _roomHub.JoinRoom(Guid.Parse(roomId), userDTO.Id.Value, userDTO.Name, connId);
            return Ok();
        }
        [HttpPost("handle-room-state/{senderId}", Name = nameof(HandleRoomState))]
        public async Task<ActionResult> HandleRoomState(VideoPlayer videoPlayer, string senderId)
        {
            await _roomHub.VideoPlayer(videoPlayer, senderId);
            return Ok();
        }
        [HttpPost("send-message",Name =nameof(SendMessage))]
        public async Task<ActionResult> SendMessage(ChatEntryDTO chatEntry)
        {
            await _roomHub.SendMessage(chatEntry);
            return Ok();
        }
        [HttpPost("handle-room-new-user/{connId}",Name = nameof(HandleNewUserJoinToRoom))]
        public async Task<ActionResult> HandleNewUserJoinToRoom(string connId, VideoPlayer videoPlayer)
        {
            await _roomHub.HandleNewUserJoinToRoom(connId, videoPlayer);
            return Ok();
        }
    }
}
