using Ecommerce.DAL.Entity;

namespace Ecommerce.DAL.Model
{
    public class Order1Model
    {
        public int Id { get; set; }

        public string UserEmail { get; set; }

        public decimal Total { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public PaymentInfo PaymentInfo { get; set; }

        public List<OrderItems1> OrderItems { get; set; }
    }
}
