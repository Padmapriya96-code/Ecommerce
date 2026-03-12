using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Ecommerce.DAL.Entity
{
    [Table("OrderItems1")]
    public class OrderItems1
    {
        public int Id { get; set; }
        [ForeignKey("Order1")]
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order1 Order1 { get; set; }

        public int ProductId { get; set; }

        public string Name { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }
    }
}
