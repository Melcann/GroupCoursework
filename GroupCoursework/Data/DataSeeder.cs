using GroupCoursework.Models.Entities;
using GroupCoursework.Data; // Your DbContext namespace

public static class DataSeeder
{
    public static void SeedAll(ApplicationDbContext context)
    {
        SeedAdmin(context);
        //SeedBranches(context);
        SeedPassengers(context);
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
}
/*
namespace GroupCoursework.Data
{
    public class DataSeeder
    {
    }
}*/
