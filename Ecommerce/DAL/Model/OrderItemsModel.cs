using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Model
{
    public class OrderItemsModel
    {
        [Key]
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public decimal Price { get; set; }
    }
}
