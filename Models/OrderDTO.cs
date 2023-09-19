namespace next_dotnet.Models;

public class OrderRequestDTO
{
    public string Customer { get; set; }
    public OrderDetails Order { get; set; }
}

public class OrderDetails
{
    public double Milk { get; set; }
    public int Skins { get; set; }
}

public class OrderResponseDTO
{
    public double Milk { get; set; }
    public int Skins { get; set; }
}
