using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using next_dotnet.Models;
using next_dotnet.Services;

namespace next_dotnet.Controllers
{
    [ApiController]
    [Route("yak-shop")]
    public class YakShopController : ControllerBase
    {
        private readonly YakService _yakService;
        private readonly StockService _stockService;
        private readonly OrderService _orderService;

        public YakShopController(YakService yakService, StockService stockService, OrderService orderService)
        {
            _yakService = yakService;
            _stockService = stockService;
            _orderService = orderService;
        }

        [HttpPost("load")]
        public async Task<IActionResult> LoadHerdAsync([FromBody] HerdRequest request)
        {
            await _yakService.LoadHerdAsync(request.Herd);
            return StatusCode(205);
        }

        [HttpGet("herd/{days:int}")]
        public async Task<IActionResult> GetHerdAsync(int days)
        {
            var yaks = await _yakService.GetHerdAsync(days);
            var herd = yaks.Select(yak => new YakResponseDTO
            {
                Name = yak.Name,
                Age = yak.Age,
                AgeLastShaved = yak.AgeLastShaved
            }).ToList();

            return Ok(new { herd });
        }

        [HttpGet("stock/{days:int}")]
        public async Task<IActionResult> GetStockAsync(int days)
        {
            var stock = await _stockService.GetStockAsync(days);
            return Ok(stock);
        }

        [HttpGet ("orders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpPost("order/{days:int}", Name = "PlaceOrderRoute")]
        public async Task<IActionResult> PlaceOrderAsync(int days, [FromBody] OrderRequestDTO orderRequest)
        {
            var (isFullOrder, resultingOrder) = await _orderService.PlaceOrderAsync(orderRequest, days);

            if (isFullOrder) return CreatedAtRoute("PlaceOrderRoute", new { days }, resultingOrder);

            if (resultingOrder.Milk == 0 && resultingOrder.Skins == 0) return NotFound();

            return StatusCode(206, resultingOrder);
        }
    }
}
