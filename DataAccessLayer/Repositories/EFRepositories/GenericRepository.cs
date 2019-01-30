using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Interfaces;
using EntitiesLayer.Abstraction;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer;

namespace DataAccessLayer.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : BaseEntity
    {
        protected GameContext data;
        private DbSet<T> dbSet;
        public GenericRepository(GameContext data)
        {
            this.data = data;
            dbSet = data.Set<T>();
        }
        public async Task<IEnumerable<T>> Get()
        {
            return await dbSet.AsNoTracking().ToListAsync();
        }
        public async Task<T> Get(int id)
        {
            return await dbSet.FindAsync(id);
        }
        public async Task Create(T t)
        {
            dbSet.Add(t);
            await data.SaveChangesAsync();
        }
        public async Task CreateRange(IEnumerable<T> items)
        {
            dbSet.AddRange(items);
            await data.SaveChangesAsync();
        }
        public async Task Update(T t)
        {
            data.Entry(t).State = EntityState.Modified;
            await data.SaveChangesAsync();
        }
        public async Task UpdateRange(IEnumerable<T> items)
        {
            var list = items.ToList();
            for (int i = 0; i < items.Count(); i++)
            {
                data.Entry(list[0]).State = EntityState.Modified;
            }
            await data.SaveChangesAsync();
        }
        public async Task Delete(T t)
        {
            dbSet.Remove(t);
            await data.SaveChangesAsync();
        }
        public async Task DeleteRange(IEnumerable<T> items)
        {
            dbSet.RemoveRange(items);
            await data.SaveChangesAsync();
        }
    }
}