using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Models
{
  [Table("[product]")]
  public class Product
  {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    [Required(ErrorMessage = "Product title is required!")]
    [MaxLength(60, ErrorMessage = "Product title is not greater then to 60 character!")]
    [MinLength(3, ErrorMessage = "Product title is not lessthen 3 character!")]
    public string Title { get; set; }

    [Column("description")]
    [MaxLength(1024, ErrorMessage = "Product discription is not greater then to 1024 character!")]
    public string Description { get; set; }

    [Column("price")]
    [Required(ErrorMessage = "Product price is required!")]
    [Range(0.01, int.MaxValue, ErrorMessage = "Must write actual product price!")]
    public decimal Price { get; set; }

    [Column("id_Category")]
    [Required(ErrorMessage = "Product category is required!")]
    [Range(1, int.MaxValue, ErrorMessage = "Category is Invalid")]
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
  }
}