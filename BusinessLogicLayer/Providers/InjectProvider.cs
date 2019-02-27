using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;
using DataAccessLayer.Repositories.DapperRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using BusinessLogicLayer.Enums;
using Microsoft.Extensions.Configuration;
using BusinessLogicLayer.Constants;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class InjectProvider
    {
        public static void AddRepositories(this IServiceCollection services, IConfiguration configuration)
        {
            string connectionString = configuration.GetConnectionString(ConfigureConstant._nameConnection);
            var repositoryType = configuration.GetSection("EF");
            RepositoryType key = (RepositoryType)Enum.Parse(typeof(RepositoryType), repositoryType.Key);
            services.AddDbContext<GameContext>(options => options.UseSqlServer(connectionString, b => b.MigrationsAssembly("DataAccessLayer")));

            if (key == RepositoryType.Dapper)
            {
                services.AddTransient<IGameRepository>(provider => new DapperGameRepository(connectionString));
                services.AddTransient<ICardRepository>(provider => new DapperCardRepository(connectionString));
                services.AddTransient<IMoveRepository>(provider => new DapperMoveRepository(connectionString));
                services.AddTransient<IRoundRepository>(provider => new DapperRoundRepository(connectionString));
                services.AddTransient<IUserRepository>(provider => new DapperUserRepository(connectionString));
                services.AddTransient<IUserGamesRepository>(provider => new DapperUserGamesRepository(connectionString));
                services.AddTransient<IUserRoundRepository>(provider => new DapperUserRoundRepository(connectionString));
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