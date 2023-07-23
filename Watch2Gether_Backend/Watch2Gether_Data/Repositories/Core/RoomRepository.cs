using Microsoft.EntityFrameworkCore;
using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories.Core
{
    internal class RoomRepository : IRoomRepository
    {

        private readonly Watch2GetherDBContext context;

        public RoomRepository(Watch2GetherDBContext context)
        {
            this.context = context;
        }
        public IEnumerable<Room> GetRooms()
        {
            return context.Rooms.Include(r => r.Users);
        }

        public Room? GetRoomById(Guid id)
        {
            return context.Rooms
                .Include(r=>r.Users)
                .FirstOrDefault(x=>x.Id == id);
        }

        public void InsertRoom(Room Room)
        {
            context.Rooms.Add(Room);
            Save();
        }

        public Room? DeleteRoom(Guid RoomID)
        {
            var room = context.Rooms.Find(RoomID);

            if (room is null) return null;

            room.ChatEntries = null;
            Save();

            context.Rooms.Remove(room);
            Save();
            return room;
        }

        public void UpdateRoom(Room Room)
        {
            var entity = context.Rooms.FirstOrDefault(x => x.Id == Room.Id);

            if (entity is null) return;

            entity.Id = Room.Id;
            entity.Users = Room.Users;
            entity.Name = Room.Name;

            context.Update(entity);
            Save();
        }

        public void Save()
        {
            context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
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
