using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Watch2Gether_Backend.Misc;
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

        private static string HashPassword(string password, byte[] salt)
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
                if (updateUser?.NewPassword != "")
                {
                    var newSalt = RandomNumberGenerator.GetBytes(128 / 8);
                    var hashed = HashPassword(updateUser?.NewPassword ?? "", newSalt);
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

        public LoginUserDTO? Login(UserDTO user, User userFromDB)
        {
            var salt = Convert.FromBase64String(userFromDB.Salt ?? "");
            var password = HashPassword(user.Password ?? "", salt);
            if (password == userFromDB.PasswordHash)
            {
                var resultUserDto = UserDTO.FromModel(userFromDB);
                var loginUserDTO = new LoginUserDTO
                {
                    UserDetails = resultUserDto,
                    Token = CreateToken(user),
                };
                return loginUserDTO;
            }
            else
                return null;
        }

        public void UpdateUser(User userFromDB)
        {
            _userRepository.UpdateUser(userFromDB);
        }

        private string CreateToken(UserDTO user)
        {
            var issuer = Config.Instance?.Jwt?.Issuer;
            var audience = Config.Instance?.Jwt?.Audience;
            var key = Encoding.UTF8.GetBytes(Config.Instance?.Jwt?.Key ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub, user?.Id.ToString() ?? string.Empty),
                        new Claim(JwtRegisteredClaimNames.Email, user?.Email ?? string.Empty),
                        new Claim(JwtRegisteredClaimNames.Jti,
                        Guid.NewGuid().ToString())
                    }),
                Expires = DateTime.UtcNow.AddDays(15),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials
                (new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }

        public UserDTO? GetUserByToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            var email = jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Email).Value;

            if (email == string.Empty) return null;

            var userFromDB = GetUserByEmail(email);

            if (userFromDB is null) return null;

            var userDTO = UserDTO.FromModel(userFromDB);

            return userDTO;
        }
    }
}
