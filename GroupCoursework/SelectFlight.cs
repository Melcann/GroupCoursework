using System;
using System.Collections.Generic;

class SelectFlight
{
    static void Main()
    {
        // Initialize the flight database
        FlightDatabase flightDatabase = new FlightDatabase();

        // Display available flight options
        Console.WriteLine("Available Flights:");
        for (int i = 0; i < flightDatabase.Flights.Count; i++)
        {
            Flight flight = flightDatabase.Flights[i];
            Console.WriteLine($"{i + 1}. Destination: {flight.Destination}, Time: {flight.Time}, Duration: {flight.Duration}, Price: ${flight.Price}");
        }

        // Prompt user to select a flight
        Console.Write("\nEnter the number of your chosen flight (1-4): ");
        string userInput = Console.ReadLine();

        // Validate user input and display ticket
        if (int.TryParse(userInput, out int choice) && choice >= 1 && choice <= flightDatabase.Flights.Count)
        {
            Flight selectedFlight = flightDatabase.Flights[choice - 1];

            // Display "ticket" message
            Console.WriteLine("\n========= YOUR TICKET =========");
            Console.WriteLine($"Destination: {selectedFlight.Destination}");
            Console.WriteLine($"Departure Time: {selectedFlight.Time}");
            Console.WriteLine($"Duration: {selectedFlight.Duration}");
            Console.WriteLine($"Price: ${selectedFlight.Price}");
            Console.WriteLine("================================");
        }
        else
        {
            Console.WriteLine("Invalid selection. Please restart and choose a valid number.");
        }
    }
}


