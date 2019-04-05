﻿using API.Interfaces;
using API.Logger;
using AutoMapper;
using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using DataAccessLayer;
using EntitiesLayer.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using BusinessLogicLayer.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System;
using BusinessLogicLayer.Providers;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<GameContext>()
            .AddDefaultTokenProviders();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = AuthHelper.Issuer,
                    ValidAudience = AuthHelper.Audience,
                    IssuerSigningKey = new AuthHelper().GetSymmetricSecurityKey(),
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddAutoMapper();
            services.AddMemoryCache();
            services.AddRepositories(Configuration);
            services.AddTransient<IGameService, GameService>();
            services.AddTransient<IHistoryService, HistoryService>();
            services.AddTransient<IAccountService, AccountService>();
            services.AddTransient<IFileLogger, FileLogger>();
            services.AddTransient<IHandCardsProvider, HandCardsProvider>();
            services.AddTransient<IAuthHelper, AuthHelper>();
            services.AddTransient<IDeckProvider, DeckProvider>();
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute("start", "game/start", new { controller = "Home", action = "Index" });
                routes.MapRoute("history", "game/history", new { controller = "Home", action = "Index" });
                routes.MapRoute("game", "game/{id}", new { controller = "Home", action = "Index" });
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
