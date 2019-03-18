using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace BusinessLogicLayer.Providers
{
    public class AuthOptions
    {
        public const string _Issuer = "Auth";
        public const string _Audience = "http://localhost:53002/";
        public const int _Lifetime = 1;

        private const string _Key = "secretkey";

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_Key));
        }
    }
}