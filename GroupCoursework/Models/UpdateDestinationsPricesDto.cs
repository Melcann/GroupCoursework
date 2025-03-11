namespace GroupCoursework.Models
{
    public class UpdateDestinationsPricesDto
    {
        public required string Destination { get; set; }
        public decimal Price { get; set; }
        //public required string AirportName { get; set; }
    }
}
