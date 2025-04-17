using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    // Defines the AdminController as an API controller that handles requests at "api/admin"
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;


        // Constructor to initialize the database context
        public AdminController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Add Admin to database
        [HttpPost]
        public IActionResult AddAdmin(AddAdminDto addAdminDto)
        {
            // Creating a new Admin entity based on the received Dto
            var AdminEntity = new Admin()
            {
                UserName = addAdminDto.UserName,
                BranchId = addAdminDto.BranchId,
                Password = addAdminDto.Password,

            };


            // Adding the new admin record to the database
            dbContext.Admin.Add(AdminEntity);
            dbContext.SaveChanges();

            // Returning a success response with the created admin entity
            return Ok(AdminEntity);
        }
    }
}