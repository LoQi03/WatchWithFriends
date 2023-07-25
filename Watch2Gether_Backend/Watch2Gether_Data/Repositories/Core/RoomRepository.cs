using Microsoft.EntityFrameworkCore;
using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Watch2Gether_Data.Repositories.Core
{
    internal class RoomRepository : IRoomRepository
    {
        private readonly RoomsDBContext _context;

        public RoomRepository(RoomsDBContext context)
        {
            _context = context;
        }

        public IEnumerable<Room> GetRooms()
        {
            return _context.Rooms
                .Include(r => r.RoomUsers)
                .ToList();
        }

        public Room? GetRoomById(Guid id)
        {
            return _context.Rooms
                .Include(r => r.RoomUsers)
                .FirstOrDefault(r => r.Id == id);
        }

        public void InsertRoom(Room room)
        {
            _context.Rooms.Add(room);
            Save();
        }

        public Room? DeleteRoom(Guid roomId)
        {
            var room = _context.Rooms.Find(roomId);

            if (room is null) return null;

            _context.Rooms.Remove(room);
            Save();
            return room;
        }

        public void UpdateRoom(Room room)
        {
            var entity = _context.Rooms.Include(r => r.RoomUsers)
                                       .FirstOrDefault(x => x.Id == room.Id);

            if (entity is null) return;

            entity.Name = room.Name;

            var roomUsersToRemove = entity.RoomUsers.Where(ru => !room.RoomUsers.Any(newRu => newRu.Id == ru.Id)).ToList();
            foreach (var ru in roomUsersToRemove)
            {
                entity.RoomUsers.Remove(ru);
            }

            foreach (var newRu in room.RoomUsers)
            {
                var existingRu = entity.RoomUsers.FirstOrDefault(ru => ru.Id == newRu.Id);
                if (existingRu != null)
                {
                    existingRu.Name = newRu.Name;
                }
                else
                {
                    entity.RoomUsers.Add(newRu);
                }
            }

            _context.Update(entity);
            Save();
        }
        public IEnumerable<RoomUser> GetRoomUsersById(Guid roomId)
        {
            return _context.RoomsUser
                .Where(ru => ru.RoomId == roomId)
                .ToList();
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
