using System.Text.Json;

namespace WatchWithFriends.Middleware
{
    public class ExceptionLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await LogExceptionAsync(ex);
            }
        }

        private async Task LogExceptionAsync(Exception exception)
        {
            var logEntry = new
            {
                Time = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),
                Message = exception.Message,
                StackTrace = exception.StackTrace
            };

            var json = JsonSerializer.Serialize(logEntry);

            await File.AppendAllTextAsync("exceptions.json", json+ "," + Environment.NewLine);
        }
    }
}
