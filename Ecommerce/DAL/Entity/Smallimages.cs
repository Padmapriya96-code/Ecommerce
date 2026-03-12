using System.ComponentModel.DataAnnotations;

namespace Ecommerce.DAL.Entity
{
    public class Smallimages
    {
        [Key]
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
    }
}
