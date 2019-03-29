using System.Text;
using Microsoft.IdentityModel.Tokens;
using BusinessLogicLayer.Interfaces;

namespace BusinessLogicLayer.Helpers
{
    public class AuthHelper : IAuthHelper
    {
        public const string Issuer = "http://localhost:53002/";
        public const string Audience = "http://localhost:53002/";
        public const int Lifetime = 120;

        private const string _key = "secretkeyspitonthetable";

        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            var result = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));

            return result;
        }
    }
}