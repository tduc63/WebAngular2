using AutoMapper;
using ProductsRepository;
using ProductsRepository.Core.Repositories;

namespace WebAngular2
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            Mapper.CreateMap<ProductDto, Product>();
        }
    }
}
