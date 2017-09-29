
using AutoMapper;
using ProductsRepository.Core;
using ProductsRepository.Core.DbContext;
using ProductsRepository.Presistance;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;


namespace Angular2MVC.Controllers
{
    public class ProductController : ApiController
    {
        private IUnitOfWork _unitOfWork;
        public ProductController()
        {
            _unitOfWork = new UnitOfWork(new Serene1_Northwind_v1Entities());
        }
        [HttpGet]
        public IEnumerable<ProductDto> Get(int page = 0,int rows = 0)
        {
            var rst = _unitOfWork.Products.GetProducts(page, rows)
            .Select(Mapper.Map<Product, ProductDto>);
            return rst;
        }
        [HttpPost]
        public ProductDto AddPrduct([FromBody]ProductDto prduct)
        {
            _unitOfWork.Products.Add(Mapper.Map<ProductDto,Product>(prduct));
            _unitOfWork.Completed();
            return prduct; 
                
        }
        [HttpPut]
        public int ModifiedPrduct(int id, [FromBody]ProductDto prduct)
        {
   //         var prtem = Mapper.Map<ProductDto, Product>(prduct);
            _unitOfWork.Products.Edit(id, Mapper.Map<ProductDto,Product>(prduct));
            _unitOfWork.Completed();
            return 1;
        }
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            _unitOfWork.Products.Delete( id);
            return Ok();
        }
    }
}
