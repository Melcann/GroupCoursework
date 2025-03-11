using System.ComponentModel.DataAnnotations;
using System.Numerics;

namespace GroupCoursework.Models.Entities
{
   
    public class Planes
    {
        [Key]
        public int PlaneId { get; set; }
        public required Boolean Availability { get; set; } = true;
        public required int SeatCapacity { get; set; }
        public required int WeightCapacity { get; set; }
        //Availability BIT DEFAULT 1,
        
    }
    
}
