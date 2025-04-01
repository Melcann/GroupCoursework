using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroupCoursework.Functionality
{
    public class Booking
    {
        [Key]
        public int BookingID { get; set; }

        public string PassengerName { get; set; }
        public string PassportID { get; set; }
        public decimal TotalPrice { get; set; }
        public bool PaymentConfirmed { get; set; }
    }
}
