using Microsoft.AspNetCore.Mvc;
using ImageModel = WatchWithFriends_Data.Model.Image;
using WatchWithFriends.Services;
using Microsoft.AspNetCore.Authorization;
using WatchWithFriends.Model;
using WatchWithFriends.Misc;

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
        [HttpGet("get-all",Name =nameof(GetAll)), Authorize]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAll()
        {
            var result = await _userService.GetUsers();
            return Ok(result);
        }

        [HttpPost("add-user",Name = nameof(AddUser)), Authorize]
        public async Task<ActionResult<UserDTO>> AddUser(UserDTO user)
        {
            var result = UserDTO.FromModel(await _userService.AddUser(user));
            return Ok(result);
        }
        [HttpPut("update-user",Name = nameof(UpdateUser)), Authorize]
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

        [HttpGet("get-user/{id}",Name = nameof(GetUser)), Authorize]
        public async Task<ActionResult<UserDTO>> GetUser(Guid id)
        {
            var user = await _userService.GetUserById(id);
            if (user is null)
            {
                return NotFound();
            }
            return Ok(UserDTO.FromModel(user));
        }

        [HttpGet("get-user-by-token",Name = nameof(GetUserByToken))]
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

        [HttpDelete("delete-user/{id}",Name = nameof(DeleteUser)), Authorize]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            var user = await _userService.DeleteUser(id);
            if (user is null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPost("register-user", Name = nameof(Register))]
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
        [HttpPost("login-user", Name = nameof(Login))]
        public async Task<ActionResult<UserDTO>> Login(UserDTO user)
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
            (var result, var token) = _userService.Login(user, userFromDB);

            if (result == null || token == null)
            {
                return NotFound();
            }
            CreateCookie(token,Config.Instance.ExpiresDay);
            return Ok(result);
        }
        [HttpPost("logout-user",Name = nameof(Logout))]
        public ActionResult Logout()
        {
            CreateCookie("",0);
            return Ok();
        }
        private void CreateCookie(string result,int expDay)
        {
            CookieOptions options = new CookieOptions();
            options.Expires = DateTime.Now.AddDays(expDay);
            options.Secure = true;
            options.HttpOnly = true;
            options.SameSite = SameSiteMode.None;
            options.Path = "/";
            Response.Cookies.Append("token", result, options);
        }

        [HttpPost("add-image/{userid}",Name = nameof(AddImage)), Authorize]
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

        [HttpGet("get-image/{userid}",Name = nameof(GetImage))]
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
