using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationsPricesController : ControllerBase

    {
        private readonly ApplicationDbContext dbContext;

        public DestinationsPricesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get all destinations available
        [HttpGet]
        public IActionResult GetAllDestinations()
        {
            var allDestinations = dbContext.DestinationsPrices.ToList();

            return Ok(allDestinations);
        }

        //Search Destinations available
        [HttpGet]
        [Route("{Destination}")]
        public IActionResult GetDestination(string Destination)
        {
            var destination = dbContext.DestinationsPrices.Find(Destination);

            if (destination == null)
            {
                return NotFound();
            }

            return Ok(destination);
        }

        //Add destinations to database
        [HttpPost]
        public IActionResult AddDestination(AddDestinationsPricesDto addDestinationsPricesDto)
        {
            var destinationsEntity = new DestinationsPrices()
            {
                Destination = addDestinationsPricesDto.Destination,
                Price = addDestinationsPricesDto.Price,
                AirportName = addDestinationsPricesDto.AirportName,
              
            };

            dbContext.DestinationsPrices.Add(destinationsEntity);
            dbContext.SaveChanges();

            return Ok(destinationsEntity);
        }
        
        //Update destination details
        [HttpPut]
        [Route("{Destination}")]
        public IActionResult UpdateDestination(string Destination, UpdateDestinationsPricesDto updateDestinationsPricesDto)
        {
            var destination = dbContext.DestinationsPrices.Find(Destination);
            if (destination == null)
            {
                return NotFound();
            }

            destination.Price = updateDestinationsPricesDto.Price;

            dbContext.SaveChanges();

            return Ok(destination);
        }
        


    }
}
