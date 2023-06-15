using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories.Core
{
    internal class UserRepository : IUserRepository
    {
        private Watch2GetherDBContext context;

        public UserRepository(Watch2GetherDBContext context)
        {
            this.context = context;
        }

        public IEnumerable<User> GetUsers()
        {
            return context.Users.ToList();
        }

        public User? GetUserByID(Guid id)
        {
            return context.Users.Find(id);
        }

        public void InsertUser(User user)
        {
            context.Users.Add(user);
            Save();
        }

        public User? DeleteUser(Guid userID)
        {
            var user = context.Users.Find(userID);

            if (user is null) return null;

            context.Users.Remove(user);
            Save();
            return user;
        }
        public User? GetUserByEmail(string Email)
        {
            return context.Users.Where(x => x.Email == Email).FirstOrDefault();
        }
        public bool IsUserAlreadyExist(string Email)
        {
            return context.Users.Where(x => x.Email == Email).FirstOrDefault() != null ? true : false;
        }
        public void UpdateUser(User user)
        {
            var entity = context.Users.FirstOrDefault(x => x.Id == user.Id);

            if (entity == null) return;

            entity.Email = user.Email;
            entity.PasswordHash = user.PasswordHash;
            entity.Name = user.Name;
            entity.BirthDate = user.BirthDate;

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
