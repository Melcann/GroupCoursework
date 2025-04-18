using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    // Set up controller
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public FlightsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // Get all Flights
        [HttpGet]
        public IActionResult GetAllFlights()
        {
            var allFlights = dbContext.Flights.ToList();
            return Ok(allFlights);
        }

        // Search Flight by FlightID
        [HttpGet("{FlightID:int}")]
        public IActionResult GetFlightByFlightId(int FlightID)
        {
            var flight = dbContext.Flights.Find(FlightID);

            if (flight == null)
                return NotFound();

            return Ok(flight);
        }

        // Add a new Flight
        [HttpPost]
        public IActionResult AddFlight([FromBody] AddFlightsDto addFlightsDto)
        {
            // Validate Plane exists
            var plane = dbContext.Planes.Find(addFlightsDto.PlaneId);
            if (plane == null)
                return BadRequest("Invalid PlaneId. Plane does not exist.");

            // Validate Destination exists
            var destination = dbContext.DestinationsPrices.Find(addFlightsDto.Destination);
            if (destination == null)
                return BadRequest("Invalid Destination. Destination does not exist.");

            // Add a new Flight
            var flightsEntity = new Flights
            {
                FlightID = addFlightsDto.FlightID,
                PlaneId = addFlightsDto.PlaneId,
                Destination = addFlightsDto.Destination,
                DepartureTime = addFlightsDto.DepartureTime,
                ReturnTime = addFlightsDto.ReturnTime,
                GateNumber = addFlightsDto.GateNumber,
                Duration = addFlightsDto.Duration
            };

            dbContext.Flights.Add(flightsEntity);
            dbContext.SaveChanges();

            return Ok(flightsEntity);
        }

        // Update a Flight
        [HttpPut("{FlightID:int}")]
        public IActionResult UpdateFlight(int FlightID, [FromBody] UpdateFlightsDto updateFlightsDto)
        {
            var flight = dbContext.Flights.Find(FlightID);
            if (flight == null)
                return NotFound();

            // Validate Destination exists
            var destination = dbContext.DestinationsPrices.Find(updateFlightsDto.Destination);
            if (destination == null)
                return BadRequest("Invalid Destination. Destination does not exist.");

            flight.PlaneId = updateFlightsDto.PlaneId;
            flight.Destination = updateFlightsDto.Destination;
            flight.DepartureTime = updateFlightsDto.DepartureTime;
            flight.ReturnTime = updateFlightsDto.ReturnTime;
            flight.GateNumber = updateFlightsDto.GateNumber;
            flight.Duration = updateFlightsDto.Duration;

            dbContext.SaveChanges();

            return Ok(flight);
        }

        // Delete a Flight
        [HttpDelete("{FlightID:int}")]
        public IActionResult DeleteFlight(int FlightID)
        {
            var flight = dbContext.Flights.Find(FlightID);
            if (flight == null)
                return NotFound();

            dbContext.Flights.Remove(flight);
            dbContext.SaveChanges();

            return Ok();
        }
    }
}
