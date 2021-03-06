using System;
using System.Linq;

namespace BLL
{
    public interface IBusiness<TEntity>
        where TEntity : class
    {
        void Save(object obj);

        void Delete(object obj);

        TEntity Get(long objId);

        IQueryable<TEntity> Get();

        IQueryable<TEntity> Get(string propertyName, string propertyValue);
    }
}