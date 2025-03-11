using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaggageController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public BaggageController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get all Baggage.
        [HttpGet]
        public IActionResult GetAllBaggage()
        {
            var allBaggage = dbContext.Baggage.ToList();

            return Ok(allBaggage);
        }

        //Search Baggage by their baggage Id.
        [HttpGet]
        [Route("{BaggageId:int}")]
        public IActionResult GetBaggageByBaggageId(int BaggageId)
        {
            var baggage = dbContext.Passengers.Find(BaggageId);

            if (baggage == null)
            {
                return NotFound();
            }

            return Ok(baggage);
        }

        //Add baggage to database
        [HttpPost]
        public IActionResult AddBaggage(AddBaggageDto addBaggageDto)
        {
            var passenger = dbContext.Passengers.FirstOrDefault(p => p.PassportID == addBaggageDto.PassportId);
            if (passenger == null)
            {
                return BadRequest("Passenger with given PassportID does not exist.");
            }


            var baggageEntity = new Baggage()
            {
                BaggageID = addBaggageDto.BaggageID,

                PassportId = addBaggageDto.PassportId,
                
            };

            dbContext.Baggage.Add(baggageEntity);
            dbContext.SaveChanges();

            return Ok(baggageEntity);
        }


    }
}
