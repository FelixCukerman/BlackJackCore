using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;
using DataAccessLayer.Repositories.DapperRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogicLayer.Enums;
using Microsoft.Extensions.Configuration;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class InjectProvider
    {
        //fix this shit
        private static string _connectionString = "Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = GameDB; Integrated Security = True; Connect Timeout = 30; Encrypt = False; TrustServerCertificate = False; ApplicationIntent = ReadWrite; MultiSubnetFailover = False";

        public static void AddRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<GameRepository>();
            services.AddTransient(provider => new DapperGameRepository(_connectionString));
            services.AddTransient<CardRepository>();
            services.AddTransient(provider => new DapperCardRepository(_connectionString));
            services.AddTransient<MoveRepository>();
            services.AddTransient(provider => new DapperMoveRepository(_connectionString));
            services.AddTransient<RoundRepository>();
            services.AddTransient(provider => new DapperRoundRepository(_connectionString));
            services.AddTransient<UserRepository>();
            services.AddTransient(provider => new DapperUserRepository(_connectionString));
            services.AddTransient<UserGamesRepository>();
            services.AddTransient(provider => new DapperUserGamesRepository(_connectionString));
            services.AddTransient<UserRoundRepository>();
            services.AddTransient(provider => new DapperUserRoundRepository(_connectionString));
            services.AddDbContext<GameContext>(options => options.UseSqlServer(_connectionString, b => b.MigrationsAssembly("DataAccessLayer")));

            services.AddTransient<Func<RepositoryType, IGameRepository>>(serviceProvider => key =>
            {
                if (key == RepositoryType.Dapper)
                {
                    return serviceProvider.GetRequiredService<DapperGameRepository>();
                }
                if (key == RepositoryType.EF) 
                {
                    return serviceProvider.GetRequiredService<GameRepository>();
                }
                throw new KeyNotFoundException();
            });

            services.AddTransient<Func<RepositoryType, ICardRepository>>(serviceProvider => key =>
            {
                if (key == RepositoryType.Dapper)
                {
                    return serviceProvider.GetRequiredService<DapperCardRepository>();
                }
                if (key == RepositoryType.EF)
                {
                    return serviceProvider.GetRequiredService<CardRepository>();
                }
                throw new KeyNotFoundException();
            });

            services.AddTransient<Func<RepositoryType, IMoveRepository>>(serviceProvider => key =>
            {
                if (key == RepositoryType.Dapper)
                {
                    return serviceProvider.GetRequiredService<DapperMoveRepository>();
                }
                if (key == RepositoryType.EF)
                {
                    return serviceProvider.GetRequiredService<MoveRepository>();
                }
                throw new KeyNotFoundException();
            });

            services.AddTransient<Func<RepositoryType, IRoundRepository>>(serviceProvider => key =>
            {
                if (key == RepositoryType.Dapper)
                {
                    return serviceProvider.GetRequiredService<DapperRoundRepository>();
                }
                if (key == RepositoryType.EF)
                {
                    return serviceProvider.GetRequiredService<RoundRepository>();
                }
                throw new KeyNotFoundException();
            });

            services.AddTransient<Func<RepositoryType, IUserGamesRepository>>(serviceProvider => key =>
            {
                if (key == RepositoryType.Dapper)
                {
                    return serviceProvider.GetRequiredService<DapperUserGamesRepository>();
                }
                if (key == RepositoryType.EF)
                {
                    return serviceProvider.GetRequiredService<UserGamesRepository>();
                }
                throw new KeyNotFoundException();
            });

            services.AddTransient<Func<RepositoryType, IUserRoundRepository>>(serviceProvider => key =>
            {
                if (key == RepositoryType.Dapper)
                {
                    return serviceProvider.GetRequiredService<DapperUserRoundRepository>();
                }
                if (key == RepositoryType.EF)
                {
                    return serviceProvider.GetRequiredService<UserRoundRepository>();
                }
                throw new KeyNotFoundException();
            });
        }
    }
}