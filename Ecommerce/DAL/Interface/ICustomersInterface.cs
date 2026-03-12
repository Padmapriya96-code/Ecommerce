using Ecommerce.DAL.Entity;

namespace Ecommerce.DAL.Interface
{
    public interface ICustomersInterface
    {
        public Customers AddCustomers(Customers customer);
        public List<Customers> GetallCustomers();
        public Customers GetbyId(int customerid);
    }
}
