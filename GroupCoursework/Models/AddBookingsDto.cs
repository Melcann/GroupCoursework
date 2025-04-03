using GroupCoursework.Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroupCoursework.Models
{
    public class AddBookingsDto
    {
        public required int PassportId { get; set; }
        public required int FlightID { get; set; }
        public Boolean PaymentStatus { get; set; } = true;
        public required int SeatNumber { get; set; }

    }
}
