using Microsoft.EntityFrameworkCore;
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

            _context.Update(entity);
            Save();
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
