using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Watch2Gether_Backend.Model;
using Watch2Gether_Data.Model;
using Watch2Gether_Data.Repositories;

namespace Watch2Gether_Backend.Services
{
    internal class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public UserDTO AddUser(UserDTO userDTO)
        {
            userDTO.Id = Guid.NewGuid();
            var result = userDTO.ToModel();
            _userRepository.InsertUser(result);
            return userDTO;
        }

        public IEnumerable<UserDTO> GetUsers()
        {
            var result = _userRepository.GetUsers().Select(x => UserDTO.FromModel(x));
            return result;
        }

        private string HashPassword(string password, byte[] salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return hashed;
        }

        public User? UpdateUser(User userFromDB, UpdateUserDTO updateUser)
        {
            var salt = Convert.FromBase64String(userFromDB.Salt ?? "");
            var password = HashPassword(updateUser.UserDetails.Password ?? "", salt);
            if (password == userFromDB.PasswordHash)
            {
                userFromDB.Name = updateUser.UserDetails.Name;
                userFromDB.Email = updateUser.UserDetails.Email;
                if (updateUser.NewPassword != "")
                {
                    var newSalt = RandomNumberGenerator.GetBytes(128 / 8);
                    var hashed = HashPassword(updateUser.NewPassword ?? "", newSalt);
                    userFromDB.PasswordHash = hashed;
                    userFromDB.Salt = Convert.ToBase64String(newSalt);
                }
                _userRepository.UpdateUser(userFromDB);
                return userFromDB;
            }
            else
                return null;
        }

        public User? GetUserById(Guid? id)
        {
            var user = _userRepository.GetUserByID(id ?? Guid.Empty);
            return user;
        }

        public User? DeleteUser(Guid? id)
        {
            var result = _userRepository.DeleteUser(id ?? Guid.Empty);
            return result;
        }

        public User? Register(UserDTO user)
        {
            user.Id = Guid.NewGuid();
            var result = user.ToModel();

            if (_userRepository.IsUserAlreadyExist(result.Email ?? "")) return null;

            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hashed = HashPassword(result.PasswordHash ?? "", salt);
            result.PasswordHash = hashed;
            result.Salt = Convert.ToBase64String(salt);

            _userRepository.InsertUser(result);
            return result;
        }
    }
}
