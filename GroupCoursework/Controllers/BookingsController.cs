using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public BookingsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get all Bookings.
        [HttpGet]
        public IActionResult GetAllBookings()
        {
            var allbookings = dbContext.Bookings.ToList();

            return Ok(allbookings);
        }

        //Search Bookings by their booking Id.
        [HttpGet]
        [Route("{BookingId}")]
        public IActionResult GetBookingsByBookingsId(string BookingId)
        {
            var bookings = dbContext.Bookings.Find(BookingId);

            if (bookings == null)
            {
                return NotFound();
            }

            return Ok(bookings);
        }

        //Add bookings to database
        [HttpPost]
        public IActionResult AddBookings(AddBookingsDto addBookingsDto)
        {

            var bookingsEntity = new Bookings()
            {
                PassportId = addBookingsDto.PassportId,

                FlightID = addBookingsDto.FlightID,

                PaymentStatus = addBookingsDto.PaymentStatus,

                SeatNumber = addBookingsDto.SeatNumber,

            };

            dbContext.Bookings.Add(bookingsEntity);
            dbContext.SaveChanges();

            return Ok(bookingsEntity);
        }







    }
}
