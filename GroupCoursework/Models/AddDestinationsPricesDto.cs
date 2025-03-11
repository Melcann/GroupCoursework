namespace GroupCoursework.Models
{
    public class AddDestinationsPricesDto
    {
        public required string Destination { get; set; }
        public decimal Price { get; set; }
        public required string AirportName { get; set; }
    }
}
