﻿using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;
using DataAccessLayer.Repositories.DapperRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogicLayer.Enums;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class InjectProvider
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<GameRepository>();
            services.AddTransient<DapperGameRepository>(options => new DapperGameRepository("connectionString"));
            services.AddTransient<CardRepository>();
            services.AddTransient<MoveRepository>();
            services.AddTransient<RoundRepository>();
            services.AddTransient<UserRepository>();
            services.AddTransient<UserGamesRepository>();
            services.AddTransient<UserRoundRepository>();


            services.AddDbContext<GameContext>(options => options.UseSqlServer("connectionString", b => b.MigrationsAssembly("DataAccessLayer")));

            services.AddTransient<Func<RepositoryType, IGameRepository>>(serviceProvider => key =>
            {
                if (key == RepositoryType.Dapper)
                {
                    return serviceProvider.GetService<DapperGameRepository>();
                }
                if (key == RepositoryType.EF)
                {
                    return serviceProvider.GetService<GameRepository>();
                }
                throw new KeyNotFoundException();
            });

            services.AddTransient<Func<RepositoryType, ICardRepository>>(serviceProvider => key =>
            {
                if (key == RepositoryType.Dapper)
                {
                    return serviceProvider.GetService<DapperCardRepository>();
                }
                if (key == RepositoryType.EF)
                {
                    return serviceProvider.GetService<CardRepository>();
                }
                throw new KeyNotFoundException();
            });

            services.AddTransient<Func<RepositoryType, IMoveRepository>>(serviceProvider => key =>
            {
                if (key == RepositoryType.Dapper)
                {
                    return serviceProvider.GetService<DapperMoveRepository>();
                }
                if (key == RepositoryType.EF)
                {
                    return serviceProvider.GetService<MoveRepository>();
                }
                throw new KeyNotFoundException();
            });
        }
    }
}
