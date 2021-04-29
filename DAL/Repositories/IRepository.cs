using System;
using System.Linq;

namespace DAL.Repositories
{
    public interface IRepository<TEntity>
    {
        void CreateOrUpdate(object obj);

        void Delete(object obj);

        object Query(Type objType, object objId);

        IQueryable<TEntity> Query();

        IQueryable<TEntity> Query(string propertyName, object propertyValue);
    }
}