using Watch2Gether_Data.Model;

namespace Watch2Gether_Backend.Services
{
    public interface IImageService
    {
        Image? GetImageById(Guid id);
        void InsertImage(Image image);
        void RemoveImage(Guid imgid);
    }
}
