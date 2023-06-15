using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Watch2Gether_Backend.Model;
using Watch2Gether_Data.Model;
using Watch2Gether_Data.Repositories;
using System.Drawing;
using Image = Watch2Gether_Data.Model.Image;
using Watch2Gether_Backend.Services;

namespace Watch2Gether_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IImageRepository _imageRepository;
        public UsersController(IUserRepository userRepository, IUserService userService, IImageRepository imageRepository)
        {
            _userRepository = userRepository;
            _userService = userService;
            _imageRepository = imageRepository;
        }
        [HttpGet]
        public ActionResult<IEnumerable<UserDTO>> GetAll()
        {
            var result = _userRepository.GetUsers().Select(x => UserDTO.FromModel(x));
            return Ok(result);
        }

        [HttpPost]
        public ActionResult<UserDTO> AddUser(UserDTO user)
        {
            user.Id = Guid.NewGuid();
            var result = user.ToModel();
            _userRepository.InsertUser(result);
            return Ok(UserDTO.FromModel(result));
        }
        [HttpPut]
        public ActionResult<UserDTO> UpdateUser(UserDTO user)
        {
            var result = user.ToModel();
            _userRepository.UpdateUser(result);
            return Ok(user);
        }

        [HttpGet("{id}")]
        public ActionResult<UserDTO> GetUser(Guid id)
        {
            var user = _userRepository.GetUserByID(id);
            if (user is null)
            {
                return NotFound();
            }
            return Ok(UserDTO.FromModel(user));
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteUser(Guid id)
        {
            var user = _userRepository.DeleteUser(id);
            if (user is null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPost("register")]
        public ActionResult<UserDTO> Register(UserDTO user)
        {
            if (string.IsNullOrWhiteSpace(user.Email)) return BadRequest();

            user.Id = Guid.NewGuid();
            var result = user.ToModel();

            if (_userRepository.IsUserAlreadyExist(result.Email ?? "")) return Conflict();

            var salt = RandomNumberGenerator.GetBytes(128 / 8);
            var hashed = _userService.HashPassword(result.PasswordHash ?? "", salt);
            result.PasswordHash = hashed;
            result.Salt = Convert.ToBase64String(salt);

            _userRepository.InsertUser(result);
            return Ok(user);
        }
        [HttpPost("login")]
        public ActionResult<UserDTO> Login(UserDTO user)
        {
            var userFromDB = _userRepository.GetUserByEmail(user.Email ?? "");
            if (userFromDB is null)
            {
                return Unauthorized();
            }
            var userDto = UserDTO.FromModel(userFromDB);
            var salt = Convert.FromBase64String(userFromDB.Salt ?? "");
            var password = _userService.HashPassword(user.Password ?? "", salt);
            if (password == userFromDB.PasswordHash)
                return Ok(userDto);
            else
                return Unauthorized();
        }
        [HttpPost("{userid}/image")]
        public ActionResult<UserDTO> AddImage(Guid userid)
        {
            var user = _userRepository.GetUserByID(userid);
            if (Request.Form.Files.Count == 0 || user is null) return BadRequest();
            var img = new Image();
            var file = Request.Form.Files[0];
            var imgId = Guid.NewGuid();

            using var streamReadImgFile = file.OpenReadStream();

            if (streamReadImgFile is null) return BadRequest();

            var imgBitmap = new Bitmap(streamReadImgFile); //only windows supp

            byte[] data;
            using var streamReadDataFromImage = new MemoryStream();

            if (streamReadDataFromImage is null) return BadRequest();

            imgBitmap?.Save(streamReadDataFromImage, System.Drawing.Imaging.ImageFormat.Jpeg); //only windows supp
            data = streamReadDataFromImage.ToArray();
            user.ImageId = imgId;
            img.Id = imgId;
            img.Data = data;
            _imageRepository.InsertImage(img);
            return Ok(user);
        }

        [HttpGet("{userid}/image")]
        public ActionResult<IFormFile> GetImage(Guid userid)
        {
            var user = _userRepository.GetUserByID(userid);

            if (user is null) return NotFound();

            if (user.ImageId is null) return NotFound();

            var image = _imageRepository.GetImageByID((Guid)user.ImageId);

            if (image is null) return NotFound();

            return File(image.Data!, "image/jpeg");
        }
    }
}
