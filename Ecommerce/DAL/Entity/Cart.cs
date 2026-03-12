using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Entity
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }
        public int CustomerId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
