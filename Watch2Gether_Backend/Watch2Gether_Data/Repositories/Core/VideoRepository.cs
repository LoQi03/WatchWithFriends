using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories.Core
{
    internal class VideoRepository : IVideoRepository
    {
        private readonly RoomsDBContext _context;

        public VideoRepository(RoomsDBContext context)
        {
           _context = context;
        }
        public IEnumerable<Video> GetVideos()
        {
            return _context.Videos.ToList();
        }

        public Video? GetVideoById(string id)
        {
            return _context.Videos.Find(id);
        }

        public void InsertVideo(Video Video)
        {
            _context.Videos.Add(Video);
            Save();
        }

        public Video? DeleteVideo(string VideoId)
        {
            var Video = _context.Videos.Find(VideoId);

            if (Video is null) return null;

            _context.Videos.Remove(Video);
            Save();
            return Video;
        }

        public void UpdateVideo(Video Video)
        {
            var entity = _context.Videos.FirstOrDefault(x => x.Id == Video.Id);

            if (entity is null) return;

            entity.Id = Video.Id;
            entity.Name = Video.Name;

            _context.Update(entity);
            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
