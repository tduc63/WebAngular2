using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsRepository.Core
{
    public interface IUnitOfWork
    {
        void Completed();
        IProductsRepository Products { get; }
    }
    
}
