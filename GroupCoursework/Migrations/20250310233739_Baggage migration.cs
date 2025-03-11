using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GroupCoursework.Migrations
{
    /// <inheritdoc />
    public partial class Baggagemigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BaggageID",
                table: "Passengers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Baggage",
                columns: table => new
                {
                    BaggageID = table.Column<int>(type: "int", nullable: false),
                    PassportId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Baggage", x => x.BaggageID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_BaggageID",
                table: "Passengers",
                column: "BaggageID");

            migrationBuilder.AddForeignKey(
                name: "FK_Passengers_Baggage_BaggageID",
                table: "Passengers",
                column: "BaggageID",
                principalTable: "Baggage",
                principalColumn: "BaggageID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Passengers_Baggage_BaggageID",
                table: "Passengers");

            migrationBuilder.DropTable(
                name: "Baggage");

            migrationBuilder.DropIndex(
                name: "IX_Passengers_BaggageID",
                table: "Passengers");

            migrationBuilder.DropColumn(
                name: "BaggageID",
                table: "Passengers");
        }
    }
}
