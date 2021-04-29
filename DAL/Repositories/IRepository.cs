using System;
using System.Linq;

namespace DAL.Repositories
{
    public interface IRepository<TEntity>
    {
        void Save(object obj);

        void Delete(object obj);

        object Get(Type objType, object objId);

        IQueryable<TEntity> Get();

        IQueryable<TEntity> Get(string propertyName, object propertyValue);
    }
}