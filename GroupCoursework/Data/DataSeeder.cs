// Data/JsonDataSeeder.cs
/*
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using GroupCoursework.Models.Entities;
using GroupCoursework.Data;

public static class JsonDataSeeder
{
    public static async Task SeedPassengersFromJsonAsync(ApplicationDbContext context, IWebHostEnvironment env)
    {
        // Check if passengers already exist to avoid duplicate seeding
        if (context.Passengers.Any())
            return;

        var passengersPath = Path.Combine(env.ContentRootPath, "Data/SeedData/passengers.json");
        var passengersJson = await File.ReadAllTextAsync(passengersPath);
        var passengers = JsonSerializer.Deserialize<List<Passengers>>(passengersJson);

        await context.Passengers.AddRangeAsync(passengers);
        await context.SaveChangesAsync();
    }
}

*/


using GroupCoursework.Models.Entities;
using GroupCoursework.Data; // Your DbContext namespace

public static class DataSeeder
{
    public static void SeedAll(ApplicationDbContext context)
    {
        SeedAdmin(context);
        SeedPassengers(context);
        SeedDestinationsPrices(context);
        SeedPlanes(context);
        SeedFlights(context);
    }

    public static void SeedAdmin(ApplicationDbContext context)
    {
        if (context.Admin.Any()) return;

        context.Admin.Add(new Admin
        {
            BranchId = 900874,
            UserName = "JetsetgoStanstead",
            Password = "JetSetGoAdmin90@"
        });

        context.SaveChanges();
    }

    public static void SeedPassengers(ApplicationDbContext context)
    {
        if (context.Passengers.Any()) return;

        context.Passengers.AddRange(
            new Passengers
            {
                PassportID = 1020304,
                FullName = "Alice Brown",
                PhoneNumber = "01234567890",
                DateOfBirth = new DateOnly(1985, 5, 15),
                Address = "123 Main St, Birmingham, UK",
                Baggage = true,
                CheckedIn = false,
                Email = "alice@gmail.com",
                FlightType = "Economy"
            },
            new Passengers
            {
                PassportID = 123456,
                FullName = "Bob Smith",
                PhoneNumber = "01987654321",
                DateOfBirth = new DateOnly(1990, 8, 22),
                Address = "45 Oak Road, Finchley, UK",
                Baggage = false,
                CheckedIn = false,
                Email = "bob@gmail.com",
                FlightType = "Business"
            },
            new Passengers
            {
                PassportID = 134524,
                FullName = "Charlie Johnson",
                PhoneNumber = "01122334455",
                DateOfBirth = new DateOnly(1978, 3, 10),
                Address = "79 Pine Road, Cardiff, UK",
                Baggage = true,
                CheckedIn = true,
                Email = "charlie@gmail.com",
                FlightType = "First Class"
            }
        );

        context.SaveChanges();
    }

    public static void SeedDestinationsPrices(ApplicationDbContext context)
    {
        if (context.DestinationsPrices.Any()) return;

        context.DestinationsPrices.AddRange(
            new DestinationsPrices
            {
                Destination = "New York - JFK - John F. Kennedy International Airport",
                Price = 500.00m,
                AirportName = "Stansted Airport STN"
            },
            new DestinationsPrices
            {
                Destination = "Paris - CDG - Charles de Gaulle Airport",
                Price = 150.00m,
                AirportName = "Stansted Airport STN"
            },
            new DestinationsPrices
            {
                Destination = "Tokyo - HND - Haneda Airport",
                Price = 750.00m,
                AirportName = "Stansted Airport STN"
            },
            new DestinationsPrices
            {
                Destination = "Dubai - DXB - Dubai International Airport",
                Price = 600.00m,
                AirportName = "Stansted Airport STN"
            },
            new DestinationsPrices
            {
                Destination = "Rome - FCO - Leonardo da Vinci–Fiumicino Airport",
                Price = 200.00m,
                AirportName = "Stansted Airport STN"
            });

        context.SaveChanges();
    }
    public static void SeedPlanes(ApplicationDbContext context)
    {
        if (context.Planes.Any()) return;

        context.Planes.AddRange(
            new Planes
            {
                PlaneId = 155,
                Availability = true,
                SeatCapacity = 180,
                WeightCapacity = 25000  // kg
            },
            new Planes
            {
                PlaneId = 121,
                Availability = true,
                SeatCapacity = 80,
                WeightCapacity = 30000  // kg
            },
            new Planes
            {
                PlaneId = 143,
                Availability = false,  // Under maintenance
                SeatCapacity = 90,
                WeightCapacity = 20000  // kg
            },
            new Planes
            {
                PlaneId = 106,
                Availability = true,
                SeatCapacity = 100,
                WeightCapacity = 35000  // kg
            },
            new Planes
            {
                PlaneId = 190,
                Availability = true,
                SeatCapacity = 70,
                WeightCapacity = 18000  // kg
            },
            new Planes
            {
                PlaneId = 133,
                Availability = true,
                SeatCapacity = 80,
                WeightCapacity = 19000  // kg
            }
        );

        context.SaveChanges();
    }

    public static void SeedFlights(ApplicationDbContext context)
    {
        if (context.Flights.Any()) return;

        // Get seeded planes and destinations
        var plane155 = context.Planes.Find(155);
        var plane121 = context.Planes.Find(121);
        var plane106 = context.Planes.Find(106);
        var plane190 = context.Planes.Find(190);

        var jfk = context.DestinationsPrices.First(d => d.Destination.Contains("New York"));
        var paris = context.DestinationsPrices.First(d => d.Destination.Contains("Paris"));
        var tokyo = context.DestinationsPrices.First(d => d.Destination.Contains("Tokyo"));
        var dubai = context.DestinationsPrices.First(d => d.Destination.Contains("Dubai"));
        var rome = context.DestinationsPrices.First(d => d.Destination.Contains("Rome"));

        context.Flights.AddRange(
            
            new Flights
            {
                PlaneId = plane155.PlaneId,
                Destination = jfk.Destination,
                DepartureTime = DateTime.Now.AddDays(1).Date.AddHours(9),  // Tomorrow 9:00 AM
                ReturnTime = DateTime.Now.AddDays(1).Date.AddHours(21),     // Same day 9:00 PM (round trip)
                GateNumber = "A12",
                Duration = TimeSpan.FromHours(7.5)  
            },
            new Flights
            {
                PlaneId = plane155.PlaneId,
                Destination = tokyo.Destination,
                DepartureTime = DateTime.Now.AddDays(2).Date.AddHours(11),
                ReturnTime = DateTime.Now.AddDays(3).Date.AddHours(4),  // Overnight flight
                GateNumber = "B05",
                Duration = TimeSpan.FromHours(11.5)  
            },

            
            new Flights
            {
                PlaneId = plane121.PlaneId,
                Destination = dubai.Destination,
                DepartureTime = DateTime.Now.AddDays(1).Date.AddHours(14),
                ReturnTime = DateTime.Now.AddDays(1).Date.AddHours(23),
                GateNumber = "C08",
                Duration = TimeSpan.FromHours(6.5)  
            },

            
            new Flights
            {
                PlaneId = plane106.PlaneId,
                Destination = paris.Destination,
                DepartureTime = DateTime.Now.AddHours(3),  
                ReturnTime = DateTime.Now.AddHours(6),
                GateNumber = "D03",
                Duration = TimeSpan.FromHours(1.25)  
            },
            new Flights
            {
                PlaneId = plane190.PlaneId,
                Destination = rome.Destination,
                DepartureTime = DateTime.Now.AddDays(1).Date.AddHours(7),  
                ReturnTime = DateTime.Now.AddDays(1).Date.AddHours(12),
                GateNumber = "D11",
                Duration = TimeSpan.FromHours(2.25)  
            }
        );

        context.SaveChanges();
    }


}
/*
namespace GroupCoursework.Data
{
    public class DataSeeder
    {
    }
}*/
