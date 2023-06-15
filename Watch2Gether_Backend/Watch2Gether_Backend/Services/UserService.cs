using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Watch2Gether_Backend.Services
{
    internal class UserService : IUserService
    {
        public string HashPassword(string password, byte[] salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
            return hashed;
        }
    }
}
