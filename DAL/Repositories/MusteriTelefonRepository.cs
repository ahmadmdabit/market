using DAL.Entities;
using NHibernate;

namespace DAL.Repositories
{
    public class MusteriTelefonRepository : BaseRepository<MusteriTelefon>
    {
        public MusteriTelefonRepository(ISession session) : base(session)
        {
        }
    }
}