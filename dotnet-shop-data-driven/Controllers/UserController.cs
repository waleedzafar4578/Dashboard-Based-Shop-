using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Data;
using Shop.Models;
using Shop.Services;

namespace Shop.Controllers
{
  [Route("v1/users")]
  public class UserController : Controller
  {
    [HttpGet]
    [Route("")]
    [Authorize(Roles = "manager")]
    public async Task<ActionResult<List<User>>> Get([FromServices] DataContext db) {
      var users = await db.Users.AsNoTracking().ToListAsync();
      return users;
    }

    [HttpPost]
    [Route("")]
    [Authorize(Roles = "manager")]
    public async Task<ActionResult<User>> Post([FromServices] DataContext db, [FromBody] User model)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);

      try
      {
        model.Role = "employee";
        db.Users.Add(model);
        await db.SaveChangesAsync();
        model.Password = "";
        return model;
      }
      catch (Exception)
      {
        return BadRequest(new { message = "Somethings goes wrong!" });
      }
    }

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public async Task<ActionResult<dynamic>> Login([FromServices] DataContext db, [FromBody] User model)
    {
      var user = await db.Users.AsNoTracking().Where(user => user.Username == model.Username && user.Password == model.Password).FirstOrDefaultAsync();
      if (user == null) return NotFound(new { message = "User not found!" });

      var token = TokenService.GenerateToken(user);
      user.Password = "";
      return new {
        user,
        token,
      };
    }
    
    [HttpPut]
    [Route("")]
    [Authorize(Roles = "manager")]
    public async Task<ActionResult<User>> Put(int userId, [FromServices] DataContext db, [FromBody] User model)
    {
      if (!ModelState.IsValid) return BadRequest(ModelState);
      if (model.Id != userId) return NotFound(new { message = "User not found!" });

      try
      {
        db.Users.Entry(model).State = EntityState.Modified;
        await db.SaveChangesAsync();
        model.Password = "";
        return model;
      }
      catch (Exception)
      {
        return BadRequest(new { message = "Something goes worng!" });
      }
    }
    [HttpDelete]
    [Route("")]
    [Authorize(Roles = "manager")]
    public async Task<ActionResult<User>> Delete(int userId, [FromServices] DataContext db, [FromBody] User model)
    {
      var user = await db.Users.FirstOrDefaultAsync(user => user.Id == userId);
      if (user == null)
      {
        return NotFound(new { message = "User not found!" });
      }
      try
      {
        db.Users.Remove(user);
        await db.SaveChangesAsync();
        return Ok(new { message = "User removed!" });
      }
      catch
      {
        return BadRequest(new { message = "Error: while remove the user!" });
      }
    }
  }
}