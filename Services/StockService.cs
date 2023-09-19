using next_dotnet.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using next_dotnet.Models;

namespace next_dotnet.Services
{
    public class StockService
    {
        private readonly YakShopContext _context;

        public StockService(YakShopContext context)
        {
            _context = context;
        }

        public async Task<StockResponseDto> GetStockAsync(int days)
        {
            var yaks = await _context.Yaks.ToListAsync();
            double totalMilk = 0;
            int totalSkins = 0;

            foreach (var yak in yaks)
            {
                double initialAge = yak.Age;  // store the initial age
                double nextShaveDay = yak.AgeLastShaved * 100 + 8 + yak.Age * 100 * 0.01;

                for (int day = 1; day <= days; day++)
                {
                    totalMilk += (50 - yak.Age * 0.03);
                    yak.Age += 0.01; // Increment yak's age by 0.01 for each day

                    if (day == Math.Floor(nextShaveDay))
                    {
                        totalSkins++;
                        nextShaveDay += 8 + yak.Age * 100 * 0.01;  // calculate next eligible shave day
                    }
                }

                yak.Age = initialAge;  // restore the initial age
            }

            return new StockResponseDto
            {
                Milk = Math.Round(totalMilk, 2),
                Skins = totalSkins
            };
        }



    }
}
