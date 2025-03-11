namespace GroupCoursework.Models
{
    public class AddPassengerDto
    {
        public required int PassportID { get; set; }
        public required string FullName { get; set; }
        public required string PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public required string Address { get; set; }
        public Boolean Baggage { get; set; }
        public Boolean CheckedIn { get; set; }
        public required string Email { get; set; }
    }
}
