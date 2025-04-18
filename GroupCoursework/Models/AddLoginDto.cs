namespace GroupCoursework.Models
{
    public class AddLoginDto
    {
        public int BranchId { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}
