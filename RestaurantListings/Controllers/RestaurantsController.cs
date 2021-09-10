using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantListings.Data;
using RestaurantListings.Data.Entities;
using RestaurantListings.Models;

namespace RestaurantListings.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class RestaurantsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier);

        public RestaurantsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns all restaurants.
        /// </summary>
        [HttpGet]
        public IEnumerable<Restaurant> Get()
        {
            return _context.Restaurants.ToList();
        }

        /// <summary>
        /// Creates a new <see cref="Restaurant"/>.
        /// </summary>
        /// <param name="model">The restaurant <see cref="RestaurantModel">model</see>.</param>
        /// <returns>The created <see cref="Restaurant"/>.</returns>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] RestaurantModel model)
        {
            var restaurant = model.ToEntity();
            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();

            return Ok(restaurant);
        }
    }
}
