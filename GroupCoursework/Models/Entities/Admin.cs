using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace GroupCoursework.Models.Entities
{
    public class Admin
    {
        [Key]
        public required string UserName { get; set; } = null!;
        public required int BranchId { get; set; }
        public required string Password { get; set; } = null!;
    }
}
