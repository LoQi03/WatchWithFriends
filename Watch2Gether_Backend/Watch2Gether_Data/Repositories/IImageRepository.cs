﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Watch2Gether_Data.Repositories
{
    public interface IImageRepository
    {
        IEnumerable<Image> GetImages();
        Image? GetImageByID(Guid ImageId);
        void InsertImage(Image Image);
        Image? DeleteImage(Guid ImageID);
        void UpdateImage(Image Image);
        void Save();
    }
}
