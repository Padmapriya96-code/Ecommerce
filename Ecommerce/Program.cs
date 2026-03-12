using Ecommerce.DAL.Interface;
using Ecommerce.Data;
using Microsoft.EntityFrameworkCore;
using Ecommerce.DAL.Service;
var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(c =>
{
    c.EnableAnnotations(); //  Enable reading Swagger annotations in models/controllers
});

//add cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        //builder => builder.AllowAnyOrigin()
        //                  .AllowAnyMethod()
        //                  .AllowAnyHeader());
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});
// Add DbContext with SQL Server
builder.Services.AddDbContext<EcommerceContext>(x => x.UseSqlServer

(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ICategoriesInterface,CategoriesService>();



var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//  Enable static files
app.UseStaticFiles();


//app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAllOrigins");


app.MapControllers();

app.Run();
