using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace BusinessLogicLayer.Providers
{
    public class AuthOptions
    {
        public const string _Issuer = "http://localhost:53002/";
        public const string _Audience = "http://localhost:53002/";
        public const int _Lifetime = 120;

        private const string _Key = "secretkeyspitonthetable";

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Key));
        }
    }
}