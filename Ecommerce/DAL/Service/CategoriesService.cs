using Ecommerce.DAL.Entity;
using Ecommerce.Data;
using Ecommerce.DAL.Interface;
using Microsoft.AspNetCore.Mvc;
using Ecommerce.DAL.Model;
using Microsoft.EntityFrameworkCore;
using QuestPDF.Helpers;
using iTextSharp.text.pdf;
using System.IO;
using iTextSharp.text;
using QPageSize = QuestPDF.Helpers.PageSize;
using Microsoft.AspNetCore.Hosting;


namespace Ecommerce.DAL.Service
{
    public class CategoriesService : ICategoriesInterface
    {
        private readonly EcommerceContext _context;
        private readonly IWebHostEnvironment _env;
        public CategoriesService(EcommerceContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public Categories addcategories(Categories Category)
        {
            var result = _context.Categories.Where(x => x.CategoryId == Category.CategoryId).FirstOrDefault();
            if (result == null)
            {
                result = new Categories();
                //result.CategoryId = Category.CategoryId;
                result.Name = Category.Name;
                result.Description = Category.Description;
                _context.Categories.Add(result);

            }
            else {
                //result.CategoryId = Category.CategoryId;
                result.Name = Category.Name;
                result.Description = Category.Description;
                _context.Categories.Update(result);


            }
            _context.SaveChanges();
            return result;
        }
        public Categories GetCategories()
        {
            var result = _context.Categories.First();
            if (result == null)
            {
                return new Categories();
            }
            else
            {
                return result;
            }
        }
        public Categories GetbyCategoryId(int CategoriesId)
        {
            var result = _context.Categories.Where(x => x.CategoryId == CategoriesId).FirstOrDefault();
            if (result == null)
            {
                return new Categories();
            }
            else
            {
                return result;
            }
        }
        public List<Categories> GetallCategories()
        {
            var result = _context.Categories.ToList();
            return result;
        }
        public Categories DeleteCategories(int CategoriesId)
        {
            var result = _context.Categories.Where(x => x.CategoryId == CategoriesId).FirstOrDefault();
            if (result != null)
            {
                _context.Categories.Remove(result);
                _context.SaveChanges();
                return result;
            }
            else
            {
                return new Categories();
            }

        }
        public List<Categories> GetallbySearch(string? searchkey)
        {
            var searchkey1 = searchkey != null ? searchkey : null;
            var result = _context.Categories.Where(x => (x.Name).Contains(searchkey1)).ToList();
            if (result == null)
            {
                return new List<Categories>();
            }
            else
            {
                return result;
            }
        }
        public Customers AddCustomers(Customers customer)
        {
            var result = _context.Customers.Where(x => x.CustomerId == customer.CustomerId).FirstOrDefault();
            if (result == null)
            {
                result = new Customers
                {
                    Name = customer.Name,
                    Email = customer.Email,
                    Phone = customer.Phone,
                    Address = customer.Address,
                    PasswordHash = customer.PasswordHash,

                };
                _context.Customers.Add(result);
            }
            else
            {
                result.Name = customer.Name;
                result.Email = customer.Email;
                result.Phone = customer.Phone;
                result.Address = customer.Address;
                result.PasswordHash = customer.PasswordHash;
                _context.Customers.Update(result);

            }
            _context.SaveChanges();
            return result;

        }
        public List<Customers> GetallCustomers()
        {
            var result = _context.Customers.ToList();
            return result;
        }
        public Customers GetbyId(int customerid)
        {
            var result = _context.Customers.Where(x => x.CustomerId == customerid).FirstOrDefault();
            if (result == null)
            {
                result = new Customers
                {
                    Name = "",
                    Email = "",
                    Address = "",
                    PasswordHash = ""


                };
            }
            else
            {
                return result;
            }
            return result;
        }
        public Products Addproducts(Products products, IFormFile? imageFile)
        {
            bool categoryExists = _context.Categories.Any(x => x.CategoryId == products.CategoryId);
            if (!categoryExists)
            {
                throw new Exception("Category does not exist");
            }
            var result = _context.Products.Where(x => x.ProductId == products.ProductId).FirstOrDefault();
            if (result == null)
            {
                result = new Products();

                result.Name = products.Name;
                result.Price = products.Price;
                result.Quantity = products.Quantity;
                result.CategoryId = products.CategoryId;
                result.ImagePath = products.ImagePath;
                result.Description = products.Description;
                result.Specification = products.Specification;
                _context.Products.Add(result);
            }
            else
            {
                result.Name = products.Name;
                result.Price = products.Price;
                result.Quantity = products.Quantity;
                result.CategoryId = products.CategoryId;
                result.ImagePath = products.ImagePath;
                result.Description = products.Description;
                result.Specification = products.Specification;
                _context.Products.Update(result);

            }
            // 4. Handle Image Upload
            if (imageFile != null)
            {
                var folderPath = Path.Combine("wwwroot", "images");
                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    imageFile.CopyTo(stream);
                }

                result.ImagePath = "/images/" + fileName; // ✅ only relative path saved
            }
            _context.SaveChanges();
            return result;

        }
        public List<Products> GetProducts()
        {
            var result = _context.Products.ToList();
            return result;
        }
        public Products Getbyid(int productId)
        {
            var result = _context.Products.Where(x => x.ProductId == productId).FirstOrDefault();
            if (result == null)
            {
                return new Products();
            }
            else
            {
                return result;

            }
        }
        public Products Deleteproducts(int productId)
        {
            var result = _context.Products.Where(x => x.ProductId == productId).FirstOrDefault();
            if (result == null)
            {
                //return empty object or null if not found
                return new Products();
            }
            else
            {
                _context.Products.Remove(result);
                _context.SaveChanges();
                return result;
            }//this deletes from the DB and returns the deleted object


        }
        public List<Products> Getallbysearch(string? searchkey)
        {
            var searhkey1 = searchkey != null ? searchkey : null;
            var result = _context.Products.Where(x => (x.Name).Contains(searchkey)).ToList();
            if (result == null)
            {
                return new List<Products>();

            }
            else
            {
                return result;
            }
        }
        //Auth methods
        public string Signup(Users user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return "User already exists";
            }
            _context.Users.Add(user);
            _context.SaveChanges();
            return "Signup successful";
        }
        public async Task<List<Users>> GetAllUsers()
        {
            return await _context.Users
                .Where(u => u.Role == "User")
                .ToListAsync();
        }
        public Users? Login (string email, string password)
        {
            return _context.Users.FirstOrDefault(u=>u.Email==email && u.Password==password);
        }

        public Userprofile AddOrUpdateProfile(Userprofile profile)
        {
            var existingUser = _context.Userprofile
                .FirstOrDefault(x => x.Email == profile.Email);

            if (existingUser == null)
            {
                existingUser = new Userprofile
                {
                    Name = profile.Name,
                    Email = profile.Email,
                    Phone = profile.Phone,
                    Address = profile.Address
                };
                _context.Userprofile.Add(existingUser);
            }
            else
            {
                existingUser.Name = profile.Name;
                existingUser.Phone = profile.Phone;
                existingUser.Address = profile.Address;
                _context.Userprofile.Update(existingUser);
            }

            _context.SaveChanges();
            return existingUser;
        }

        public Userprofile? GetProfileByEmail(string email)
        {
            return _context.Userprofile.FirstOrDefault(u => u.Email == email);
        }

        public bool DeleteProfile(int id)
        {
            var user = _context.Userprofile.FirstOrDefault(x => x.Id == id);
            if (user == null) return false;

            _context.Userprofile.Remove(user);
            _context.SaveChanges();
            return true;
        }
        public async Task<Order1> CreateOrder(CreateOrderDTO request)
        {
            using var transaction = _context.Database.BeginTransaction();

            try
            {
                // ✅ Create Order
                var order = new Order1
                {
                    UserEmail = request.UserEmail,
                    Total = request.Total,
                    CreatedAt = DateTime.Now
                };

                _context.Orders1.Add(order);
                _context.SaveChanges();  // so Order ID is generated


                // ✅ Add Order Items
                foreach (var item in request.OrderItems)
                {
                    var orderItem = new OrderItems1
                    {
                        OrderId = order.Id,
                        ProductId = item.ProductId,
                        Name = item.Name,
                        Quantity = item.Quantity,
                        Price = item.Price
                    };

                    _context.OrderItems1.Add(orderItem);
                }
                _context.SaveChanges();


                // ✅ Add Payment Info
                var payment = new PaymentInfo
                {
                    OrderId = order.Id,
                    Name = request.PaymentInfo.Name,
                    CardLast4 = request.PaymentInfo.CardLast4,
                    Expiry = request.PaymentInfo.Expiry
                };

                _context.PaymentInfo.Add(payment);
                _context.SaveChanges();


                // ✅ Commit DB transaction
                transaction.Commit();

                var fullOrder = await _context.Orders1
            .Include(x => x.OrderItems1)
            .Include(x => x.PaymentInfo)
            .FirstOrDefaultAsync(x => x.Id == order.Id);

                return fullOrder;
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
        }
        public async Task<List<Order1>> GetOrders(string email)
        {
            return await _context.Orders1
                .Where(x => x.UserEmail == email)
                .Include(x => x.OrderItems1)
                .Include(x => x.PaymentInfo)
                .ToListAsync();
        }
        public async Task<Order1> GetOrderWithDetails(int orderId)
        {
            return await _context.Orders1
                .Include(o => o.OrderItems1)
                .Include(o => o.PaymentInfo)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task<byte[]> GenerateInvoicePdf(Order1 order)
        {
            using (var stream = new MemoryStream())
            {
                

                Document doc = new Document(iTextSharp.text.PageSize.A4, 20, 20, 20, 20);
                PdfWriter.GetInstance(doc, stream);
                doc.Open();

                // Header
                doc.Add(new Paragraph("E-Commerce Invoice"));
                doc.Add(new Paragraph("Order ID: " + order.Id));
                doc.Add(new Paragraph("Customer: " + order.UserEmail));
                doc.Add(new Paragraph("Date: " + order.CreatedAt));
                doc.Add(new Paragraph("---------------------------------------------------------"));

                // Items
                PdfPTable table = new PdfPTable(4);
                table.AddCell("Item");
                table.AddCell("Qty");
                table.AddCell("Price");
                table.AddCell("Total");

                foreach (var item in order.OrderItems1)
                {
                    table.AddCell(item.Name);
                    table.AddCell(item.Quantity.ToString());
                    table.AddCell(item.Price.ToString());
                    table.AddCell((item.Quantity * item.Price).ToString());
                }

                doc.Add(table);

                doc.Add(new Paragraph("---------------------------------------------------------"));
                doc.Add(new Paragraph("Total Amount: ₹" + order.Total));
                doc.Add(new Paragraph("Paid using card ending with: " + order.PaymentInfo.CardLast4));

                doc.Close();

                return stream.ToArray();
            }
        }
        public List<OrderItems1> GetallOrderItems()
        {
            var result = _context.OrderItems1.ToList();
            return result;
        }
        public List<Order1> GetallOrder1()
        {
            var result = _context.Orders1.ToList();
            return result;
        }
        public List<PaymentInfo> GetallPaymentInfo()
        {
            var result = _context.PaymentInfo.ToList();
            return result; 
        }

        public string UploadImage(IFormFile file)
        {
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "smallimages");
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            string fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            string filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return "/smallimages/" + fileName;
        }


        public Smallimages AddSmallImage(Smallimages image, IFormFile? file)
        {
            if (file != null)
            {
                image.ImagePath = UploadImage(file);
            }

            _context.Smallimages.Add(image);
            _context.SaveChanges();

            return image;
        }

      public List<Smallimages> getallSmallimages()
        {
            return _context.Smallimages.ToList();

        }
            


    }

}
