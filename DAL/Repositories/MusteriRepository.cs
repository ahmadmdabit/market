using DAL.Entities;
using NHibernate;

namespace DAL.Repositories
{
    public class MusteriRepository : BaseRepository<Musteri>
    {
        public MusteriRepository(ISession session) : base(session)
        {
        }
    }
}