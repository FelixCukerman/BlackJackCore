using Microsoft.AspNetCore.Mvc;

namespace API.Filters
{
    public class GameExceptionAttribute : TypeFilterAttribute
    {
        public GameExceptionAttribute() : base(typeof(GameExceptionFilter))
        {

        }
    }
}
