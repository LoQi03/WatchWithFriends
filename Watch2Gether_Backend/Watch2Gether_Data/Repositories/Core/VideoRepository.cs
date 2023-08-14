using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<Video>> GetVideosAsync()
        {
            return await _context.Videos.ToListAsync();
        }

        public async Task<Video?> GetVideoByIdAsync(string id)
        {
            return await _context.Videos.FindAsync(id);
        }

        public async Task InsertVideoAsync(Video Video)
        {
            _context.Videos.Add(Video);
            await SaveAsync();
        }

        public async Task<Video?> DeleteVideoAsync(string VideoId)
        {
            var Video = await _context.Videos.FindAsync(VideoId);

            if (Video is null) 
            {
                return null;
            } 

            _context.Videos.Remove(Video);
            await SaveAsync();
            return Video;
        }

        public async Task UpdateVideoAsync(Video Video)
        {
            var entity = await _context.Videos.FirstOrDefaultAsync(x => x.Id == Video.Id);

            if (entity is null) 
            {
                return;
            } 

            entity.Id = Video.Id;
            entity.Name = Video.Name;

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
