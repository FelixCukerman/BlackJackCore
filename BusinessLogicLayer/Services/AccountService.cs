using BusinessLogicLayer.Interfaces;
using EntitiesLayer.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using BusinessLogicLayer.Providers;
using System.IdentityModel.Tokens.Jwt;
using ViewModelsLayer.ViewModels.AccountViewModel;

namespace BusinessLogicLayer.Services
{
    public class AccountService : IAccountService
    {
        private UserManager<User> _userManager { get; set; }
        private SignInManager<User> _signInManager { get; set; }

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        private async Task<ClaimsIdentity> GetIdentity(string username)
        {
            User person = await _userManager.FindByNameAsync(username);

            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.UserName),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.UserRole.ToString())
                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", 
                    ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);

                return claimsIdentity;
            }
            
            return null;
        }

        public async Task<GetTokenViewModel> GetToken(string username)
        {
            var identity = await GetIdentity(username);
            if (identity == null)
            {
                throw new NullReferenceException("Invalid username");

            }

            DateTime currentDate = DateTime.UtcNow;

            var jwt = new JwtSecurityToken
            (
                issuer: AuthOptions._Issuer,
                audience: AuthOptions._Audience,
                notBefore: currentDate,
                claims: identity.Claims,
                expires: currentDate.Add(TimeSpan.FromMinutes(AuthOptions._Lifetime)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256Signature)
            );

            string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new GetTokenViewModel
            {
                AccessToken = encodedJwt,
                Username = identity.Name
            };

            return response;
        }
    }
}
