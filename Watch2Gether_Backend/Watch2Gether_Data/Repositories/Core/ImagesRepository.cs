using Watch2Gether_Data.Data;
using Watch2Gether_Data.Model;

namespace Watch2Gether_Data.Repositories.Core
{
    internal class ImageRepository : IImageRepository
    {
        private Watch2GetherDBContext context;

        public ImageRepository(Watch2GetherDBContext context)
        {
            this.context = context;
        }
        public IEnumerable<Image> GetImages()
        {
            return context.Images.ToList();
        }

        public Image? GetImageByID(Guid id)
        {
            return context.Images.Find(id);
        }

        public void InsertImage(Image Image)
        {
            context.Images.Add(Image);
            Save();
        }

        public Image? DeleteImage(Guid ImageID)
        {
            var Image = context.Images.Find(ImageID);

            if (Image is null) return null;

            context.Images.Remove(Image);
            Save();
            return Image;
        }

        public void UpdateImage(Image Image)
        {
            var entity = context.Images.FirstOrDefault(x => x.Id == Image.Id);

            if (entity is null) return;

            entity.Id = Image.Id;
            entity.Data = Image.Data;

            context.Update(entity);
            Save();
        }

        public void Save()
        {
            context.SaveChanges();
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
