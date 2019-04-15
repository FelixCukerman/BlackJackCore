using API.Constants;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Net;

namespace API.Extensions
{
    public static class LogMiddleware
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, IFileLogger logger)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.ContentType = "application/json";

                    IExceptionHandlerFeature contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature != null)
                    {
                        return;
                    }

                    logger.LogError($"{contextFeature.Error}");

                    var errorDetails = new ErrorDetails();
                    errorDetails.StatusCode = HttpStatusCode.InternalServerError;
                    errorDetails.Message = ConfigurationConstant.InternalServerErrorMessage;
                    
                    string errorResponse = JsonConvert.SerializeObject(errorDetails);

                    await context.Response.WriteAsync(errorResponse);
                });
            });
        }
    }
}
