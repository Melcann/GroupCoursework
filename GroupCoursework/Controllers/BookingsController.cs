using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GroupCoursework.Controllers
{
    // Set up API controller
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        // Constructor to inject the database context
        public BookingsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // Get all Bookings from the database.
        [HttpGet]
        public IActionResult GetAllBookings()
        {
            var allbookings = dbContext.Bookings.ToList();

            return Ok(allbookings);
        }

        // Search and retreive Bookings by their booking Id.
        [HttpGet]
        [Route("{BookingId}")]
        public IActionResult GetBookingsByBookingsId(string BookingId)
        {

            // Searches Boookings table in database
            var bookings = dbContext.Bookings.Find(BookingId);

            if (bookings == null)
            {
                return NotFound();
            }

            return Ok(bookings);
        }

        // POST: api/bookings
        // Add bookings to database
        [HttpPost]
        public IActionResult AddBookings(AddBookingsDto addBookingsDto)
        {
           

            // Create a new booking entity using the data from the Dto
            var bookingsEntity = new Bookings()
            {
                
                PassportId = addBookingsDto.PassportId,
                FlightID = addBookingsDto.FlightID,
                PaymentStatus = addBookingsDto.PaymentStatus,
                SeatNumber = addBookingsDto.SeatNumber,

            };

            // Save the booking to the database
            dbContext.Bookings.Add(bookingsEntity);
            dbContext.SaveChanges();

            return Ok(bookingsEntity);
        }


    }
}
