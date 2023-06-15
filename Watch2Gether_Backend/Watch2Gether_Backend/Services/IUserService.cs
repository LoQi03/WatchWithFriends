namespace Watch2Gether_Backend.Services
{
    public interface IUserService
    {
        string HashPassword(string password, byte[] salt);
    }
}
