using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories
{
    public interface ILogRepository
    {
        Task<IEnumerable<Log>> GetLogsAsync();
        Task<Log?> GetLogByIdAsync(Guid id);
        Task InsertLogAsync(Log log);
        Task<Log?> DeleteLogAsync(Guid id);
        Task SaveAsync();
    }
}
