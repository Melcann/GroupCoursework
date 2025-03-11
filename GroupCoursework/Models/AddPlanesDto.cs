namespace GroupCoursework.Models
{
    public class AddPlanesDto
    {
        public required int PlaneId { get; set; }
        public required Boolean Availability { get; set; } = true;
        public required int SeatCapacity { get; set; }
        public required int WeightCapacity { get; set; }
    }
}
