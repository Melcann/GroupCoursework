using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GroupCoursework.Models.Entities
{
    public class Employees
    {
        [Key]
        public int EmployeeId { get; set; }
        public required string Role {  get; set; }
        public required string EmployeeName { get; set; }

        // Foreign Key to FlightId
        [ForeignKey("FlightID")]
        public required int FlightID { get; set; }
        public Flights Flights { get; set; }
       
    }
}
