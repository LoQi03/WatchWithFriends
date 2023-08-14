using Microsoft.AspNetCore.Mvc;
using Watch2Gether_Backend.Model;
using System.Drawing;
using Image = Watch2Gether_Data.Model.Image;
using Watch2Gether_Backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace Watch2Gether_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IImageService _imageService;
        public UsersController(IUserService userService, IImageService imageService)
        {
            _imageService = imageService;
            _userService = userService;
        }
        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAll()
        {
            var result = await _userService.GetUsers();
            return Ok(result);
        }

        [HttpPost, Authorize]
        public async Task<ActionResult<UserDTO>> AddUser(UserDTO user)
        {
            var result = UserDTO.FromModel(await _userService.AddUser(user));
            return Ok(result);
        }
        [HttpPut, Authorize]
        public async Task<ActionResult<UserDTO?>> UpdateUser(UpdateUserDTO user)
        {
            if (user.UserDetails?.Id == Guid.Empty) return BadRequest();
            var userFromDB = await _userService.GetUserById(user.UserDetails?.Id ?? Guid.Empty);
            if (userFromDB is null)
            {
                return NotFound();
            }
            var result = await _userService.UpdateUser(userFromDB, user);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("{id}"), Authorize]
        public async Task<ActionResult<UserDTO>> GetUser(Guid id)
        {
            var user = await _userService.GetUserById(id);
            if (user is null)
            {
                return NotFound();
            }
            return Ok(UserDTO.FromModel(user));
        }

        [HttpGet("token/{token}")]
        public async Task<ActionResult<UserDTO>> GetUserByToken(string token)
        {
            var user = await _userService.GetUserByToken(token);
            if (user is null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpDelete("{id}"), Authorize]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            var user = await _userService.DeleteUser(id);
            if (user is null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(UserDTO user)
        {
            if (string.IsNullOrWhiteSpace(user.Email))
            {
                return BadRequest();
            }
            var result = await _userService.Register(user);
            if (result is null)
            {
                return Conflict();
            } 
            return Ok(result);
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginUserDTO>> Login(UserDTO user)
        {
            if (user.Email is null || user.Email == string.Empty)
            {
                return BadRequest();
            } 
            var userFromDB = await _userService.GetUserByEmail(user.Email ?? "");
            if (userFromDB is null)
            {
                return Unauthorized();
            }
            var result = _userService.Login(user, userFromDB);

            if (result is not null)
            {
                return Ok(result);
            }

            else
            {
                return NotFound();
            }
        }
        [HttpPost("{userid}/image"), Authorize]
        public async Task<ActionResult<UserDTO>> AddImage(Guid userid)
        {
            var user = await _userService.GetUserById(userid);
            if (Request.Form.Files.Count == 0 || user is null) return BadRequest();
            var img = new Image();
            var file = Request.Form.Files[0];
            var imgId = Guid.NewGuid();

            using var streamReadImgFile = file.OpenReadStream();

            if (streamReadImgFile is null)
            {
                return BadRequest();
            }
            var imgBitmap = new Bitmap(streamReadImgFile); //only windows supp

            byte[] data;
            using var streamReadDataFromImage = new MemoryStream();

            if (streamReadDataFromImage is null) return BadRequest();

            imgBitmap?.Save(streamReadDataFromImage, System.Drawing.Imaging.ImageFormat.Jpeg); //only windows supp
            data = streamReadDataFromImage.ToArray();
            await _imageService.RemoveImage(user.ImageId);
            user.ImageId = imgId;
            img.Id = imgId;
            img.Data = data;
            await _userService.UpdateUser(user);
            await _imageService.InsertImage(img);
            return Ok(user);
        }

        [HttpGet("{userid}/image")]
        public async Task<ActionResult<IFormFile>> GetImage(Guid userid)
        {
            var user = await _userService.GetUserById(userid);

            if (user is null)
            {
                return NotFound();
            }

            if (user.ImageId is null)
            {
                byte[] placeHolder = System.IO.File.ReadAllBytes("./Assets/Images/profilePlaceholder.jpg");
                return File(placeHolder, "image/png");
            }

            var image = await _imageService.GetImageById((Guid)user.ImageId);

            if (image is null)
            {
                byte[] placeHolder = System.IO.File.ReadAllBytes("./Assets/Images/profilePlaceholder.jpg");
                return File(placeHolder, "image/png");
            }

            return File(image.Data!, "image/jpeg");
        }
    }
}
