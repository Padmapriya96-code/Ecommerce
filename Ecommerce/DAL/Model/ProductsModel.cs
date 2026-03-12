using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace Ecommerce.DAL.Model
{
    public class ProductsModel
    {
        [Key]
        [SwaggerSchema(ReadOnly = true)]
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public int Quantity { get; set; }

        public int CategoryId { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public string? ImagePath { get; set; }
        public string? Description { get; set; }
        public string? Specification { get; set; }
    }
}
