﻿using Microsoft.AspNetCore.Authorization;
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
       
    }
}
