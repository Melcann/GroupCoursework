using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroupCoursework.Models.Entities
{
    public class Passengers
    {

        [Key]
        public int PassportID { get; set; }
        public required string FullName { get; set; }
        public required string PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public required string Address { get; set; }
        public Boolean Baggage { get; set; } = false;
        public Boolean CheckedIn { get; set; } = false;
        public required string Email { get; set; }
        public required string FlightType { get; set; }

    }
}
