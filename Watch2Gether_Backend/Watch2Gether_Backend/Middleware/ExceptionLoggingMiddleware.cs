using System.Text.Json;
using WatchWithFriends_Data.Model;
using WatchWithFriends_Data.Repositories;

namespace WatchWithFriends.Middleware
{
    public class ExceptionLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogRepository _logRepository;

        public ExceptionLoggingMiddleware(RequestDelegate next,ILogRepository logRepository)
        {
            _next = next;
            _logRepository = logRepository;
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
            var logEntry = new Log
            {
                Id = Guid.NewGuid(),
                Time = DateTime.UtcNow,
                Message = exception.Message,
                StackTrace = exception.StackTrace
            };
            await _logRepository.InsertLogAsync(logEntry);
        }
    }
}
