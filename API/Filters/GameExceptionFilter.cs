using API.Interfaces;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace API.Filters
{
    public class GameExceptionFilter : ExceptionFilterAttribute
    {
        private IFileLogger _logger { get; set; }

        public GameExceptionFilter(IFileLogger logger)
        {
            _logger = logger;
        }

        public override void OnException(HttpActionExecutedContext context)
        {
            _logger.LogError(context.Exception);
            context.Response = new HttpResponseMessage(HttpStatusCode.NotFound);
        }
    }
}
