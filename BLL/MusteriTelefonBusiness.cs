using DAL.Entities;
using DAL.Repositories;

namespace BLL
{
    public class MusteriTelefonBusiness : BaseBusiness<MusteriTelefon>
    {
        public MusteriTelefonBusiness(BaseRepository<MusteriTelefon> repository) : base(repository)
        {
        }
    }
}