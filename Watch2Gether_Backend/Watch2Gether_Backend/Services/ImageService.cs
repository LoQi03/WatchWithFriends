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

        public Image? GetImageById(Guid id)
        {
            var result = _imageRepository.GetImageById(id);
            return result;
        }

        public void InsertImage(Image image)
        {
            _imageRepository.InsertImage(image);
        }
        public void RemoveImage(Guid? imgid)
        {
            if (ImageIdValidition(imgid))
            {
                _imageRepository.DeleteImage(imgid.Value);
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
