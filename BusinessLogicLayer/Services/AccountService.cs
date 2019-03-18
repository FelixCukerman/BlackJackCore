using BusinessLogicLayer.Interfaces;
using EntitiesLayer.Entities;
using EntitiesLayer.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ViewModelsLayer.ViewModels.AccountViewModel;
using ViewModelsLayer.ViewModels.UserViewModels;

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

        private async Task<bool> CheckUserExist(string username)
        {
            User user = await _userManager.FindByNameAsync(username);

            bool userExist = true;

            if(user == null)
            {
                userExist = false;
                return userExist;
            }

            return userExist;
        }



        public async Task<User> RegisterUser(RegisterViewModel request)
        {
            var user = new User();
            user.UserName = request.Username;
            user.UserRole = UserRoleType.PeoplePlayer;

            IdentityResult result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return user;
            }

            return null;
        }

        public async Task<bool> LoginUser(LoginViewModel request)
        {
            string password = request.Password;
            string username = request.Username;

            SignInResult result = await _signInManager.PasswordSignInAsync(username, password, false, false);

            return result.Succeeded;
        }

        public async Task LogOut()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
