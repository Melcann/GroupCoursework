namespace GroupCoursework.Models
{
    public class AddAdminDto
    {
        public required string UserName { get; set; }
        public required int BranchId { get; set; }
        public required string Password { get; set; }

    }
}
