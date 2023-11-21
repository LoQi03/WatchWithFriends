using Microsoft.EntityFrameworkCore;
using WatchWithFriends_Data.Data;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories.Core
{
    internal class LogRepository : ILogRepository
    {
        private readonly WatchWithFriendsDBContext context;

        public LogRepository(WatchWithFriendsDBContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Log>> GetLogsAsync()
        {
            return await context.Logs.ToListAsync();
        }

        public async Task<Log?> GetLogByIdAsync(Guid id)
        {
            return await context.Logs.FindAsync(id);
        }

        public async Task InsertLogAsync(Log Log)
        {
            context.Logs.Add(Log);
            await SaveAsync();
        }

        public async Task<Log?> DeleteLogAsync(Guid id)
        {
            var Log = await context.Logs.FindAsync(id);

            if (Log is null) return null;

            context.Logs.Remove(Log);
            await SaveAsync();
            return Log;
        }

        public Task SaveAsync()
        {
            return context.SaveChangesAsync();
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
