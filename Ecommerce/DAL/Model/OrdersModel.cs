using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Model
{
    public class OrdersModel
    {

        [Key]
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Status { get; set; }
    }
}
