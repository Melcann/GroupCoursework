using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    // Set up API controller
    [Route("api/[controller]")]
    [ApiController]
    public class BaggageController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        // Constructor for injecting the database context
        public BaggageController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get all Baggage. --> Retrieves all baggage records from the database
        [HttpGet]
        public IActionResult GetAllBaggage()
        {
            var allBaggage = dbContext.Baggage.ToList();

            return Ok(allBaggage);
        }

        //Search and retreive Baggage by their baggage Id.
        [HttpGet]
        [Route("{BaggageId:int}")]
        public IActionResult GetBaggageByBaggageId(int BaggageId)
        {
            var baggage = dbContext.Baggage.Find(BaggageId);

            if (baggage == null)
            {
                return NotFound(); // Returns 404 if not found
            }

            return Ok(baggage);
        }

        // POST: api/baggage
        //Add baggage to database
        [HttpPost]
        public IActionResult AddBaggage(AddBaggageDto addBaggageDto)
        {
            var passenger = dbContext.Passengers.FirstOrDefault(p => p.PassportID == addBaggageDto.PassportId);
            if (passenger == null)
            {
                return BadRequest("Passenger with given PassportID does not exist.");
            }

            // Create new Baggage entity
            var baggageEntity = new Baggage()
            {
                BaggageID = addBaggageDto.BaggageID,

                PassportId = addBaggageDto.PassportId,
                
            };

            dbContext.Baggage.Add(baggageEntity);
            dbContext.SaveChanges();

            return Ok(baggageEntity);
        }

        //Delete baggage record by Id
        [HttpDelete]
        [Route("{BaggageID:int}")]
        public IActionResult DeleteBaggage(int BaggageID)
        {
            var baggage = dbContext.Baggage.Find(BaggageID);

            if (baggage == null)
            {
                return NotFound();
            }

            dbContext.Baggage.Remove(baggage);
            dbContext.SaveChanges();
            return Ok(); // Returns 200 OK when deletion is successful
        }


    }
}
