using Microsoft.AspNetCore.Mvc;
using Watch2Gether_Backend.Model;
using Watch2Gether_Data.Model;
using Watch2Gether_Data.Repositories;

namespace Watch2Gether_Backend.Services
{
    public interface IUserService
    {
        IEnumerable<UserDTO> GetUsers();
        User AddUser(UserDTO userDTO);
        UserDTO? UpdateUser(User userFromDB, UpdateUserDTO updateUser);
        void UpdateUser(User userFromDB);
        User? GetUserById(Guid? id);
        UserDTO? DeleteUser(Guid? id);
        UserDTO? Register(UserDTO user);
        User? GetUserByEmail(string email);
        string Login(UserDTO user, User userFromDB);
    }
}
