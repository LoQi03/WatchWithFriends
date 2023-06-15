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

        public User AddUser(UserDTO userDTO)
        {
            userDTO.Id = Guid.NewGuid();
            var result = userDTO.ToModel();
            _userRepository.InsertUser(result);
            return result;
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

        public UserDTO? UpdateUser(User userFromDB, UpdateUserDTO updateUser)
        {
            var salt = Convert.FromBase64String(userFromDB.Salt ?? "");
            var password = HashPassword(updateUser?.UserDetails?.Password ?? "", salt);
            if (password == userFromDB.PasswordHash)
            {
                userFromDB.Name = updateUser?.UserDetails?.Name;
                userFromDB.Email = updateUser?.UserDetails?.Email;
                if (updateUser.NewPassword != "")
                {
                    var newSalt = RandomNumberGenerator.GetBytes(128 / 8);
                    var hashed = HashPassword(updateUser.NewPassword ?? "", newSalt);
                    userFromDB.PasswordHash = hashed;
                    userFromDB.Salt = Convert.ToBase64String(newSalt);
                }
                _userRepository.UpdateUser(userFromDB);
                return UserDTO.FromModel(userFromDB);
            }
            else
                return null;
        }

        public User? GetUserById(Guid? id)
        {
            var user = _userRepository.GetUserByID(id ?? Guid.Empty);
            if (user is not null)
                return user;
            else
                return null;
        }

        public UserDTO? DeleteUser(Guid? id)
        {
            var result = _userRepository.DeleteUser(id ?? Guid.Empty);
            if (result is not null) return UserDTO.FromModel(result);
            else return null;
        }

        public UserDTO? Register(UserDTO user)
        {
            user.Id = Guid.NewGuid();
            var result = user.ToModel();

            if (_userRepository.IsUserAlreadyExist(result.Email ?? "")) return null;

            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hashed = HashPassword(result.PasswordHash ?? "", salt);
            result.PasswordHash = hashed;
            result.Salt = Convert.ToBase64String(salt);

            _userRepository.InsertUser(result);
            return UserDTO.FromModel(result);
        }
        public User? GetUserByEmail(string email)
        {
            var result = _userRepository.GetUserByEmail(email);
            return result;
        }

        public UserDTO? Login(UserDTO user, User userFromDB)
        {
            var salt = Convert.FromBase64String(userFromDB.Salt ?? "");
            var password = HashPassword(user.Password ?? "", salt);
            if (password == userFromDB.PasswordHash)
                return UserDTO.FromModel(userFromDB);
            else
                return null;
        }

        public void UpdateUser(User userFromDB)
        {
            _userRepository.UpdateUser(userFromDB);
        }
    }
}
