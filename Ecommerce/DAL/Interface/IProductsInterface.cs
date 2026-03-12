using Ecommerce.DAL.Entity;

namespace Ecommerce.DAL.Interface
{
    public interface IProductsInterface
    {
        public Products Addproducts(Products products);
        public List<Products> GetProducts();
        public Products Getbyid(int productId);
        public Products Deleteproducts(int productId);
        public List<Products> Getallbysearch(string? searchkey);
    }
}
