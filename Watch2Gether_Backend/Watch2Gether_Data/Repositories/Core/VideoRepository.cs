using Microsoft.EntityFrameworkCore;
using WatchWithFriends_Data.Data;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories.Core
{
    internal class VideoRepository : IVideoRepository
    {
        private readonly RoomsDBContext _context;

        public VideoRepository(RoomsDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Video>> GetVideosAsync()
        {
            return await _context.Videos.ToListAsync();
        }

        public async Task<Video?> GetVideoByIdAsync(Guid id)
        {
            return await _context.Videos.FindAsync(id);
        }

        public async Task InsertVideoAsync(Video video)
        {
            _context.Videos.Add(video);
            await SaveAsync();
        }

        public async Task<Video?> DeleteVideoAsync(Guid? videoId)
        {
            if(videoId == null)
            {
                return null;
            }
            var Video = await _context.Videos.FindAsync(videoId);

            if (Video is null) 
            {
                return null;
            } 

            _context.Videos.Remove(Video);
            await SaveAsync();
            return Video;
        }

        public async Task UpdateVideoAsync(Video video)
        {
            var entity = await _context.Videos.FirstOrDefaultAsync(x => x.Id == video.Id);

            if (entity is null) 
            {
                return;
            } 

            entity.Id = video.Id;
            entity.Title = video.Title;

            _context.Update(entity);
            await SaveAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
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
