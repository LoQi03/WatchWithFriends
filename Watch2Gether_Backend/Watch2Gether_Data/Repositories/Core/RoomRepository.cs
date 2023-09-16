using Microsoft.EntityFrameworkCore;
using WatchWithFriends_Data.Data;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories.Core
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
                .Include(p => p.PlayList)
                .ToListAsync();
        }

        public async Task<Room?> GetRoomByIdAsync(Guid id)
        {
            return await _context.Rooms
                .Include(r => r.RoomUsers)
                .Include(p => p.PlayList)
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

            if (room is null) 
            {
                return null;
            }

            _context.Rooms.Remove(room);
            await SaveAsync();
            return room;
        }

        public async Task UpdateRoomAsync(Room room)
        {
            var entity = await _context.Rooms.FirstOrDefaultAsync(x => x.Id == room.Id);

            if (entity is null)
            {
                return;
            }

            entity.Name = room.Name;
            entity.CurrentVideo = room.CurrentVideo;
            entity.CreatorId = room.CreatorId;

            _context.Update(entity);
            await SaveAsync();
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
