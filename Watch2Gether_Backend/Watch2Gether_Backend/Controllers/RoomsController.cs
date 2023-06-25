using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Watch2Gether_Backend.Model;
using Watch2Gether_Backend.Services;

namespace Watch2Gether_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;
        public RoomsController(IRoomService roomService)
        {
            _roomService = roomService;
        }
        [HttpGet, Authorize]
        public ActionResult GetRooms()
        {
            var rooms = _roomService.GetAllRooms();
            return Ok(rooms);
        }
        [HttpGet("{id}"), Authorize]
        public ActionResult GetRoom(Guid id)
        {
            var room = _roomService.GetRoomById(id);
            if (room is null)
            {
                return NotFound();
            }
            return Ok(room);
        }
        [HttpPost, Authorize]
        public ActionResult CreateRoom(RoomDTO room)
        {
            var result = _roomService.CreateRoom(room);
            if (result is null)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        [HttpDelete("{id}"), Authorize]
        public ActionResult DeleteRoom(Guid id)
        {
            var result = _roomService.DeleteRoom(id);
            if (result is null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
