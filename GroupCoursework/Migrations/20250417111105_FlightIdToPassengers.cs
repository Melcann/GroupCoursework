using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GroupCoursework.Migrations
{
    /// <inheritdoc />
    public partial class FlightIdToPassengers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FlightID",
                table: "Passengers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_FlightID",
                table: "Passengers",
                column: "FlightID");

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_Flights_FlightID",
                table: "Passengers",
                column: "FlightID",
                principalTable: "Flights",
                principalColumn: "FlightID",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_Flights_FlightID",
                table: "Passengers");

            migrationBuilder.DropIndex(
                name: "IX_Passengers_FlightID",
                table: "Passengers");

            migrationBuilder.DropColumn(
                name: "FlightID",
                table: "Passengers");
        }
    }
}
