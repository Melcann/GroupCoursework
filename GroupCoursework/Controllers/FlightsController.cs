using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public FlightsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get all Flights.
        [HttpGet]
        public IActionResult GetAllFlights()
        {
            var allFlights = dbContext.Flights.ToList();

            return Ok(allFlights);
        }

        //Search Flights by their Flight Id.
        [HttpGet]
        [Route("{FlightID:int}")]
        public IActionResult GetFlightByFlightId(int FlightID)
        {
            var flight = dbContext.Flights.Find(FlightID);

            if (flight == null)
            {
                return NotFound();
            }

            return Ok(flight);
        }

        //Add planes to database
        [HttpPost]
        public IActionResult AddFlight(AddFlightsDto addFlightsDto)
        {

            // Validate if PlaneId exists
            var plane = dbContext.Planes.Find(addFlightsDto.PlaneId);
            if (plane == null)
            {
                return BadRequest("Invalid PlaneId. Plane does not exist.");
            }

            // Validate if DestinationId exists
            var destination = dbContext.DestinationsPrices.Find(addFlightsDto.Destination);
            if (destination == null)
            {
                return BadRequest("Invalid DestinationId. Destination does not exist.");
            }



            var flightsEntity = new Flights()
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

    }
}
