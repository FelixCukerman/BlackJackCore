using Microsoft.EntityFrameworkCore;
using EntitiesLayer.Entities;

namespace DataAccessLayer
{
    public class GameContext : DbContext
    {
        public GameContext(DbContextOptions<GameContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Card>().HasData(DatabaseInitializer.GetCards().ToArray());
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Round> Rounds { get; set; }
        public DbSet<Move> Moves { get; set; }
        public DbSet<UserGames> UserGames { get; set; }
        public DbSet<UserRound> UserRounds { get; set; }
    }
}
