using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GroupCoursework.Models.Entities
{
    public class Baggage
    {
        [Key]
        public int BaggageID { get; set; }

        // Foreign Key to Passengers
        [ForeignKey("PassportId")]
        public int PassportId { get; set; }

        
        public ICollection<Passengers> Passengers { get; set; }
        
    }
}
