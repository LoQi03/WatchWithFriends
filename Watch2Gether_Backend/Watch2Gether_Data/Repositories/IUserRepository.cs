using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories
{
    public interface IUserRepository : IDisposable
    {
        IEnumerable<User> GetUsers();
        User? GetUserByID(Guid UserId);
        void InsertUser(User User);
        User? DeleteUser(Guid UserID);
        User? GetUserByEmail(string Email);
        bool IsUserAlreadyExist(string Email);
        void UpdateUser(User User);
        void Save();
    }
}
