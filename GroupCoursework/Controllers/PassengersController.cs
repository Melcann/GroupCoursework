using GroupCoursework.Data;
using GroupCoursework.Models;
using GroupCoursework.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public PassengersController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get all Passengers details.
        [HttpGet]
        public IActionResult GetAllPassengers()
        {
            var allPassengers = dbContext.Passengers.ToList();

            return Ok(allPassengers);
        }

        //Search Passenger by their passport number.
        [HttpGet]
        [Route("{PassportId:int}")]
        public IActionResult GetPassengerByPassportId(int PassportId)
        {
            var passenger = dbContext.Passengers.Find(PassportId);

            if (passenger == null)
            {
                return NotFound();
            }

            return Ok(passenger);
        }

        //Add passengers to database
        [HttpPost]
        public IActionResult AddPassenger(AddPassengerDto addPassengerDto)
        {
            var passengersEntity = new Passengers()
            {
                PassportID = addPassengerDto.PassportID,
                FullName = addPassengerDto.FullName,
                PhoneNumber = addPassengerDto.PhoneNumber,
                DateOfBirth = addPassengerDto.DateOfBirth,
                Address = addPassengerDto.Address,
                Baggage = addPassengerDto.Baggage,
                CheckedIn = addPassengerDto.CheckedIn,
                Email = addPassengerDto.Email,
                FlightType = addPassengerDto.FlightType,
            };

            dbContext.Passengers.Add(passengersEntity);
            dbContext.SaveChanges();

            return Ok(passengersEntity);
        }
        
        //Update passenger details
        [HttpPut]
        [Route("{PassportId:int}")]
        public IActionResult UpdatePassenger(int PassportId, UpdatePassengerDto updatePassengerDto)
        {
            var passenger = dbContext.Passengers.Find(PassportId);
            if (passenger == null)
            {
                return NotFound();
            }

            passenger.FullName = updatePassengerDto.FullName;
            passenger.PhoneNumber = updatePassengerDto.PhoneNumber;
            passenger.DateOfBirth = updatePassengerDto.DateOfBirth;
            passenger.Address = updatePassengerDto.Address;
            passenger.Baggage = updatePassengerDto.Baggage;
            passenger.CheckedIn = updatePassengerDto.CheckedIn;
            passenger.Email = updatePassengerDto.Email;

            dbContext.SaveChanges();

            return Ok(passenger);
        }

        //Delete passenger
        [HttpDelete]
        [Route("{PassportId:int}")]
        public IActionResult DeletePassenger(int PassportId)
        {
            var passenger = dbContext.Passengers.Find(PassportId);

            if (passenger == null)
            {
                return NotFound();
            }

            dbContext.Passengers.Remove(passenger);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}
