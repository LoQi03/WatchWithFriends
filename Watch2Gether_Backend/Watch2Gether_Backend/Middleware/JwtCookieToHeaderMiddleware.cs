namespace WatchWithFriends.Middleware
{
    public class JwtCookieToHeaderMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtCookieToHeaderMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Cookies.ContainsKey("token"))
            {
                var token = context.Request.Cookies["token"];
                context.Request.Headers.Append("Authorization", $"Bearer {token}");
            }

            await _next(context);
        }
    }
}
