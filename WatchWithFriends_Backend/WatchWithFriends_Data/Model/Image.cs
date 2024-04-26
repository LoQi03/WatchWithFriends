using System.ComponentModel.DataAnnotations;

namespace WatchWithFriends_Data.Model
{
    public class Image
    {
        public Guid Id { get; set; }
        public Byte[] Data { get; set; }
    }
}
