using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GroupCoursework.Models.Entities
{
    public class Bookings
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Let DB generate
        [MaxLength(6)] // "BK" + 4 digits (e.g., "BK0001")
        public string BookingId { get; set; }
        /*
        = GenerateRandomId();

    private static string GenerateRandomId()
    {
        var random = new Random();
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        return new string(Enumerable.Repeat(chars, 5)
          .Select(s => s[random.Next(s.Length)]).ToArray());
    }
        */

        // Foreign Key to PlaneId
        [ForeignKey("Passengers")]
        public required int PassportId { get; set; }
        public Passengers Passengers { get; set; }

        // Foreign Key to Destination
        [ForeignKey("Flights")]
        public required int FlightID { get; set; }
        public Flights Flights { get; set; }

        public Boolean PaymentStatus { get; set; } = true;

        public required int SeatNumber { get; set; }   
        

    }
}
