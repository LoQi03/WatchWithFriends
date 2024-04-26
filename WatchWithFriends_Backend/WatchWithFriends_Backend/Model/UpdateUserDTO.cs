namespace WatchWithFriends.Model
{
    public class UpdateUserDTO
    {
        public UserDTO? UserDetails { get; set; }
        public string? NewPassword { get; set; }
    }
}
