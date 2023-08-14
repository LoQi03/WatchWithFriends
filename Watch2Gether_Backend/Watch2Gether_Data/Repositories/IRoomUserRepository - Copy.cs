using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories
{
    public interface IVideoRepository
    {
        Task<IEnumerable<Video>> GetVideosAsync();
        Task<Video?> GetVideoByIdAsync(string id);
        Task InsertVideoAsync(Video Video);
        Task<Video?> DeleteVideoAsync(string VideoId);
        Task UpdateVideoAsync(Video Video);
    }
}
