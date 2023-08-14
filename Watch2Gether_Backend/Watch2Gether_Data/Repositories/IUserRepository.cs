using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories
{
    public interface IUserRepository : IDisposable
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User?> GetUserByIdAsync(Guid UserId);
        Task InsertUserAsync(User User);
        Task<User?> DeleteUserAsync(Guid UserID);
        Task<User?> GetUserByEmailAsync(string Email);
        Task<bool> IsUserAlreadyExistAsync(string Email);
        Task UpdateUserAsync(User User);
        Task SaveAsync();
    }
}
