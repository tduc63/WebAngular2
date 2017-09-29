using ProductsRepository.Core;
using ProductsRepository.Core.DbContext;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System;

namespace ProductsRepository.Presistance
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly Serene1_Northwind_v1Entities _context;
        public ProductsRepository(Serene1_Northwind_v1Entities context)
        {
            _context = context;
        }
        public void Add(Product prd)
        {
            _context.Products.Add(prd);
        }


        public void Delete(int prdId)
        {
            var prd = _context.Products.SingleOrDefault(r => r.ProductID == prdId);
            _context.Products.Remove(prd);
        }

        public Product Edit(int id,Product prd)
        {
            
           var temp = _context.Products.Where(r=>r.ProductID == id).First();
            if(temp != null)
            {
                foreach (PropertyInfo propertyInfo in prd.GetType().GetProperties())
                {
                    //if (propertyInfo.GetValue(temp, null) == null)
                        propertyInfo.SetValue(temp, propertyInfo.GetValue(prd, null), null);
                }
                //_context.Set<Product>().Attach(prd);
                //_context.Entry(temp).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            else
            {
                _context.Products.Add(prd);
            }
            return prd;
        }


        public Product GetProduct(int prdId)
        {
            return _context.Products.Where(r => r.ProductID == prdId).FirstOrDefault();
        }

        public IEnumerable<Product> GetProducts(int pageIndex, int pageSize)
        {
            
            if (pageIndex > 0 && pageSize > 0)
            {

               var tem1 = _context.Products.OrderBy(r=>r.ProductName);
              var  tem = tem1.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
                return tem;
            }
            else
            {
                var tem = _context.Products.ToList();
                return tem;
            }

             
            
            return null;
        }


    }
}
