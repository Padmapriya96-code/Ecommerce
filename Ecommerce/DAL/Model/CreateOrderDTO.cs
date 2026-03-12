namespace Ecommerce.DAL.Model
{
    public class CreateOrderDTO
    {
        public string UserEmail { get; set; }
        public decimal Total { get; set; }

        public List<OrderItemDTO> OrderItems { get; set; }

        public PaymentInfoDTO PaymentInfo { get; set; }
    }
    public class OrderItemDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
    public class PaymentInfoDTO
    {
        public string Name { get; set; }
        public string CardLast4 { get; set; }
        public string Expiry { get; set; }
    }
}
