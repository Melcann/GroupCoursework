using System.ComponentModel.DataAnnotations;

namespace GroupCoursework.Models.Entities
{
    public class DestinationsPrices
    {
        [Key]
        public required string Destination { get; set; }
        public decimal Price { get; set; }
        public required string AirportName { get; set; }
    }
}
