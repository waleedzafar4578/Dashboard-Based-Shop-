using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shop.Migrations
{
    /// <inheritdoc />
    public partial class change_columns_name : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_[produto]_[categoria]_id_categoria",
                table: "[produto]");

            migrationBuilder.DropPrimaryKey(
                name: "PK_[usuario]",
                table: "[usuario]");

            migrationBuilder.DropPrimaryKey(
                name: "PK_[produto]",
                table: "[produto]");

            migrationBuilder.DropPrimaryKey(
                name: "PK_[categoria]",
                table: "[categoria]");

            migrationBuilder.RenameTable(
                name: "[usuario]",
                newName: "[user]");

            migrationBuilder.RenameTable(
                name: "[produto]",
                newName: "[product]");

            migrationBuilder.RenameTable(
                name: "[categoria]",
                newName: "[category]");

            migrationBuilder.RenameColumn(
                name: "senha",
                table: "[user]",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "permissao",
                table: "[user]",
                newName: "role");

            migrationBuilder.RenameColumn(
                name: "login",
                table: "[user]",
                newName: "username");

            migrationBuilder.RenameColumn(
                name: "titulo",
                table: "[product]",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "preco",
                table: "[product]",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "id_categoria",
                table: "[product]",
                newName: "id_Category");

            migrationBuilder.RenameColumn(
                name: "descricao",
                table: "[product]",
                newName: "description");

            migrationBuilder.RenameIndex(
                name: "IX_[produto]_id_categoria",
                table: "[product]",
                newName: "IX_[product]_id_Category");

            migrationBuilder.RenameColumn(
                name: "titulo",
                table: "[category]",
                newName: "title");

            migrationBuilder.AddPrimaryKey(
                name: "PK_[user]",
                table: "[user]",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_[product]",
                table: "[product]",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_[category]",
                table: "[category]",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_[product]_[category]_id_Category",
                table: "[product]",
                column: "id_Category",
                principalTable: "[category]",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_[product]_[category]_id_Category",
                table: "[product]");

            migrationBuilder.DropPrimaryKey(
                name: "PK_[user]",
                table: "[user]");

            migrationBuilder.DropPrimaryKey(
                name: "PK_[product]",
                table: "[product]");

            migrationBuilder.DropPrimaryKey(
                name: "PK_[category]",
                table: "[category]");

            migrationBuilder.RenameTable(
                name: "[user]",
                newName: "[usuario]");

            migrationBuilder.RenameTable(
                name: "[product]",
                newName: "[produto]");

            migrationBuilder.RenameTable(
                name: "[category]",
                newName: "[categoria]");

            migrationBuilder.RenameColumn(
                name: "username",
                table: "[usuario]",
                newName: "login");

            migrationBuilder.RenameColumn(
                name: "role",
                table: "[usuario]",
                newName: "permissao");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "[usuario]",
                newName: "senha");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "[produto]",
                newName: "titulo");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "[produto]",
                newName: "preco");

            migrationBuilder.RenameColumn(
                name: "id_Category",
                table: "[produto]",
                newName: "id_categoria");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "[produto]",
                newName: "descricao");

            migrationBuilder.RenameIndex(
                name: "IX_[product]_id_Category",
                table: "[produto]",
                newName: "IX_[produto]_id_categoria");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "[categoria]",
                newName: "titulo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_[usuario]",
                table: "[usuario]",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_[produto]",
                table: "[produto]",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_[categoria]",
                table: "[categoria]",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_[produto]_[categoria]_id_categoria",
                table: "[produto]",
                column: "id_categoria",
                principalTable: "[categoria]",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
