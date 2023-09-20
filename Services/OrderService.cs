using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using next_dotnet.Data;
using next_dotnet.Models;

namespace next_dotnet.Services
{
    public class OrderService
    {
        private readonly YakShopContext _context;
        private readonly StockService _stockService;

        public OrderService(YakShopContext context, StockService stockService)
        {
            _context = context;
            _stockService = stockService;
        }

        public async Task<(bool isFullOrder, OrderResponseDTO resultOrder)> PlaceOrderAsync(
            OrderRequestDTO orderRequest, int days)
        {
            var stock = await _stockService.GetStockAsync(days);
            bool isFullOrder = true;

            OrderResponseDTO result = new OrderResponseDTO
            {
                Milk = stock.Milk >= orderRequest.Order.Milk ? orderRequest.Order.Milk : 0,
                Skins = stock.Skins >= orderRequest.Order.Skins ? orderRequest.Order.Skins : 0
            };

            if (result.Milk < orderRequest.Order.Milk || result.Skins < orderRequest.Order.Skins)
            {
                isFullOrder = false;
            }

            Order order = new Order
            {
                Customer = orderRequest.Customer,
                MilkOrdered = orderRequest.Order.Milk,
                SkinsOrdered = orderRequest.Order.Skins,
                MilkDelivered = result.Milk,
                SkinsDelivered = result.Skins,
                OrderDate = DateTime.UtcNow
            };
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return (isFullOrder, result);
        }

        public async Task<List<Order>> GetAllOrdersAsync()
        {
            // Retrieve all orders from the database using Entity Framework Core.
            var orders = await _context.Orders.ToListAsync();

            return orders;
        }
    }
}
