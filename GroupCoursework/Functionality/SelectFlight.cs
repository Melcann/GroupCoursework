
/*

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using GroupCoursework.Data;
using GroupCoursework.Models.Entities;

[ApiController]
[Route("api/flights")]
public class FlightsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FlightsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Query the database for available flights based on the selected destination
    [HttpGet("destination/{destination}")]
    public async Task<IActionResult> GetFlightsByDestination(string destination)
    {
        var flights = await _context.Flights
            .Where(f => f.Destination == destination)
            .ToListAsync();

        if (!flights.Any())
        {
            return NotFound("No flights available for this destination.");
        }

        return Ok(flights);
    }

    // Fetch flight details of the selected date
    [HttpGet("{id}")]
    public async Task<IActionResult> GetFlightDetails(int id)
    {
        var flight = await _context.Flights.FindAsync(id);
        if (flight == null)
        {
            return NotFound("Flight not found.");
        }

        return Ok(flight);
    }

    // Book a flight
    [HttpPost("book")]
    public async Task<IActionResult> BookFlight([FromBody] BookingRequest request)
    {
        var flight = await _context.Flights.FindAsync(request.FlightId);
        if (flight == null)
        {
            return NotFound("Flight not found.");
        }

        var passenger = new Passengers
        {
            PassportID = request.PassportNumbers,
            FullName = request.FullName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Address = request.Address,
            DateOfBirth = request.DateOfBirth,
            CheckedIn = false,
            Baggage = request.BaggageWeight > 0
        };

        _context.Passengers.Add(passenger);
        await _context.SaveChangesAsync();

        return Ok(new { Message = "Booking confirmed", Flight = flight });
    }

    // Assign seat to passenger
    [HttpPost("assign-seat")]
    public async Task<IActionResult> AssignSeat([FromBody] SeatAssignmentRequest request)
    {
        var passenger = await _context.Passengers.FindAsync(request.PassportNumber);
        if (passenger == null)
        {
            return NotFound("Passenger not found.");
        }

        passenger.SeatNumber = request.SeatNumber;

        _context.Passengers.Update(passenger);
        await _context.SaveChangesAsync();

        return Ok(new { Message = "Seat assigned successfully", Seat = request.SeatNumber });
    }
}

// Models for request handling
public class BookingRequest
{
    public int FlightId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string PassportNumber { get; set; }
    public string Address { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public int BaggageWeight { get; set; }
}

public class SeatAssignmentRequest
{
    public string PassportNumber { get; set; }
    public string SeatNumber { get; set; }
}

*/