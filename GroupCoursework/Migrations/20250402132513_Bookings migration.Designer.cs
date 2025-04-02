﻿// <auto-generated />
using System;
using GroupCoursework.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GroupCoursework.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250402132513_Bookings migration")]
    partial class Bookingsmigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.HasSequence<int>("BookingIdSequence");

            modelBuilder.Entity("GroupCoursework.Models.Entities.Baggage", b =>
                {
                    b.Property<int>("BaggageID")
                        .HasColumnType("int");

                    b.Property<int>("PassportId")
                        .HasColumnType("int");

                    b.HasKey("BaggageID");

                    b.ToTable("Baggage");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Bookings", b =>
                {
                    b.Property<string>("BookingId")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(6)
                        .HasColumnType("nvarchar(6)")
                        .HasDefaultValueSql("'BK' + FORMAT(NEXT VALUE FOR BookingIdSequence, '0000')");

                    b.Property<int>("FlightID")
                        .HasColumnType("int");

                    b.Property<int>("PassportId")
                        .HasColumnType("int");

                    b.Property<bool>("PaymentStatus")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true);

                    b.Property<int>("SeatNumber")
                        .HasColumnType("int");

                    b.HasKey("BookingId");

                    b.HasIndex("FlightID");

                    b.HasIndex("PassportId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.DestinationsPrices", b =>
                {
                    b.Property<string>("Destination")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AirportName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Destination");

                    b.ToTable("DestinationsPrices");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Employees", b =>
                {
                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("EmployeeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FlightID")
                        .HasColumnType("int");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmployeeId");

                    b.HasIndex("FlightID");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Flights", b =>
                {
                    b.Property<int>("FlightID")
                        .HasColumnType("int");

                    b.Property<DateTime>("DepartureTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Destination")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("time");

                    b.Property<string>("GateNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PlaneId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReturnTime")
                        .HasColumnType("datetime2");

                    b.HasKey("FlightID");

                    b.HasIndex("Destination");

                    b.HasIndex("PlaneId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Passengers", b =>
                {
                    b.Property<int>("PassportID")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Baggage")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<int?>("BaggageID")
                        .HasColumnType("int");

                    b.Property<bool>("CheckedIn")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PassportID");

                    b.HasIndex("BaggageID");

                    b.ToTable("Passengers");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Planes", b =>
                {
                    b.Property<int>("PlaneId")
                        .HasColumnType("int");

                    b.Property<bool>("Availability")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true);

                    b.Property<int>("SeatCapacity")
                        .HasColumnType("int");

                    b.Property<int>("WeightCapacity")
                        .HasColumnType("int");

                    b.HasKey("PlaneId");

                    b.ToTable("Planes");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Bookings", b =>
                {
                    b.HasOne("GroupCoursework.Models.Entities.Flights", "Flights")
                        .WithMany()
                        .HasForeignKey("FlightID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GroupCoursework.Models.Entities.Passengers", "Passengers")
                        .WithMany()
                        .HasForeignKey("PassportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Flights");

                    b.Navigation("Passengers");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Employees", b =>
                {
                    b.HasOne("GroupCoursework.Models.Entities.Flights", "Flights")
                        .WithMany()
                        .HasForeignKey("FlightID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Flights");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Flights", b =>
                {
                    b.HasOne("GroupCoursework.Models.Entities.DestinationsPrices", "Destinations")
                        .WithMany()
                        .HasForeignKey("Destination")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GroupCoursework.Models.Entities.Planes", "Planes")
                        .WithMany()
                        .HasForeignKey("PlaneId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Destinations");

                    b.Navigation("Planes");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Passengers", b =>
                {
                    b.HasOne("GroupCoursework.Models.Entities.Baggage", null)
                        .WithMany("Passengers")
                        .HasForeignKey("BaggageID");
                });

            modelBuilder.Entity("GroupCoursework.Models.Entities.Baggage", b =>
                {
                    b.Navigation("Passengers");
                });
#pragma warning restore 612, 618
        }
    }
}
