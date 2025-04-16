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

        //Get all Admins.
        [HttpGet]
        public IActionResult GetAllAdmins()
        {
            var allAdmin = dbContext.Admin.ToList();

            return Ok(allAdmin);
        }

        //Search Admin by their username.
        [HttpGet]
        [Route("{UserName}")]
        public IActionResult GetAdminByUserName(string UserName)
        {
            var admin = dbContext.Admin.Find(UserName);

            if (admin == null)
            {
                return NotFound();
            }

            return Ok(admin);
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
