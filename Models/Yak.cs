public class Yak
{
    public int ID { get; set; }
    public string Name { get; set; }
    public double Age { get; set; }
    public string Sex { get; set; }
    public double AgeLastShaved { get; set; }
}
public class HerdRequest
{
    public List<Yak> Herd { get; set; }
}
