using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Abstraction;
using EntitiesLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : class, IBaseEntity

    {
        protected GameContext _data;
        private DbSet<T> _dbSet;

        public GenericRepository(GameContext data)
        {
            _data = data;
            _dbSet = _data.Set<T>();
        }

        public async Task<IEnumerable<T>> Get()
        {
            IEnumerable<T> result = await _dbSet.AsNoTracking().ToListAsync();

            return result;
        }

        public async Task<T> Get(int id)
        {
            T result = await _dbSet.FindAsync(id);

            return result;
        }

        public async Task Create(T t)
        {
            _dbSet.Add(t);

            await _data.SaveChangesAsync();
        }

        public async Task CreateRange(IEnumerable<T> items)
        {
            _dbSet.AddRange(items);

            await _data.SaveChangesAsync();
        }

        public async Task Update(T t)
        {
            _data.Entry(t).State = EntityState.Modified;

            await _data.SaveChangesAsync();
        }

        public async Task UpdateRange(IEnumerable<T> items)
        {
            List<T> list = items.ToList();

            for (int i = 0; i < items.Count(); i++)
            {
                _data.Entry(list[0]).State = EntityState.Modified;
            }

            await _data.SaveChangesAsync();
        }
        public async Task Delete(T t)
        {
            _dbSet.Remove(t);

            await _data.SaveChangesAsync();
        }
        public async Task DeleteRange(IEnumerable<T> items)
        {
            _dbSet.RemoveRange(items);

            await _data.SaveChangesAsync();
        }
    }
}