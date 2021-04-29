using BLL;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("MusteriTelefon")]
    public class MusteriTelefonController : BaseController<MusteriTelefon>
    {
        public MusteriTelefonController(ILogger<BaseController<MusteriTelefon>> logger, IBusiness<MusteriTelefon> business) : base(logger, business)
        {
        }
    }
}