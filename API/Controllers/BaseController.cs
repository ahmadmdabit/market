using BLL;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public abstract class BaseController<TEntity> : ControllerBase
        where TEntity : BaseEntity
    {
        private readonly ILogger<BaseController<TEntity>> _logger;
        protected readonly IBusiness<TEntity> _Business;

        public BaseController(ILogger<BaseController<TEntity>> logger, IBusiness<TEntity> business)
        {
            _logger = logger;
            _Business = business;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation($"GET : {nameof(TEntity)}");
            return Ok(new ApiResponse { Status = true, Data = _Business.Get(), Error = null });
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute]long id)
        {
            _logger.LogInformation($"GET : {nameof(TEntity)} - {id}");
            var entity = _Business.Get(id);
            return Ok(new ApiResponse { Status = entity != null, Data = entity, Error = entity != null ? null : "Not Found!" });
        }

        [HttpGet("{propName}/{propValue}")]
        public IActionResult GetByProperty([FromRoute]string propName, [FromRoute]string propValue)
        {
            _logger.LogInformation($"GET : {nameof(TEntity)} - {propName}, {propValue}");
            var entity = _Business.Get(propName, propValue);
            return Ok(new ApiResponse { Status = entity != null, Data = entity, Error = entity != null ? null : "Not Found!" });
        }

        [HttpPost]
        public IActionResult Create([FromBody]TEntity entity)
        {
            try
            {
                _logger.LogInformation($"Create : {nameof(TEntity)} - {JsonConvert.SerializeObject(entity)}");
                _Business.Save(entity);
                return Ok(new ApiResponse { Status = true, Data = null, Error = null });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Create : {ex.Message}");
                return Ok(new ApiResponse { Status = false, Data = null, Error = "Internal server error" });
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody]TEntity entity)
        {
            try
            {
                _logger.LogInformation($"Update : {nameof(TEntity)} - {JsonConvert.SerializeObject(entity)}");
                _Business.Save(entity);
                return Ok(new ApiResponse { Status = true, Data = null, Error = null });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Update : {ex.Message}");
                return Ok(new ApiResponse { Status = false, Data = null, Error = "Internal server error" });
            }
        }

        [HttpDelete]
        public IActionResult Delete([FromBody]TEntity entity)
        {
            try
            {
                _logger.LogInformation($"Delete : {nameof(TEntity)} - {JsonConvert.SerializeObject(entity)}");
                _Business.Delete(entity);
                return Ok(new ApiResponse { Status = true, Data = null, Error = null });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Delete : {ex.Message}");
                return Ok(new ApiResponse { Status = false, Data = null, Error = "Internal server error" });
            }
        }
    }
}