using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public PlanesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get all Plane details.
        [HttpGet]
        public IActionResult GetAllPlanes()
        {
            var allPlanes = dbContext.Planes.ToList();

            return Ok(allPlanes);
        }

        //Search Planes by PlaneId.
        [HttpGet]
        [Route("{PlaneId:int}")]
        public IActionResult GetPlaneByPlaneId(int PlaneId)
        {
            var plane = dbContext.Planes.Find(PlaneId);

            if (plane == null)
            {
                return NotFound();
            }

            return Ok(plane);
        }

        //Add planes to database
        [HttpPost]
        public IActionResult AddPlane(AddPlanesDto addPlanesDto)
        {
            var planesEntity = new Planes()
            {
                PlaneId = addPlanesDto.PlaneId,
                Availability = addPlanesDto.Availability,
                SeatCapacity = addPlanesDto.SeatCapacity,
                WeightCapacity = addPlanesDto.WeightCapacity,
            };

            dbContext.Planes.Add(planesEntity);
            dbContext.SaveChanges();

            return Ok(planesEntity);
        }

        //Update plane details
        [HttpPut]
        [Route("{PlaneId:int}")]
        public IActionResult UpdatePlane(int PlaneId, UpdatePlanesDto updatePlanesDto)
        {
            var plane = dbContext.Planes.Find(PlaneId);
            if (plane == null)
            {
                return NotFound();
            }

            plane.Availability = updatePlanesDto.Availability;
            plane.SeatCapacity = updatePlanesDto.SeatCapacity;
            plane.WeightCapacity = updatePlanesDto.WeightCapacity;

            dbContext.SaveChanges();

            return Ok(plane);
        }

        //Delete plane
        [HttpDelete]
        [Route("{PlaneId:int}")]
        public IActionResult DeletePlane(int PlaneId)
        {
            var plane = dbContext.Planes.Find(PlaneId);

            if (plane == null)
            {
                return NotFound();
            }

            dbContext.Planes.Remove(plane);
            dbContext.SaveChanges();
            return Ok();
        }

    }
}
