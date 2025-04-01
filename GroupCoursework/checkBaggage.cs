namespace GroupCoursework
{
    public class CheckBaggage
    {
        public decimal BaggagePrice { get; private set; }

        public CheckBaggage(bool hasBaggage)
        {
            BaggagePrice = hasBaggage ? 20 : 0;
        }
    }
}
