using Microsoft.EntityFrameworkCore;
using WatchWithFriends_Data.Data;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories.Core
{
    internal class UserRepository : IUserRepository
    {
        private readonly WatchWithFriendsDBContext _dbContext;

        public UserRepository(WatchWithFriendsDBContext context)
        {
            this._dbContext = context;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _dbContext.Users.FindAsync(id);
        }

        public async Task InsertUserAsync(User user)
        {
            _dbContext.Users.Add(user);
            await SaveAsync();
        }

        public async Task<User?> DeleteUserAsync(Guid userID)
        {
            var user = await _dbContext.Users.FindAsync(userID);

            if (user is null) 
            {
                return null;
            } 

            _dbContext.Users.Remove(user);
            await SaveAsync();
            return user;
        }

        public async Task<User?> GetUserByEmailAsync(string Email)
        {
            return await _dbContext.Users.Where(x => x.Email == Email).FirstOrDefaultAsync();
        }

        public async Task<bool> IsUserAlreadyExistAsync(string Email)
        {
            return await _dbContext.Users.AnyAsync(x => x.Email == Email);
        }

        public async Task UpdateUserAsync(User user)
        {
            var entity = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == user.Id);

            if (entity == null) 
            {
                return;
            } 

            entity.Email = user.Email;
            entity.PasswordHash = user.PasswordHash;
            entity.Name = user.Name;
            entity.BirthDate = user.BirthDate;

            _dbContext.Update(entity);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
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
