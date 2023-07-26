using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories.Core
{
    internal class RoomUserRepository : IRoomUserRepository
    {
        private readonly RoomsDBContext _context;

        public RoomUserRepository(RoomsDBContext context)
        {
           _context = context;
        }
        public IEnumerable<RoomUser> GetRoomUsers()
        {
            return _context.RoomUsers.ToList();
        }

        public RoomUser? GetRoomUserById(string id)
        {
            return _context.RoomUsers.Find(id);
        }

        public void InsertRoomUser(RoomUser roomUser)
        {
            _context.RoomUsers.Add(roomUser);
            Save();
        }

        public RoomUser? DeleteRoomUser(string roomUserId)
        {
            var roomUser = _context.RoomUsers.Find(roomUserId);

            if (roomUser is null) return null;

            _context.RoomUsers.Remove(roomUser);
            Save();
            return roomUser;
        }

        public void UpdateRoomUser(RoomUser roomUser)
        {
            var entity = _context.RoomUsers.FirstOrDefault(x => x.Id == roomUser.Id);

            if (entity is null) return;

            entity.Id = roomUser.Id;
            entity.Name = roomUser.Name;
            entity.UserId = roomUser.UserId;

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
