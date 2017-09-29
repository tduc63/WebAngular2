using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductsRepository.Core;
using ProductsRepository;
using ProductsRepository.Presistance;
using ProductsRepository.Core.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngular2
{
    [Route("api/products")]
    public class ProductsController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        public ProductsController()
        {
            _unitOfWork = new UnitOfWork(new Serene1_Northwind_v1Entities());
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Product> Get(int pgInd, int pgSx)
        {

            return _unitOfWork.Products.GetProducts(pgInd, pgSx) ;
            //return prds.Select(AutoMapper.Mapper.Map<Product, ProductDto>);

        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
