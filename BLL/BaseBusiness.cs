using DAL.Repositories;
using System.Linq;

namespace BLL
{
    public abstract class BaseBusiness<TEntity> : IBusiness<TEntity>
        where TEntity : class
    {
        protected BaseRepository<TEntity> _Repository;

        public BaseBusiness(BaseRepository<TEntity> repository)
        {
            _Repository = repository;
        }

        public virtual void Delete(object obj)
        {
            try
            {
                _Repository.BeginTransaction();
                _Repository.Delete(obj);
            }
            catch
            {
                _Repository.RollbackTransaction();
            }
        }

        public virtual TEntity Get(object objId)
        {
            return _Repository.Query(typeof(TEntity), objId) as TEntity;
        }

        public virtual IQueryable<TEntity> Get()
        {
            return _Repository.Query();
        }

        public virtual IQueryable<TEntity> Get(string propertyName, object propertyValue)
        {
            return _Repository.Query(propertyName, propertyValue);
        }

        public virtual void Save(object obj)
        {
            try
            {
                _Repository.BeginTransaction();
                _Repository.CreateOrUpdate(obj);
            }
            catch
            {
                _Repository.RollbackTransaction();
            }
        }
    }
}