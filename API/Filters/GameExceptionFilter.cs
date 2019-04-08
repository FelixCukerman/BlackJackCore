using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Filters
{
    public class GameExceptionFilter : ExceptionFilterAttribute
    {
        private IFileLogger _logger { get; set; }

        public GameExceptionFilter(IFileLogger logger)
        {
            _logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception);
        }
    }
}
