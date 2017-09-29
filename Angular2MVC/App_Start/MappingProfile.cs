using AutoMapper;
using Angular2MVC.Controllers;
using ProductsRepository.Core.DbContext;
using ProductsRepository.Core;

namespace Angular2MVC.App_Start

{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDto>().ReverseMap();
                
        }
    }
}