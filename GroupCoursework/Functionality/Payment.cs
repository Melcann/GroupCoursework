using System;
using GroupCoursework.Models.Entities;

namespace GroupCoursework.Functionality
{
    public class Payment
    {
        public decimal DestinationPrice { get; set; }
        public decimal TotalPayment { get; private set; }
        public bool PaymentStatus { get; private set; }
        public string BookingID { get; private set; }

        private CheckBaggage baggageChecker;

        public Payment(decimal destinationPrice, bool hasBaggage)
        {
            DestinationPrice = destinationPrice;
            baggageChecker = new CheckBaggage(hasBaggage);
        }

        public void CalculateTotalPayment()
        {
            TotalPayment = DestinationPrice + baggageChecker.BaggagePrice;
        }

        public void ConfirmPayment()
        {
            PaymentStatus = true;
            BookingID = GenerateBookingID();
        }

        private string GenerateBookingID()
        {
            return $"BKG-{DateTime.UtcNow.Ticks}";
        }
    }
}
