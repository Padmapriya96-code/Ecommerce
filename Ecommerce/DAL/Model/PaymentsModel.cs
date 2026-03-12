using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Model
{
    public class PaymentsModel
    {
        [Key]
        public int PaymentId { get; set; }
        public int OrderId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
    }
}
