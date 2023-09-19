using Microsoft.EntityFrameworkCore;

namespace next_dotnet.Data;

public class YakShopContext : DbContext
{
    public YakShopContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Yak> Yaks { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Stock> Stocks { get; set; }


}
