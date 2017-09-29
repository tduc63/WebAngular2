using ProductsRepository.Core;
using ProductsRepository.Core.DbContext;

namespace ProductsRepository.Presistance
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly Serene1_Northwind_v1Entities _context;
        public IProductsRepository Products { get; set; }

        public Serene1_Northwind_v1Entities Context => _context;

        public UnitOfWork(Serene1_Northwind_v1Entities context)
        {
            _context = context;
            Products = new ProductsRepository(_context);
        }
        public void Completed()
        {
            Context.SaveChanges();
        }

        
    }
}
