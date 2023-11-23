using WatchWithFriends.Model;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDTO>> GetUsers();
        Task<User> AddUser(UserDTO userDTO);
        Task<UserDTO?> UpdateUser(User userFromDB, UpdateUserDTO updateUser);
        Task UpdateUser(User userFromDB);
        Task<User?> GetUserById(Guid id);
        Task<UserDTO?> DeleteUser(Guid? id);
        Task<UserDTO?> Register(UserDTO user);
        Task<User?> GetUserByEmail(string email);
        (UserDTO?,string?) Login(UserDTO user, User userFromDB);
        Task<UserDTO?> GetUserByToken(string token);
    }
}
