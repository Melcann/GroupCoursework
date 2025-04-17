using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GroupCoursework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public AdminController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Add Admin to database
        [HttpPost]
        public IActionResult AddAdmin(AddAdminDto addAdminDto)
        {

            var AdminEntity = new Admin()
            {
                UserName = addAdminDto.UserName,
                BranchId = addAdminDto.BranchId,
                Password = addAdminDto.Password,

            };

            dbContext.Admin.Add(AdminEntity);
            dbContext.SaveChanges();

            return Ok(AdminEntity);
        }
    }
}