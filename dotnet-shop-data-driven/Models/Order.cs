using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Models
{
  [Table("[order]")]
  public class Order
  {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    [Required(ErrorMessage = "Order Name is required!")]
    public string Name { get; set; }

    [Column("email")]
    [Required(ErrorMessage = "Order email is required!")]
    public string Email { get; set; }

    [Column("phone")]
    [Required(ErrorMessage = "Order phone is required!")]
    public string Phone { get; set; }

    [Column("price")]
    [Required(ErrorMessage = "Order price is required!")]
    public int Price { get; set; }

    [Column("uint")]
    [Required(ErrorMessage = "Order price is required!")]
    public int Uint { get; set; }

    [Column("status")]
    public bool Status { get; set; }

    [Column("id_product")]
    [Required(ErrorMessage = "Order product details  is required!")]
    public int ProductId { get; set; }
    public Product? product {get;set;}

  }
}