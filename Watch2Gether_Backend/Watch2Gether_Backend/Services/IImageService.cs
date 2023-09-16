using WatchWithFriends_Data.Model;
using Image = WatchWithFriends_Data.Model.Image;

namespace WatchWithFriends.Services
{
    public interface IImageService
    {
        Task<Image?> GetImageById(Guid id);
        Task InsertImage(Image image);
        Task RemoveImage(Guid? imgid);
        Task<byte[]?> ConvertImageToByte(IFormFile file);
    }
}
