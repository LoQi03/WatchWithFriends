using Microsoft.AspNetCore.Mvc;
using Watch2Gether_Backend.Model;
using Watch2Gether_Data.Model;
using Watch2Gether_Data.Repositories;

namespace Watch2Gether_Backend.Services
{
    public interface IUserService
    {
        IEnumerable<UserDTO> GetUsers();
        UserDTO AddUser(UserDTO userDTO);
        User? UpdateUser(User userFromDB, UpdateUserDTO updateUser);
        User? GetUserById(Guid? id);
        User? DeleteUser(Guid? id);
        User? Register(UserDTO user);
    }
}
