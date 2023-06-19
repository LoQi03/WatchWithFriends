using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories.Core
{
    internal class RoomRepository : IRoomRepository
    {

        private RoomsDBContext context;

        public RoomRepository(RoomsDBContext context)
        {
            this.context = context;
        }
        public IEnumerable<Room> GetRooms()
        {
            return context.Rooms.ToList();
        }

        public Room? GetRoomByID(Guid id)
        {
            return context.Rooms.Find(id);
        }

        public void InsertRoom(Room Room)
        {
            context.Rooms.Add(Room);
            Save();
        }

        public Room? DeleteRoom(Guid RoomID)
        {
            var Room = context.Rooms.Find(RoomID);

            if (Room is null) return null;

            context.Rooms.Remove(Room);
            Save();
            return Room;
        }

        public void AddUserToRoom(Guid userId, Guid roomId)
        {
            var room = context.Rooms.FirstOrDefault(x => x.Id == roomId);

            if (room is null) return;

            room.Users.Add(userId);
            context.Update(room);
            Save();
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
