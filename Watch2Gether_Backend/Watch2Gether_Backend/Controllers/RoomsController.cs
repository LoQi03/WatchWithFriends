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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoomDTO>?>> GetRooms()
        {
            var rooms = await _roomService.GetAllRooms();
            return Ok(rooms);
        }
        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult> GetRoom(Guid id)
        {
            var room = await _roomService.GetRoomById(id);
            if (room is null)
            {
                return NotFound();
            }
            return Ok(room);
        }
        [HttpPost]
        public async Task<ActionResult> CreateRoom(RoomDTO room)
        {
            var result = await _roomService.CreateRoom(room);
            if (result is null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult> DeleteRoom(Guid id)
        {
            var result = await _roomService.DeleteRoom(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [HttpPost("{id}/Videos"), Authorize]
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
        [HttpDelete("{id}/Videos/{videoId}"), Authorize]
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
        [HttpPost("{id}/NextVideo"), Authorize]
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
        [HttpPost("VerifyRoomConnection"), Authorize]
        public async Task<ActionResult<bool>> VerifyRoomConnection(RoomConnectionDTO roomConnectionDTO)
        {
            var result = await _roomService.VerifyRoomConnection(roomConnectionDTO);
            return Ok(result);
        }
    }
}
