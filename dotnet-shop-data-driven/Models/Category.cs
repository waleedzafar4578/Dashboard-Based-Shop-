using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Models
{
  [Table("[category]")]
  public class Category
  {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("title")]
    [Required(ErrorMessage = "Category Nmae is required!")]
    [MaxLength(60, ErrorMessage = "Title must be less then to 60 character!")]
    [MinLength(3, ErrorMessage = "Title must be greaeter then to 3 character!")]
    public string Title { get; set; }
  }
}