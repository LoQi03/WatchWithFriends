using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.IdentityModel.Tokens;
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
    internal sealed class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> AddUser(UserDTO userDTO)
        {
            userDTO.Id = Guid.NewGuid();
            var result = userDTO.ToModel();
            await _userRepository.InsertUserAsync(result);
            return result;
        }

        public async Task<IEnumerable<UserDTO>> GetUsers()
        {
            var result = await _userRepository.GetUsersAsync();
            return result.Select(x => UserDTO.FromModel(x));
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

        public async Task<UserDTO?> UpdateUser(User userFromDB, UpdateUserDTO updateUser)
        {
            var salt = Convert.FromBase64String(userFromDB.Salt);
            var password = HashPassword(updateUser?.UserDetails?.Password ?? "", salt);
            if (password != userFromDB.PasswordHash)
            {
                return null;
            }
            userFromDB.Name = updateUser?.UserDetails?.Name;
            userFromDB.Email = updateUser?.UserDetails?.Email;
            if (updateUser?.NewPassword != "")
            {
                var newSalt = RandomNumberGenerator.GetBytes(128 / 8);
                var hashed = HashPassword(updateUser?.NewPassword ?? "", newSalt);
                userFromDB.PasswordHash = hashed;
                userFromDB.Salt = Convert.ToBase64String(newSalt);
            }
            await _userRepository.UpdateUserAsync(userFromDB);
            return UserDTO.FromModel(userFromDB);

        }

        public async Task<User?> GetUserById(Guid id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user is null)
            {
                return null;
            }
            return user;
        }

        public async Task<UserDTO?> DeleteUser(Guid? id)
        {
            UserIdValidition(id);
            var result = await _userRepository.DeleteUserAsync(id.Value);
            if (result == null)
            {
                return null;
            }
            return UserDTO.FromModel(result);
        }
        private void UserIdValidition(Guid? id)
        {
            if(id != null)
            {
                return;
            }
            throw new InvalidOperationException("User id is null!");
        }

        public async Task<UserDTO?> Register(UserDTO user)
        {
            user.Id = Guid.NewGuid();
            var result = user.ToModel();

            if (await _userRepository.IsUserAlreadyExistAsync(result.Email))
            {
                return null;
            } 

            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hashed = HashPassword(result.PasswordHash!, salt);
            result.PasswordHash = hashed;
            result.Salt = Convert.ToBase64String(salt);

            await _userRepository.InsertUserAsync(result);
            return UserDTO.FromModel(result);
        }
        public async Task<User?> GetUserByEmail(string email)
        {
            var result = await _userRepository.GetUserByEmailAsync(email);
            return result;
        }

        public LoginUserDTO? Login(UserDTO user, User userFromDB)
        {
            var salt = Convert.FromBase64String(userFromDB.Salt!);
            var password = HashPassword(user.Password!, salt);
            if (password != userFromDB.PasswordHash)
            {
                return null;
            }
            var resultUserDto = UserDTO.FromModel(userFromDB);
            var loginUserDTO = new LoginUserDTO
            {
                UserDetails = resultUserDto,
                Token = CreateToken(user),
            };
            return loginUserDTO;
        }

        public Task UpdateUser(User userFromDB)
        {
            return _userRepository.UpdateUserAsync(userFromDB);
        }

        private string CreateToken(UserDTO user)
        {
            var issuer = Config.Instance?.Jwt?.Issuer;
            var audience = Config.Instance?.Jwt?.Audience;
            var key = Encoding.UTF8.GetBytes(Config.Instance?.Jwt?.Key!);
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
                (
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature
                )
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }

        public async Task<UserDTO?> GetUserByToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);
            var email = jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Email).Value;

            if (email == string.Empty) 
            {
                return null;
            } 

            var userFromDB = await GetUserByEmail(email);

            if (userFromDB is null) 
            {
                return null;
            } 

            var userDTO = UserDTO.FromModel(userFromDB);

            return userDTO;
        }
    }
}
