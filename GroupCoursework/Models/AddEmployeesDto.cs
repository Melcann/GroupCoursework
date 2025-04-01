namespace GroupCoursework.Models
{
    public class AddEmployeesDto
    {
        public int EmployeeId { get; set; }
        public required string Role { get; set; }
        public required string EmployeeName { get; set; }
        public required int FlightID { get; set; }

    }
}
