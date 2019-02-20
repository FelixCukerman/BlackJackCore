using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Dapper;
using Dapper.Contrib.Extensions;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Entities;

namespace DataAccessLayer.Repositories.DapperRepositories
{
    public class DapperMoveRepository : IMoveRepository
    {
        private string connectionString = null;
        public DapperMoveRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<IEnumerable<Move>> Get()
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAllAsync<Move>();
            }
        }

        public async Task<Move> Get(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                return await db.GetAsync<Move>(id);
            }
        }

        public async Task Create(Move move)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.InsertAsync(move);
                move.Id = invoice;
            }
        }

        public async Task CreateRange(IEnumerable<Move> moves)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < moves.Count(); i++)
                    {
                        var invoice = await db.InsertAsync(moves.ElementAt(i));
                        moves.ElementAt(i).Id = invoice;
                    }
                    scope.Complete();
                }
            }
        }

        public async Task Update(Move move)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.UpdateAsync(move);
            }
        }

        public async Task UpdateRange(IEnumerable<Move> moves)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for(int i = 0; i < moves.Count(); i++)
                    {
                        var invoice = await db.UpdateAsync(moves.ElementAt(i));
                    }
                }
                scope.Complete();
            }
        }

        public async Task Delete(Move move)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var invoice = await db.DeleteAsync(move);
            }
        }

        public async Task DeleteRange(IEnumerable<Move> moves)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                using (IDbConnection db = new SqlConnection(connectionString))
                {
                    for (int i = 0; i < moves.Count(); i++)
                    {
                        var invoice = await db.DeleteAsync(moves.ElementAt(i));
                    }
                    scope.Complete();
                }
            }
        }

        public async Task<List<Move>> Get(int userId, int roundId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Moves WHERE UserId = @userId AND RoundId = @roundId");
                var moves = await db.QueryAsync<Move>(sqlQuery.ToString(), new { userId, roundId } );
                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(Round round)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Moves WHERE RoundId = @roundId");
                var roundId = round.Id;
                var moves = await db.QueryAsync<Move>(sqlQuery.ToString(), new { roundId });
                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(IEnumerable<User> users)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Moves WHERE UserId IN @userIds");
                List<int> userIds = users.Select(m => m.Id).ToList();
                var moves = await db.QueryAsync<Move>(sqlQuery.ToString(), new { userIds });
                return moves.ToList();
            }
        }

        public async Task<List<Move>> Get(IEnumerable<User> users, int roundId)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                StringBuilder sqlQuery = new StringBuilder("SELECT * FROM Moves WHERE UserId IN @userIds AND RoundId = @roundId");
                List<int> userIds = users.Select(m => m.Id).ToList();
                var moves = await db.QueryAsync<Move>(sqlQuery.ToString(), new { userIds });
                return moves.ToList();
            }
        }
    }
}