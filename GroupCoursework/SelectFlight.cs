using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/flights")]
public class FlightsController : ControllerBase
{
    private static readonly List<Flight> Flights = new List<Flight>
    {
        new Flight { Id = 1, Destination = "Paris", Time = "10:30 AM", Duration = "2h 30m", Price = 250 },
        new Flight { Id = 2, Destination = "London", Time = "1:00 PM", Duration = "1h 45m", Price = 200 },
        new Flight { Id = 3, Destination = "Croatia", Time = "3:15 PM", Duration = "2h 15m", Price = 220 },
        new Flight { Id = 4, Destination = "Spain", Time = "5:45 PM", Duration = "3h 10m", Price = 270 }
    };

    [HttpGet]
    public IActionResult GetFlights()
    {
        return Ok(Flights);
    }

    [HttpGet("{id}")]
    public IActionResult GetFlight(int id)
    {
        var flight = Flights.Find(f => f.Id == id);
        if (flight == null)
        {
            return NotFound("Flight not found");
        }
        return Ok(flight);
    }
}

public class Flight
{
    public int Id { get; set; }
    public string Destination { get; set; }
    public string Time { get; set; }
    public string Duration { get; set; }
    public decimal Price { get; set; }
}


