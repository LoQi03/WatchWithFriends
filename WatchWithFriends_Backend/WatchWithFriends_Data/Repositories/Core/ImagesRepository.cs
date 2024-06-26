﻿using Microsoft.EntityFrameworkCore;
using WatchWithFriends_Data.Data;
using WatchWithFriends_Data.Model;

namespace WatchWithFriends_Data.Repositories.Core
{
    internal class ImageRepository : IImageRepository
    {
        private readonly WatchWithFriendsDBContext context;

        public ImageRepository(WatchWithFriendsDBContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Image>> GetImagesAsync()
        {
            return await context.Images.ToListAsync();
        }

        public async Task<Image?> GetImageByIdAsync(Guid id)
        {
            return await context.Images.FindAsync(id);
        }

        public async Task InsertImageAsync(Image Image)
        {
            context.Images.Add(Image);
            await SaveAsync();
        }

        public async Task<Image?> DeleteImageAsync(Guid ImageID)
        {
            var Image = await context.Images.FindAsync(ImageID);

            if (Image is null) return null;

            context.Images.Remove(Image);
            await SaveAsync();
            return Image;
        }

        public async Task UpdateImageAsync(Image Image)
        {
            var entity = await context.Images.FirstOrDefaultAsync(x => x.Id == Image.Id);

            if (entity is null) return;

            entity.Id = Image.Id;
            entity.Data = Image.Data;

            context.Update(entity);
            await SaveAsync();
        }

        public Task SaveAsync()
        {
            return context.SaveChangesAsync();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
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
