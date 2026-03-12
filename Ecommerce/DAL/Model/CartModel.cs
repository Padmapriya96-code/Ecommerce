using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Model
{
    public class CartModel
    {

        [Key]
        public int CartId { get; set; }
        public int CustomerId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
