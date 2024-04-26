using Microsoft.EntityFrameworkCore;
using WatchWithFriends_Data.Data;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories.Core
{
    internal class RoomUserRepository : IRoomUserRepository
    {
        private readonly RoomsDBContext _context;

        public RoomUserRepository(RoomsDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoomUser>> GetRoomUsersAsync()
        {
            return await _context.RoomUsers.ToListAsync();
        }

        public async Task<RoomUser?> GetRoomUserByIdAsync(string id)
        {
            return await _context.RoomUsers.FindAsync(id);
        }

        public async Task InsertRoomUserAsync(RoomUser roomUser)
        {
            _context.RoomUsers.Add(roomUser);
            await SaveAsync();
        }

        public async Task<RoomUser?> DeleteRoomUserAsync(string roomUserId)
        {
            var roomUser = await _context.RoomUsers.FindAsync(roomUserId);

            if (roomUser is null) 
            {
                return null;
            } 

            _context.RoomUsers.Remove(roomUser);
            await SaveAsync();
            return roomUser;
        }

        public async Task UpdateRoomUserAsync(RoomUser roomUser)
        {
            var entity = await _context.RoomUsers.FirstOrDefaultAsync(x => x.Id == roomUser.Id);

            if (entity is null) 
            {
                return;
            } 

            entity.Id = roomUser.Id;
            entity.UserId = roomUser.UserId;

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
