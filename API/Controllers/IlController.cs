using BLL;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("Il")]
    public class IlController : BaseController<Il>
    {
        public IlController(ILogger<BaseController<Il>> logger, IBusiness<Il> business) : base(logger, business)
        {
        }
    }
}