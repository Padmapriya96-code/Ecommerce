using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Entity
{
    public class Users
    {
        public int Id { get; set; }

        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; }= "User";
    }
}
