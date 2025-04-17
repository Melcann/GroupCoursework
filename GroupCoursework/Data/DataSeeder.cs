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
using GroupCoursework.Data;

public static class DataSeeder
{
    // Seeds all entities into the database if they don't already exist.
    public static void SeedAll(ApplicationDbContext context)
    {
        SeedAdmin(context);
        SeedPlanes(context);
        SeedDestinationsPrices(context);
        SeedFlights(context);
        SeedPassengers(context);
        SeedEmployees(context);
        SeedBookings(context);
        SeedBaggage(context);
    }


    // Seeds a default admin user into the database.
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

    // Seeds a list of passengers.
    public static void SeedPassengers(ApplicationDbContext context)
    {
        if (context.Passengers.Any()) return;

        context.Passengers.AddRange(
            new Passengers
            {
                PassportID = 102030,
                FullName = "Alice Brown",
                PhoneNumber = "01234567890",
                DateOfBirth = new DateOnly(1985, 5, 15),
                Address = "123 Main St, Birmingham, UK",
                Baggage = true,
                CheckedIn = false,
                Email = "alice@gmail.com",
                FlightType = "Economy",
                FlightID = 342
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
                FlightType = "Business",
                FlightID = 423,
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
                FlightType = "First Class",
                FlightID = 652
            },
            new Passengers
            {
                PassportID = 198765,
                FullName = "Diana Wells",
                PhoneNumber = "07799887766",
                DateOfBirth = new DateOnly(1992, 11, 3),
                Address = "22 Willow Lane, Manchester, UK",
                Baggage = false,
                CheckedIn = false,
                Email = "diana.wells@gmail.com",
                FlightType = "Economy",
                FlightID = 342
            },
            new Passengers
            {
                PassportID = 176543,
                FullName = "Edward Grant",
                PhoneNumber = "07888997744",
                DateOfBirth = new DateOnly(1980, 6, 18),
                Address = "88 Elm Street, Bristol, UK",
                Baggage = true,
                CheckedIn = true,
                Email = "ed.grant@gmail.com",
                FlightType = "Business",
                FlightID = 423
            }

        );

        context.SaveChanges();
    }


    // Seeds destination and pricing information for flights.
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

    // Seeds available planes with capacities and weight limits.
    public static void SeedPlanes(ApplicationDbContext context)
    {
        if (context.Planes.Any()) return;

        context.Planes.AddRange(
            new Planes
            {
                PlaneId = 155,
                Availability = true,
                SeatCapacity = 77,
                WeightCapacity = 25000  // kg
            },
            new Planes
            {
                PlaneId = 121,
                Availability = true,
                SeatCapacity = 84,
                WeightCapacity = 30000  // kg
            },
            new Planes
            {
                PlaneId = 143,
                Availability = false,  // Under maintenance
                SeatCapacity = 63,
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
                SeatCapacity = 75,
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

    // Seeds upcoming flights with departure/return times, destinations, and duration.
    public static void SeedFlights(ApplicationDbContext context)
    {
        if (context.Flights.Any()) return;

        context.Flights.AddRange(
            new Flights
            {
                FlightID = 342,
                PlaneId = 155,
                Destination = "New York - JFK - John F. Kennedy International Airport",
                DepartureTime = DateTime.UtcNow.AddDays(5).AddHours(10),
                ReturnTime = DateTime.UtcNow.AddDays(10).AddHours(20),
                GateNumber = "A1",
                Duration = TimeSpan.FromHours(8)
            },
            new Flights
            {
                FlightID = 423,
                PlaneId = 121,
                Destination = "Paris - CDG - Charles de Gaulle Airport",
                DepartureTime = DateTime.UtcNow.AddDays(3).AddHours(7),
                ReturnTime = DateTime.UtcNow.AddDays(5).AddHours(15),
                GateNumber = "B2",
                Duration = TimeSpan.FromHours(1.5)
            },
            new Flights
            {
                FlightID = 652,
                PlaneId = 190,
                Destination = "Tokyo - HND - Haneda Airport",
                DepartureTime = DateTime.UtcNow.AddDays(7).AddHours(6),
                ReturnTime = DateTime.UtcNow.AddDays(14).AddHours(14),
                GateNumber = "C3",
                Duration = TimeSpan.FromHours(11.5)
            },
            new Flights
            {
                FlightID = 778,
                PlaneId = 106,
                Destination = "Dubai - DXB - Dubai International Airport",
                DepartureTime = DateTime.UtcNow.AddDays(2).AddHours(9),
                ReturnTime = DateTime.UtcNow.AddDays(7).AddHours(12),
                GateNumber = "D4",
                Duration = TimeSpan.FromHours(6.5)
            },
            new Flights
            {
                FlightID = 888,
                PlaneId = 133,
                Destination = "Rome - FCO - Leonardo da Vinci–Fiumicino Airport",
                DepartureTime = DateTime.UtcNow.AddDays(1).AddHours(8),
                ReturnTime = DateTime.UtcNow.AddDays(4).AddHours(19),
                GateNumber = "E5",
                Duration = TimeSpan.FromHours(2.5)
            }
        );

        context.SaveChanges();
    }


    // Seeds staff and crew members assigned to specific flights.
    public static void SeedEmployees(ApplicationDbContext context)
    {
        if (context.Employees.Any()) return;

        context.Employees.AddRange(
            new Employees
            {
                EmployeeId = 1,
                Role = "Pilot",
                EmployeeName = "Captain Sarah Lawson",
                FlightID = 342
            },
            new Employees
            {
                EmployeeId = 2,
                Role = "Co-Pilot",
                EmployeeName = "First Officer Mark Evans",
                FlightID = 423
            },
            new Employees
            {
                EmployeeId = 3,
                Role = "Flight Attendant",
                EmployeeName = "Emily Carter",
                FlightID = 652
            },
            new Employees
            {
                EmployeeId = 4,
                Role = "Flight Attendant",
                EmployeeName = "James Patel",
                FlightID = 778
            },
            new Employees
            {
                EmployeeId = 5,
                Role = "Pilot",
                EmployeeName = "Captain Anna Morgan",
                FlightID = 888
            },
            new Employees
            {
                EmployeeId = 6,
                Role = "Ground Crew",
                EmployeeName = "Lucas Hayes",
                FlightID = 342
            },
            new Employees
            {
                EmployeeId = 7,
                Role = "Security Officer",
                EmployeeName = "Nina Thompson",
                FlightID = 423
            }
        );

        context.SaveChanges();
    }

    // Seeds booking records connecting passengers to their flights and seats.
    public static void SeedBookings(ApplicationDbContext context)
    {
        if (context.Bookings.Any()) return;

        context.Bookings.AddRange(
            new Bookings
            {
                BookingId = "BK0001",
                PassportId = 102030,
                FlightID = 342,
                PaymentStatus = true,
                SeatNumber = 12
            },
            new Bookings
            {
                BookingId = "BK0002",
                PassportId = 123456,
                FlightID = 423,
                PaymentStatus = true,
                SeatNumber = 5
            },
            new Bookings
            {
                BookingId = "BK0003",
                PassportId = 134524,
                FlightID = 652,
                PaymentStatus = true,
                SeatNumber = 1
            },
            new Bookings
            {
                BookingId = "BK0004",
                PassportId = 198765,
                FlightID = 342,
                PaymentStatus = true,
                SeatNumber = 17
            },
            new Bookings
            {
                BookingId = "BK0005",
                PassportId = 176543,
                FlightID = 423,
                PaymentStatus = true,
                SeatNumber = 8
            }
        );

        context.SaveChanges();
    }


    // Seeds baggage entries linked to each passenger's passport ID.
    public static void SeedBaggage(ApplicationDbContext context)
    {
        if (context.Baggage.Any()) return;

        context.Baggage.AddRange(
            new Baggage
            {
                BaggageID = 1,
                PassportId = 102030
            },
            new Baggage
            {
                BaggageID = 2,
                PassportId = 123456
            },
            new Baggage
            {
                BaggageID = 3,
                PassportId = 134524
            },
            new Baggage
            {
                BaggageID = 4,
                PassportId = 198765
            },
            new Baggage
            {
                BaggageID = 5,
                PassportId = 176543
            }
        );

        context.SaveChanges();
    }

}
