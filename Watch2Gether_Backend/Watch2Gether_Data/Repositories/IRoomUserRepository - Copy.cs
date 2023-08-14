using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories
{
    public interface IVideoRepository
    {
        IEnumerable<Video> GetVideos();
        Video? GetVideoById(string id);
        void InsertVideo(Video Video);
        Video? DeleteVideo(string VideoId);
        void UpdateVideo(Video Video);
    }
}
