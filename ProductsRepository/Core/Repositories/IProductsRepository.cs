using ProductsRepository.Core.DbContext;
using System.Collections.Generic;

namespace ProductsRepository.Core
{
    public interface IProductsRepository
    {
        Product GetProduct(int prdId);
        IEnumerable<Product> GetProducts(int pageIndex, int pageSize);
        void Add(Product prd);
        Product Edit(int id, Product prd);
        void Delete(int prdId);
    }
}