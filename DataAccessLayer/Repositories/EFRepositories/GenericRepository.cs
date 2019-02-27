using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : BaseEntity
    {
        protected GameContext _data;
        private DbSet<T> _dbSet;
        public GenericRepository(GameContext _data)
        {
            this._data = _data;
            _dbSet = _data.Set<T>();
        }
        public async Task<IEnumerable<T>> Get()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }
        public async Task<T> Get(int id)
        {
            return await _dbSet.FindAsync(id);
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
            var list = items.ToList();
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