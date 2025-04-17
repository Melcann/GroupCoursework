using GroupCoursework.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace GroupCoursework.Data
{
    public class ApplicationDbContext: DbContext
    {

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Passengers> Passengers { get; set; }
        public DbSet<Flights> Flights { get; set; }
        public DbSet<DestinationsPrices> DestinationsPrices { get; set; }
        public DbSet<Planes> Planes { get; set; }
        public DbSet<Baggage> Baggage { get; set; }    
        public DbSet<Bookings> Bookings { get; set; } 
        public DbSet<Employees> Employees { get; set; }
        public DbSet<Admin> Admin { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Passengers>()
                .Property(p => p.PassportID)
                .ValueGeneratedNever(); // Prevents auto-increment

            modelBuilder.Entity<Passengers>()
                .HasOne(f => f.Flights)
                .WithMany()
                .HasForeignKey(f => f.FlightID) // References to the foreign key from the flights table
                .OnDelete(DeleteBehavior.SetNull);



            modelBuilder.Entity<Flights>()
                .Property(p => p.FlightID)
                .ValueGeneratedNever(); // Prevents auto-increment

            modelBuilder.Entity<Flights>()
                .HasOne(f => f.Planes)
                .WithMany()
                .HasForeignKey(f => f.PlaneId); // References to the foreign key from the planes table

            modelBuilder.Entity<Flights>()
                .HasOne(f => f.Destinations)
                .WithMany()
                .HasForeignKey(f => f.Destination); // References to the foreign key from the Destinations and prices table

            modelBuilder.Entity<Baggage>()
                .Property(p => p.BaggageID)
                .ValueGeneratedNever();
            
            modelBuilder.Entity<Passengers>()
                .Property(p => p.Baggage)
                .HasDefaultValue(false); // Boolean set to false

            modelBuilder.Entity<Passengers>()
                .Property(p => p.CheckedIn)
                .HasDefaultValue(false);

            modelBuilder.Entity<Planes>()
                .Property(p => p.Availability)
                .HasDefaultValue(true); //Boolean set to true

            modelBuilder.Entity<Planes>()
                .Property(p => p.PlaneId)
                .ValueGeneratedNever();

            modelBuilder.Entity<Employees>()
                .Property(p => p.EmployeeId)
                .ValueGeneratedNever();

            modelBuilder.Entity<Employees>()
                .HasOne(f => f.Flights)
                .WithMany()
                .HasForeignKey(f => f.FlightID); // References to Flights table

            modelBuilder.Entity<Bookings>()
            .Property(b => b.BookingId)
            .HasDefaultValueSql("'BK' + FORMAT(NEXT VALUE FOR BookingIdSequence, '0000')");

            // Create a sequence for the numeric part
            modelBuilder.HasSequence<int>("BookingIdSequence");

            modelBuilder.Entity<Bookings>()
                .HasOne(f => f.Passengers)
                .WithMany()
                .HasForeignKey(f => f.PassportId); 

            modelBuilder.Entity<Bookings>()
                .HasOne(f => f.Flights)
                .WithMany()
                .HasForeignKey(f => f.FlightID); 

            modelBuilder.Entity<Bookings>()
                .Property(p => p.PaymentStatus)
                .HasDefaultValue(true);

            modelBuilder.Entity<Bookings>()
                .Property(p => p.SeatNumber)
                .ValueGeneratedNever();

            modelBuilder.Entity<Admin>()
                .Property(p => p.BranchId)
                .ValueGeneratedNever();
        }

    }
}