using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shop.Data;
using Shop.Models;
namespace Shop.Controllers
{
    [Route("v1/orders")]
    public class OrderController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        [Authorize(Roles = "employee")]
        [ResponseCache(Duration = 30, VaryByHeader = "User-Agent", Location = ResponseCacheLocation.Any)]
        public async Task<ActionResult<List<Order>>> Get([FromServices] DataContext db)
        {
        var orders = await db.Orders.AsNoTracking().ToListAsync();
        return Ok(orders);
        }

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "employee")]
        public async Task<ActionResult<Order>> GetById(int id, [FromServices] DataContext db)
        {
        var order = await db.Orders.AsNoTracking().FirstOrDefaultAsync(order => order.Id == id);
        if (order == null) return NotFound(new { message = "Order not Found!" });
        return Ok(order);
        }

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public async Task<ActionResult<Order>> Post([FromBody] Order body, [FromServices] DataContext db)
        {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            db.Orders.Add(body);
            await db.SaveChangesAsync();
            return Ok(body);
        }
        catch
        {
            return BadRequest(new { message = "Error:while add an Order!" });
        }
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "employee")]
        public async Task<ActionResult<Order>> Put(int id, [FromBody] Order body, [FromServices] DataContext db)
        {
        if (body.Id != id) return NotFound(new { message = "Order not found!" });
        if (!ModelState.IsValid) return BadRequest(ModelState);
        try
        {
            db.Orders.Entry(body).State = EntityState.Modified;
            await db.SaveChangesAsync();
            return Ok(body);
        }
        catch (DbUpdateConcurrencyException)
        {
            return BadRequest(new { message = "Error: while updating the Order!" });
        }
        catch (Exception)
        {
            return BadRequest(new { message = "Error: while updating the Order!" });
        }
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "manager")]
        public async Task<ActionResult<Order>> Delete(int id, [FromServices] DataContext db)
        {
        var order = await db.Orders.FirstOrDefaultAsync(order => order.Id == id);
        if (order == null)
        {
            return NotFound(new { message = "order is not found!" });
        }
        try
        {
            db.Orders.Remove(order);
            await db.SaveChangesAsync();
            return Ok(new { message = "order is removed!" });
        }
        catch
        {
            return BadRequest(new { message = "Error:While removing the order!" });
        }
        }
    }
}