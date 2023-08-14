using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories.Core
{
    internal class RoomRepository : IRoomRepository
    {
        private readonly RoomsDBContext _context;

        public RoomRepository(RoomsDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Room>> GetRoomsAsync()
        {
            return await _context.Rooms
                .Include(r => r.RoomUsers)
                .ToListAsync();
        }

        public async Task<Room?> GetRoomByIdAsync(Guid id)
        {
            return await _context.Rooms
                .Include(r => r.RoomUsers)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task InsertRoomAsync(Room room)
        {
            _context.Rooms.Add(room);
            await SaveAsync();
        }

        public async Task<Room?> DeleteRoomAsync(Guid roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);

            if (room is null) return null;

            _context.Rooms.Remove(room);
            await SaveAsync();
            return room;
        }

        public async Task<Room?> UpdateRoomAsync(Room room)
        {
            var entity = await _context.Rooms.Include(r => r.RoomUsers)
                                             .FirstOrDefaultAsync(x => x.Id == room.Id);

            if (entity is null)
            {
                return null;
            }

            entity.Name = room.Name;
            entity.CurrentVideo = room.CurrentVideo;
            entity.PlayList = room.PlayList;
            entity.PasswordHash = room.PasswordHash;
            entity.Salt = room.Salt;
            entity.CreatorId = room.CreatorId;
            entity.RoomUsers = room.RoomUsers;

            _context.Update(entity);
            await SaveAsync();
            return entity;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
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
