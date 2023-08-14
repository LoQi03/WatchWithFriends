using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories.Core
{
    internal class UserRepository : IUserRepository
    {
        private readonly Watch2GetherDBContext context;

        public UserRepository(Watch2GetherDBContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task InsertUserAsync(User user)
        {
            context.Users.Add(user);
            await SaveAsync();
        }

        public async Task<User?> DeleteUserAsync(Guid userID)
        {
            var user = await context.Users.FindAsync(userID);

            if (user is null) return null;

            context.Users.Remove(user);
            await SaveAsync();
            return user;
        }

        public async Task<User?> GetUserByEmailAsync(string Email)
        {
            return await context.Users.Where(x => x.Email == Email).FirstOrDefaultAsync();
        }

        public async Task<bool> IsUserAlreadyExistAsync(string Email)
        {
            return await context.Users.AnyAsync(x => x.Email == Email);
        }

        public async Task UpdateUserAsync(User user)
        {
            var entity = await context.Users.FirstOrDefaultAsync(x => x.Id == user.Id);

            if (entity == null) return;

            entity.Email = user.Email;
            entity.PasswordHash = user.PasswordHash;
            entity.Name = user.Name;
            entity.BirthDate = user.BirthDate;

            context.Update(entity);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
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
