using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories
{
    public interface IVideoRepository
    {
        Task<IEnumerable<Video>> GetVideosAsync();
        Task<Video?> GetVideoByIdAsync(Guid id);
        Task InsertVideoAsync(Video video);
        Task<Video?> DeleteVideoAsync(Guid? videoId);
        Task UpdateVideoAsync(Video video);
    }
}
