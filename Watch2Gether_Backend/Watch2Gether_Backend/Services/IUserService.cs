using Watch2Gether_Backend.Model;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Backend.Services
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
        LoginUserDTO? Login(UserDTO user, User userFromDB);
        Task<UserDTO?> GetUserByToken(string token);
    }
}
