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
        /*
        public DbSet<Bookings> Bookings { get; set; } 
        public DbSet<Employees> Employees { get; set; }
        
        */

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Passengers>()
                .Property(p => p.PassportID)
                .ValueGeneratedNever(); // Prevents auto-increment

            modelBuilder.Entity<Flights>()
                .Property(p => p.FlightID)
                .ValueGeneratedNever(); // Prevents auto-increment

            modelBuilder.Entity<Flights>()
                .HasOne(f => f.Planes)
                .WithMany()
                .HasForeignKey(f => f.PlaneId);

            modelBuilder.Entity<Flights>()
                .HasOne(f => f.Destinations)
                .WithMany()
                .HasForeignKey(f => f.Destination);

            modelBuilder.Entity<Baggage>()
                .Property(p => p.BaggageID)
                .ValueGeneratedNever();
            
            modelBuilder.Entity<Passengers>()
                .Property(p => p.Baggage)
                .HasDefaultValue(false);

            modelBuilder.Entity<Passengers>()
                .Property(p => p.CheckedIn)
                .HasDefaultValue(false);

            modelBuilder.Entity<Planes>()
                .Property(p => p.Availability)
                .HasDefaultValue(true);

            modelBuilder.Entity<Planes>()
                .Property(p => p.PlaneId)
                .ValueGeneratedNever();
        }

      


    }
}