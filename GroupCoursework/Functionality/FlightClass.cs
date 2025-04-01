using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class Flight
{
    public string Destination { get; set; }
    public string Time { get; set; }
    public string Duration { get; set; }
    public int Price { get; set; }

    public Flight(string destination, string time, string duration, int price)
    {
        Destination = destination;
        Time = time;
        Duration = duration;
        Price = price;
    }


}
