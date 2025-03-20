using GroupCoursework.Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroupCoursework.Models
{
    public class AddFlightsDto
    {
        public int FlightID { get; set; }
        public required int PlaneId { get; set; }
        
        public required string Destination { get; set; }
        
        public DateTime DepartureTime { get; set; }
        public DateTime ReturnTime { get; set; }
        public required string GateNumber { get; set; }
        public required TimeSpan Duration { get; set; }
    }
}
