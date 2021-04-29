using DAL.Entities;
using NHibernate;

namespace DAL.Repositories
{
    public class IlRepository : BaseRepository<Il>
    {
        public IlRepository(ISession session) : base(session)
        {
        }
    }
}