using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Ecommerce.DAL.Entity
{
    public class PaymentInfo
    {
       
        public int Id { get; set; }
        [ForeignKey("Order1")]
        public int OrderId { get; set; }
        [JsonIgnore]
        public Order1 Order1 { get; set; }

        public string Name { get; set; }

        public string CardLast4 { get; set; }

        public string Expiry { get; set; }
    }
}
