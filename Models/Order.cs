public class Order
{
    public int Id { get; set; }
    public string? Customer { get; set; }
    public double MilkOrdered { get; set; }
    public int SkinsOrdered { get; set; }
    public double MilkDelivered { get; set; }
    public int SkinsDelivered { get; set; }
    public DateTime OrderDate { get; set; }
}
