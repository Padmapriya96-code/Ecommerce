using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Entity
{
    public class Customers
    {
        [Key]
        public int CustomerId { get; set; }
        
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public string? Address { get; set; }
        public decimal Phone { get; set; }


    }
}
