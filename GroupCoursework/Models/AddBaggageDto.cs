using GroupCoursework.Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroupCoursework.Models
{
    public class AddBaggageDto
    {

        public int BaggageID { get; set; }

        public int PassportId { get; set; }

    }
}
