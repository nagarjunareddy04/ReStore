using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class IdentityAddedAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "45386562-4442-43e1-ab54-4cc442ad5e01");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a5dd180a-6bdb-4dd5-8766-4a64b18b342a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "1c54c92b-8e95-4d14-8491-052bdbdd4aea", "a33e431b-0fb9-4427-9eb4-6437a595f9cd", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "8b5aed5c-92d7-4daf-89b0-eaaefc9a1271", "5cab3408-9426-4232-947e-c62b09e6522a", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1c54c92b-8e95-4d14-8491-052bdbdd4aea");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b5aed5c-92d7-4daf-89b0-eaaefc9a1271");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "45386562-4442-43e1-ab54-4cc442ad5e01", "61701e7d-0b1f-4514-9c36-2e8542df5b83", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "a5dd180a-6bdb-4dd5-8766-4a64b18b342a", "5a21f8a4-5d95-40ba-89d0-f2bcc3c5f921", "Member", "MEMBER" });
        }
    }
}
