using DAL.Entities;
using DAL.Repositories;

namespace BLL
{
    public class MusteriBusiness : BaseBusiness<Musteri>
    {
        public MusteriBusiness(BaseRepository<Musteri> repository) : base(repository)
        {
        }
    }
}