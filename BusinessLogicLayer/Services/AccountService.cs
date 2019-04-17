using BusinessLogicLayer.Interfaces;
using EntitiesLayer.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using ViewModelsLayer.ViewModels.AccountViewModel;
using BusinessLogicLayer.Helpers;
using BusinessLogicLayer.Constants;
using DataAccessLayer.Interfaces;

namespace BusinessLogicLayer.Services
{
    public class AccountService : IAccountService
    {
        private IUserRepository _userRepository;
        private IAuthHelper _authHelper;
        private SignInManager<User> _signInManager { get; set; }

        public AccountService(SignInManager<User> signInManager, IUserRepository userRepository, IAuthHelper authHelper)
        {
            _signInManager = signInManager;
            _authHelper = authHelper;
            _userRepository = userRepository;
        }

        private async Task<ClaimsIdentity> GetIdentity(string username)
        {
            User person = await _userRepository.Get(username);

            if (person == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim(ConfigureConstant.ClaimTypeUsername, person.UserName),
                new Claim(ConfigureConstant.ClaimTypeUserRole, person.UserRole.ToString())
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, ConfigureConstant.AuthenticationType,
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            return claimsIdentity;
        }

        public async Task<GetTokenViewModel> GetToken(string username)
        {
            ClaimsIdentity identity = await GetIdentity(username);

            if (identity == null)
            {
                throw new NullReferenceException(BusinessLogicConstant.InvalidUsernameMessage);
            }

            DateTime currentDate = DateTime.UtcNow;

            var jwt = new JwtSecurityToken
            (
                issuer: AuthHelper.Issuer,
                audience: AuthHelper.Audience,
                notBefore: currentDate,
                claims: identity.Claims,
                expires: currentDate.Add(TimeSpan.FromMinutes(AuthHelper.Lifetime)),
                signingCredentials: new SigningCredentials(_authHelper.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256Signature)
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
