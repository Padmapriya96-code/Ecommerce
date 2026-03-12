using Ecommerce.DAL.Entity;
using Ecommerce.DAL.Model;


namespace Ecommerce.DAL.Interface
{
    public interface ICategoriesInterface
    {
        public Categories addcategories(Categories category);
        public Categories GetCategories();
        public Categories GetbyCategoryId(int CategoriesId);
        public List<Categories> GetallCategories();
        public Categories DeleteCategories(int CategoriesId);
        public List<Categories> GetallbySearch(string? searchkey);
        //public Customers AddCustomers(Customers customer);
        //public List<Customers> GetallCustomers();
        //public Customers GetbyId(int customerid);
        public Products Addproducts(Products products, IFormFile? imageFile);
        public List<Products> GetProducts();
        public Products Getbyid(int productId);
        public Products Deleteproducts(int productId);
        public List<Products> Getallbysearch(string? searchkey);
        // 🔹 Auth methods
        string Signup(Users user);
        Task<List<Users>> GetAllUsers();
        Users? Login(string email, string password);
        // ✅ ✅ User Profile (Added Here)
        Userprofile AddOrUpdateProfile(Userprofile profile);
        Userprofile? GetProfileByEmail(string email);
        bool DeleteProfile(int id);
        Task<Order1> CreateOrder(CreateOrderDTO request);
        Task<List<Order1>> GetOrders(string email);
        //generate invoice pdf
        Task<Order1> GetOrderWithDetails(int orderId);
        Task<byte[]> GenerateInvoicePdf(Order1 order);
        public List<OrderItems1> GetallOrderItems();
        public List<Order1> GetallOrder1();
        public List<PaymentInfo> GetallPaymentInfo();
        public string UploadImage(IFormFile imageFile);
        public Smallimages AddSmallImage(Smallimages image, IFormFile? file);
        public List<Smallimages> getallSmallimages();

    }

}

