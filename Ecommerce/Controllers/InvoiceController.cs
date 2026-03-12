using Ecommerce.DAL.Entity;
using Ecommerce.DAL.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Ecommerce.Data;
using Ecommerce.DAL.Model;

namespace Ecommerce.Controllers
{
    [Route("invoice")]
    [ApiController]
    public class InvoiceController : Controller
    {
        private readonly ICategoriesInterface _categoriesInterface;
        public InvoiceController(ICategoriesInterface categoriesInterface)
        {
            _categoriesInterface = categoriesInterface;
        }
        [HttpGet("download/{orderId}")]
        public async Task<IActionResult> DownloadInvoice(int orderId)
        {
            var order = await _categoriesInterface.GetOrderWithDetails(orderId);

            if (order == null)
                return NotFound("Order not found.");

            var pdfBytes = await _categoriesInterface.GenerateInvoicePdf(order);

            return File(pdfBytes, "application/pdf", $"Invoice_{orderId}.pdf");
        }
    }
}
