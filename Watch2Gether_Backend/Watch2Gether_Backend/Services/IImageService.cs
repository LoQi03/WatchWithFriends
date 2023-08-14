using Watch2Gether_Data.Model;

namespace Watch2Gether_Backend.Services
{
    public interface IImageService
    {
        Task<Image?> GetImageById(Guid id);
        Task InsertImage(Image image);
        Task RemoveImage(Guid? imgid);
    }
}
