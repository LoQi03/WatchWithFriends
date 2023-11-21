using WatchWithFriends_Data.Model;
using WatchWithFriends_Data.Repositories;

namespace WatchWithFriends.Middleware
{
    public class ExceptionLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext, ILogRepository logRepository)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await LogExceptionAsync(ex, logRepository);
            }
        }

        private async Task LogExceptionAsync(Exception exception, ILogRepository logRepository)
        {
            if (exception.StackTrace == null)
            {
                return;
            }

            var logEntry = new Log
            {
                Id = Guid.NewGuid(),
                Time = DateTime.UtcNow,
                Message = exception.Message,
                StackTrace = exception.StackTrace
            };
            await logRepository.InsertLogAsync(logEntry);
        }
    }
}
