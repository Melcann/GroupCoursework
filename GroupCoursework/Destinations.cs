using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


public class DestinationManager
{
    // Starting location
    public string StartLocation { get; private set; } = "Stansted";

    // Available destinations list
    public List<string> Destinations { get; private set; }

    public DestinationManager()
    {
        Destinations = new List<string> { "Delhi", "Istanbul", "Madrid", "Paris", "Tokyo" };
    }

    // Display destinations as a dropdown (console simulation)
    public void ShowDestinations()
    {
        Console.WriteLine("Available Destinations:");
        for (int i = 0; i < Destinations.Count; i++)
        {
            Console.WriteLine($"{i + 1}. {Destinations[i]}");
        }
    }
}