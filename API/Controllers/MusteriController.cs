using BLL;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("Musteri")]
    public class MusteriController : BaseController<Musteri>
    {
        public MusteriController(ILogger<BaseController<Musteri>> logger, IBusiness<Musteri> business) : base(logger, business)
        {
        }
    }
}