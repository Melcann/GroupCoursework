using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroupCoursework.Models.Entities
{
    public class Flights
    {
        [Key]
        public int FlightID { get; set; }

        // Foreign Key to PlaneId
        [ForeignKey("PlaneId")]
        public required int PlaneId { get; set; }
        public Planes Planes { get; set; }

        // Foreign Key to Destination
        [ForeignKey("Destination")]
        public required string Destination { get; set; }
        public DestinationsPrices Destinations { get; set; }

        public DateTime DepartureTime { get; set; }
        public DateTime ReturnTime { get; set; }
        public required string GateNumber { get; set; }
        public required TimeSpan Duration { get; set; }


    }
}
