using Ecommerce.DAL.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.DAL.Model
{
    [Table("PaymentInfo")]
    public class PaymentInfoModel
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order1 Order { get; set; }

        public string Name { get; set; }

        public string CardLast4 { get; set; }

        public string Expiry { get; set; }
    }
}
