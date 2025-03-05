using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


public class FlightDatabase
{
    public List<Flight> Flights { get; private set; }

    public FlightDatabase()
    {
        Flights = new List<Flight>
        {
            new Flight("Delhi", "10:00 AM", "8h 30m", 500),
            new Flight("Istanbul", "3:00 PM", "4h 15m", 300),
            new Flight("Paris", "6:45 AM", "1h 50m", 150),
            new Flight("Tokyo", "11:30 PM", "12h 40m", 800)
        };
    }
}
