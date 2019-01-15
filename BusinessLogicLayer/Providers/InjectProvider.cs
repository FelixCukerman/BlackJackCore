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
            var repositoryType = configuration.GetSection("Dapper");
            RepositoryType key = (RepositoryType)Enum.Parse(typeof(RepositoryType), repositoryType.Key);
            services.AddDbContext<GameContext>(options => options.UseSqlServer(_connectionString, b => b.MigrationsAssembly("DataAccessLayer")));

            if (key == RepositoryType.Dapper)
            {
                services.AddTransient<IGameRepository>(provider => new DapperGameRepository(_connectionString));
                services.AddTransient<ICardRepository>(provider => new DapperCardRepository(_connectionString));
                services.AddTransient<IMoveRepository>(provider => new DapperMoveRepository(_connectionString));
                services.AddTransient<IRoundRepository>(provider => new DapperRoundRepository(_connectionString));
                services.AddTransient<IUserRepository>(provider => new DapperUserRepository(_connectionString));
                services.AddTransient<IUserGamesRepository>(provider => new DapperUserGamesRepository(_connectionString));
                services.AddTransient<IUserRoundRepository>(provider => new DapperUserRoundRepository(_connectionString));
            }
            if (key == RepositoryType.EF)
            {
                services.AddTransient<IGameRepository, GameRepository>();
                services.AddTransient<ICardRepository, CardRepository>();
                services.AddTransient<IMoveRepository, MoveRepository>();
                services.AddTransient<IRoundRepository, RoundRepository>();
                services.AddTransient<IUserRepository, UserRepository>();
                services.AddTransient<IUserGamesRepository, UserGamesRepository>();
                services.AddTransient<IUserRoundRepository, UserRoundRepository>();
            }
        }
    }
}