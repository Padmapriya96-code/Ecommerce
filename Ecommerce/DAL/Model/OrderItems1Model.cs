using Ecommerce.DAL.Entity;

namespace Ecommerce.DAL.Model
{
    public class OrderItems1Model
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order1 Order { get; set; }

        public int ProductId { get; set; }

        public string name { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}
