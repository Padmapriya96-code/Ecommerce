using Ecommerce.DAL.Model;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Ecommerce.DAL.Entity
{
    [Table("order1")]
    public class Order1
    {
        public int Id { get; set; }

        public string UserEmail { get; set; }
      

        public decimal Total { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
       
        public PaymentInfo PaymentInfo { get; set; }

        [JsonPropertyName("orderItems1")]
        public List<OrderItems1> OrderItems1 { get; set; } = new List<OrderItems1>();
    }
}
