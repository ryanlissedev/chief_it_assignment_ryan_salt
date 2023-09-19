using next_dotnet.Data;

using Microsoft.EntityFrameworkCore;

namespace next_dotnet.Services
{
    public class YakService
    {
        private readonly YakShopContext _context;

        public YakService(YakShopContext context)
        {
            _context = context;
        }

        public async Task LoadHerdAsync(List<Yak> yaks)
        {
            _context.Yaks.RemoveRange(_context.Yaks);
            await _context.Yaks.AddRangeAsync(yaks);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Yak>> GetHerdAsync(int days)
        {
            var yaks = await _context.Yaks.ToListAsync();
            UpdateYakAges(yaks, days);
            return yaks;
        }

        public async Task UpdateHerdAsync(int days)
        {
            var yaks = await _context.Yaks.ToListAsync();
            UpdateYakAges(yaks, days);
            await _context.SaveChangesAsync();
        }

        private void UpdateYakAges(List<Yak> yaks, int days)
        {
            foreach (var yak in yaks)
            {
                // Calculate age
                double ageInDays = days + yak.Age * 100;
                double ageInYears = ageInDays / 100;
                yak.Age = Math.Round(ageInYears, 2);  // Round to 2 decimal places

                double daysSinceLastShave = ageInDays - yak.AgeLastShaved * 100;
                double nextShaveInterval = 8 + ageInDays * 0.01;
                double lastPossibleShaveDay = ageInDays - (daysSinceLastShave % nextShaveInterval);

                if (daysSinceLastShave >= nextShaveInterval)
                {
                    yak.AgeLastShaved = Math.Floor(lastPossibleShaveDay / 100 * 10) / 10.0;
                }
                else if (daysSinceLastShave + 1 >= nextShaveInterval)
                {
                    // Adjust for cases where the yak was not shaved on the exact eligible day
                    yak.AgeLastShaved = Math.Floor((lastPossibleShaveDay - 1) / 100 * 10) / 10.0;
                }
            }
        }



        public async Task<Stock> GetStockAsync(int days)
        {
            var stock = await _context.Stocks.FirstOrDefaultAsync(s => s.Day == days);
            if (stock == null)
            {
                var yaks = await _context.Yaks.ToListAsync();
                stock = CalculateStock(yaks, days);
                _context.Stocks.Add(stock);
                await _context.SaveChangesAsync();
            }

            return stock;
        }

        private Stock CalculateStock(List<Yak> yaks, int days)
        {
            double totalMilk = yaks.Sum(yak => (50 - yak.Age * 0.03) * days);
            int totalSkins = yaks.Sum(yak => (int)((days - yak.Age * 0.01) / (8 + yak.Age * 0.01)));

            return new Stock
            {
                Milk = totalMilk,
                Skins = totalSkins,
                Day = days
            };
        }
    }
}
