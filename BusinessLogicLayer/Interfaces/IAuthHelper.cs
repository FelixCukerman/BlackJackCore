using Microsoft.IdentityModel.Tokens;

namespace BusinessLogicLayer.Interfaces
{
    public interface IAuthHelper
    {
        SymmetricSecurityKey GetSymmetricSecurityKey();
    }
}
