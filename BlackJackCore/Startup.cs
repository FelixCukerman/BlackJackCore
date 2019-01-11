using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;
using DataAccessLayer.Repositories.DapperRepositories;
using BusinessLogicLayer.Providers;
using DataAccessLayer;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace BlackJackCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddAutoMapper();
            services.AddMemoryCache();
            services.AddScoped<IGameService, GameService>();
            services.AddRepositories();
            //services.AddScoped<IGameRepository, GameRepository>();
            //services.AddScoped<ICardRepository, CardRepository>();
            //services.AddScoped<IMoveRepository, MoveRepository>();
            //services.AddScoped<IRoundRepository, RoundRepository>();
            //services.AddScoped<IUserRepository, UserRepository>();
            //services.AddScoped<IUserGamesRepository, UserGamesRepository>();
            //services.AddScoped<IUserRoundRepository, UserRoundRepository>();
            //services.AddDbContext<GameContext>(options => options.UseSqlServer(connectionString, b => b.MigrationsAssembly("DataAccessLayer")));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
