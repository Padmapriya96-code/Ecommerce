using Ecommerce.DAL.Entity;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Data
{
    public class EcommerceContext:DbContext
    {
        public EcommerceContext(DbContextOptions<EcommerceContext> options):base(options)
        {

        }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Userprofile> Userprofile { get; set; }
        public DbSet<Order1> Orders1 { get; set; }

        public DbSet<OrderItems1> OrderItems1 { get; set; }

        public DbSet<PaymentInfo> PaymentInfo { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order1>()
                .HasMany(o => o.OrderItems1)
                .WithOne(oi => oi.Order1)
                .HasForeignKey(oi => oi.OrderId);

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Smallimages> Smallimages { get; set; }

    }
   



}
