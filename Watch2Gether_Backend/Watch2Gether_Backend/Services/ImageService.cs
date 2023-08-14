using Watch2Gether_Data.Model;
using Watch2Gether_Data.Repositories;

namespace Watch2Gether_Backend.Services
{
    internal sealed class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;
        public ImageService(IImageRepository imageService)
        {
            _imageRepository = imageService;
        }

        public Task<Image?> GetImageById(Guid id)
        {
            return _imageRepository.GetImageByIdAsync(id);
        }

        public Task InsertImage(Image image)
        {
            return _imageRepository.InsertImageAsync(image);
        }
        public async Task RemoveImage(Guid? imgid)
        {
            if (ImageIdValidition(imgid))
            {
                await _imageRepository.DeleteImageAsync(imgid.Value);
            }
        }
        private bool ImageIdValidition(Guid? imgid) 
        { 
            if(imgid != null) 
            {
                return true;
            }
            return false;
        }
    }
}
