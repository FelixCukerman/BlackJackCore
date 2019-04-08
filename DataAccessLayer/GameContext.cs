using Microsoft.EntityFrameworkCore;
using EntitiesLayer.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using DataAccessLayer.Interfaces;

namespace DataAccessLayer
{
    public class GameContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        private IDatabaseInitializer _initializer;

        public GameContext(DbContextOptions<GameContext> options, IDatabaseInitializer initializer) : base(options)
        {
            _initializer = initializer;
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Card>().HasData(_initializer.GetCards().ToArray());
            modelBuilder.Entity<User>().HasData(_initializer.GetUsers().ToArray());

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
