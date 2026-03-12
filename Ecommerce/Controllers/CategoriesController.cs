using Ecommerce.DAL.Entity;
using Ecommerce.DAL.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Ecommerce.Data;
using Ecommerce.DAL.Model;
using SkiaSharp;

namespace Ecommerce.Controllers
{
    [Route("[Controller]/[action]")]
    [ApiController]
    public class CategoriesController : Controller
    {
        private readonly ICategoriesInterface _categoriesInterface;
        public CategoriesController(ICategoriesInterface categoriesInterface)
        {
            _categoriesInterface = categoriesInterface;
        }

        [HttpPost]
        public Categories addcategories(Categories Category)
        {
           return _categoriesInterface.addcategories(Category);
        }
        [HttpGet]
        public Categories GetCategories()
        {
            return _categoriesInterface.GetCategories();
        }
        [HttpGet("{CategoriesId}")]
        public Categories GetbyCategoryId(int CategoriesId)
        {
            return _categoriesInterface.GetbyCategoryId(CategoriesId);
        }
        [HttpGet]
        public List<Categories> GetallCategories()
        {
            return _categoriesInterface.GetallCategories();
        }
        [HttpDelete("{CategoriesId}")]
        public Categories DeleteCategories(int CategoriesId)
        {
            return _categoriesInterface.DeleteCategories(CategoriesId);
        }
        [HttpGet("bycategory/{CategoriesId}")]
        public List<Categories> GetallbySearch(string? searchkey)
        {
            return _categoriesInterface.GetallbySearch(searchkey);
        }
        //[HttpPost]
        //public Customers AddCustomers(Customers customer)
        //{
        //    return _categoriesInterface.AddCustomers(customer);

        //}
        //[HttpGet]
        //public List<Customers> GetallCustomers()
        //{
        //    return _categoriesInterface.GetallCustomers();
        //}
        //[HttpGet]
        //public Customers GetbyId(int customerid)
        //{
        //    return _categoriesInterface.GetbyId(customerid);
        //}
        //[HttpPost]
        //public Products Addproducts(Products products)
        //{
        //    return _categoriesInterface.Addproducts(products);
        //}
        [HttpPost("AddProducts")]
        public IActionResult AddProducts([FromForm] Products products, IFormFile? imageFile)
        {
            try
            {
                var savedProduct = _categoriesInterface.Addproducts(products, imageFile);
                return Ok(savedProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        //[HttpGet("GetProductImage/{id}")]
        //public IActionResult GetProductImage(int id)
        //{
        //    var product = _db.Products.Find(id);
        //    if (product == null || product.ImageData == null)
        //        return NotFound();

        //    return File(product.ImageData, product.ImageContentType);
        //}

        [HttpGet]
        public List<Products> GetProducts()
        {
            return _categoriesInterface.GetProducts();
        }
        [HttpGet]
        public Products Getbyid(int productId)
        {
            return _categoriesInterface.Getbyid(productId);
        }
        [HttpDelete("DeleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var deletedProduct = _categoriesInterface.Deleteproducts(id);

                if (deletedProduct == null || deletedProduct.ProductId == 0)
                    return NotFound(new { message = "Product not found" });

                return Ok(new { message = "Product deleted successfully", product = deletedProduct });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }//HttpDelete("DeleteProduct/{id}") → maps to DELETE /Categories/DeleteProduct/5.
        [HttpGet("Search")]
        public List<Products> Getallbysearch(string? searchkey)
        {
            return _categoriesInterface.Getallbysearch(searchkey);
        }
        //auth endpoints
        [HttpPost("signup")]
        public IActionResult Signup([FromBody] Users user)
        {
            var result=_categoriesInterface.Signup(user);
            if (result == "User already exists")
                return BadRequest(result);
            return Ok(result);
        }
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult>GetallUsers()
        {
            var users = await _categoriesInterface.GetAllUsers();
            return Ok(users);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Users loginuser)
        {
            var user=_categoriesInterface.Login(loginuser.Email, loginuser.Password);
            if (user == null)
                return Unauthorized("Invalid credentials");
            return Ok(new {message="Login successful",role=user.Role});
        }
        [HttpGet("GetProfile/{email}")]
        public IActionResult GetProfile(string email)
        {
            var profile = _categoriesInterface.GetProfileByEmail(email);
            if (profile == null) return NotFound("Profile not found");
            return Ok(profile);
        }

        [HttpPost("AddOrUpdateProfile")]
        public IActionResult AddOrUpdateProfile([FromBody] Userprofile profile)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _categoriesInterface.AddOrUpdateProfile(profile);
            return Ok(result);
        }

        [HttpDelete("DeleteProfile/{id}")]
        public IActionResult DeleteProfile(int id)
        {
            var success = _categoriesInterface.DeleteProfile(id);

            if (!success)
                return NotFound("User not found");

            return Ok(new { message = "Profile deleted successfully" });
        }
        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder(CreateOrderDTO request)
        {
            var order = await _categoriesInterface.CreateOrder(request);
            return Ok(new { message = "Order placed successfully!", orderId = order.Id });
        }

        [HttpGet("GetOrders/{email}")]
        public async Task<IActionResult> GetOrders(string email)
        {
            var result = await _categoriesInterface.GetOrders(email);
            return Ok(result);
        }
        [HttpGet]
        public List<OrderItems1> GetallOrderItems()
        {
            return _categoriesInterface.GetallOrderItems();
        }
        [HttpGet]
        public List<Order1> GetallOrder1()
        {
            return _categoriesInterface.GetallOrder1();
        }
        [HttpGet]
        public List<PaymentInfo> GetallPaymentInfo()
        {
            return _categoriesInterface.GetallPaymentInfo();
        }

        [HttpPost("add")]
        [Consumes("multipart/form-data")]
        public IActionResult AddSmallImage([FromForm] SmallImageUploadDto dto)
        {
            var entity = new Smallimages
            {
               
                Name = dto.Name
            };

            var result = _categoriesInterface.AddSmallImage(entity, dto.File);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public IActionResult getallSmallimages()
        {
            try
            {
                var images = _categoriesInterface.getallSmallimages();
                return Ok(images);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


    }
}
