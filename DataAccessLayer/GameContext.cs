using Microsoft.EntityFrameworkCore;
using EntitiesLayer.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using EntitiesLayer.Enums;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer
{
    public class GameContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public GameContext(DbContextOptions<GameContext> options) : base(options)
        {

            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Card>().HasData(DatabaseInitializer.GetCards().ToArray());
            modelBuilder.Entity<User>().HasData(new User { Id = 1, UserName = "Dealer", UserRole = UserRoleType.Dealer });

            base.OnModelCreating(modelBuilder);
        }
        
        public DbSet<Card> Cards { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Round> Rounds { get; set; }
        public DbSet<Move> Moves { get; set; }
        public DbSet<UserGames> UserGames { get; set; }
        public DbSet<UserRound> UserRounds { get; set; }
    }
}
