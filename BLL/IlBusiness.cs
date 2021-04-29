using DAL.Entities;
using DAL.Repositories;

namespace BLL
{
    public class IlBusiness : BaseBusiness<Il>
    {
        public IlBusiness(BaseRepository<Il> repository) : base(repository)
        {
        }
    }
}