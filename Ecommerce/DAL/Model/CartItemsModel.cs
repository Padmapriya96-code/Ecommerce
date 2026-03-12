using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Model
{
    public class CartItemsModel
    {
        [Key]
        public int CartItemId { get; set; }
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
