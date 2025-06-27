using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Models
{
  [Table("[user]")]
  public class User
  {
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("username")]
    [Required(ErrorMessage = "UserName is Required!")]
    [MaxLength(20, ErrorMessage = "username is not greaterthen three character!")]
    [MinLength(3, ErrorMessage = "username is not lessthen to three character!")]
    public string Username { get; set; }

    [Column("password")]
    [Required(ErrorMessage = "Password is required!")]
    [MaxLength(20, ErrorMessage = "password is not greater then to 20 character!")]
    [MinLength(3, ErrorMessage = "password is not lessthen three character!")]
    public string Password { get; set; }

    [Column("role")]
    public string Role { get; set; }
  }
}