using Microsoft.AspNetCore.Mvc;
using ImageModel = WatchWithFriends_Data.Model.Image;
using WatchWithFriends.Services;
using Microsoft.AspNetCore.Authorization;
using WatchWithFriends.Model;

namespace WatchWithFriends.Controllers
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

        [HttpGet("token")]
        public async Task<ActionResult<UserDTO>> GetUserByToken()
        {
            if (HttpContext.Request.Headers.TryGetValue("Authorization", out var authorizationHeader))
            {
                var token = authorizationHeader.ToString().Split(' ').LastOrDefault();
                if (token != null)
                {
                    var user = await _userService.GetUserByToken(token);
                    if (user is null)
                    {
                        return NotFound();
                    }
                    return Ok(user);
                }
            }

            return BadRequest("Token is missing or invalid.");
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

            if (result.Item1 == null || result.Item2 == null)
            {
                return NotFound();
            }
            CreateCookie(result.Item2);
            return Ok(result.Item1);
        }

        private void CreateCookie(string? result)
        {
            CookieOptions options = new CookieOptions();
            options.Expires = DateTime.Now.AddDays(7);
            options.Secure = true;
            options.HttpOnly = true;
            options.SameSite = SameSiteMode.None;
            options.Path = "/";
            Response.Cookies.Append("token", result, options);
        }

        [HttpPost("{userid}/image"), Authorize]
        public async Task<ActionResult<UserDTO>> AddImage(Guid userid)
        {
            var user = await _userService.GetUserById(userid);

            if (Request.Form.Files.Count == 0 || user is null) 
            {
                return BadRequest();
            } 

            var img = new ImageModel();
            var file = Request.Form.Files[0];
            var imgId = Guid.NewGuid();

            await _imageService.RemoveImage(user.ImageId);

            user.ImageId = imgId;
            img.Id = imgId;
            img.Data = await _imageService.ConvertImageToByte(file);

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
