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
using EntitiesLayer.Enums;

namespace BusinessLogicLayer.Services
{
    public class AccountService : IAccountService
    {
        private IUserRepository _userRepository;
        private IAuthHelper _authHelper;

        public AccountService(IUserRepository userRepository, IAuthHelper authHelper)
        {
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
                new Claim(ClaimsIdentity.DefaultNameClaimType, person.UserName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, person.UserRole.ToString())
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

        public async Task CreateUser(string username)
        {
            var user = new User();
            user.UserName = username;
            user.UserRole = UserRoleType.People;

            await _userRepository.Create(user);
        }
    }
}
