using NHibernate;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace DAL.Repositories
{
    public abstract class BaseRepository<TEntity> : IRepository<TEntity>, IDisposable
    //where TEntity : BaseEntity
    {
        protected ISession _session = null;
        protected ITransaction _transaction = null;

        public BaseRepository(ISession session)
        {
            _session = session;
        }

        #region Transaction and Session Management Methods

        public void BeginTransaction()
        {
            _transaction = _session.BeginTransaction();
        }

        public void CommitTransaction()
        {
            // _transaction will be replaced with a new transaction
            // by NHibernate, but we will close to keep a consistent state.
            _transaction.Commit();

            CloseTransaction();
        }

        public void RollbackTransaction()
        {
            // _session must be closed and disposed after a transaction
            // rollback to keep a consistent state.
            _transaction.Rollback();

            CloseTransaction();
            CloseSession();
        }

        private void CloseTransaction()
        {
            _transaction.Dispose();
            _transaction = null;
        }

        private void CloseSession()
        {
            _session.Close();
            _session.Dispose();
            _session = null;
        }

        #endregion Transaction and Session Management Methods

        #region IRepository Members

        public virtual void CreateOrUpdate(object obj)
        {
            _session.SaveOrUpdate(obj);
        }

        public virtual void Delete(object obj)
        {
            _session.Delete(obj);
        }

        public virtual object Query(Type objType, long objId)
        {
            return _session.Load(objType, objId);
        }

        public virtual IQueryable<TEntity> Query()
        {
            return _session.Query<TEntity>();
        }

        public virtual IQueryable<TEntity> Query(string propertyName, string propertyValue)
        {
            var propertyType = typeof(TEntity).GetProperty(propertyName).PropertyType;
            var param = Expression.Parameter(typeof(TEntity));
            var condition =
                Expression.Lambda<Func<TEntity, bool>>(
                    Expression.Equal(
                        Expression.Property(param, propertyName),
                        Expression.Constant(Convert.ChangeType(propertyValue, propertyType), propertyType)
                    ),
                    param
                );

            return _session.Query<TEntity>().Where(condition);
        }

        #endregion IRepository Members

        #region IDisposable Members

        public void Dispose()
        {
            if (_transaction != null)
            {
                // Commit transaction by default, unless user explicitly rolls it back.
                // To rollback transaction by default, unless user explicitly commits,
                // comment out the line below.
                CommitTransaction();
            }

            if (_session != null)
            {
                _session.Flush(); // commit session transactions
                CloseSession();
            }
        }

        #endregion IDisposable Members
    }
}