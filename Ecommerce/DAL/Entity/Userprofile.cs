using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Entity
{
    public class Userprofile
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = "";
        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }
}
