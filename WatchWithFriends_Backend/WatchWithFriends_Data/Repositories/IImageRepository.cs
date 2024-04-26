using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories
{
    public interface IImageRepository
    {
        Task<IEnumerable<Image>> GetImagesAsync();
        Task<Image?> GetImageByIdAsync(Guid ImageId);
        Task InsertImageAsync(Image Image);
        Task<Image?> DeleteImageAsync(Guid ImageID);
        Task UpdateImageAsync(Image Image);
        Task SaveAsync();
    }
}
