using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace GroupCoursework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly PasswordHasher<Admin> passwordHasher;

        public AdminController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
            this.passwordHasher = new PasswordHasher<Admin>();
        }

        // POST: api/Admin/register
        [HttpPost("register")]
        public IActionResult AddAdmin([FromBody] AddAdminDto addAdminDto)
        {
            if (dbContext.Admin.Any(a => a.UserName == addAdminDto.UserName && a.BranchId == addAdminDto.BranchId))
            {
                return Conflict(new { message = "Admin with the same username and branch already exists." });
            }

            var admin = new Admin
            {
                UserName = addAdminDto.UserName,
                BranchId = addAdminDto.BranchId,
                Password = passwordHasher.HashPassword(null, addAdminDto.Password)
            };

            dbContext.Admin.Add(admin);
            dbContext.SaveChanges();

            return Ok(new
            {
                message = "Admin registered successfully",
                admin.Id,
                admin.UserName,
                admin.BranchId
            });
        }

        // POST: api/Admin/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            var admin = dbContext.Admin.FirstOrDefault(a =>
                a.UserName == loginDto.UserName &&
                a.BranchId == loginDto.BranchId
            );

            if (admin == null)
                return Unauthorized(new { message = "Invalid credentials" });

            var result = passwordHasher.VerifyHashedPassword(admin, admin.Password, loginDto.Password);

            if (result == PasswordVerificationResult.Success)
            {
                return Ok(new
                {
                    message = "Login successful",
                    admin.Id,
                    admin.UserName,
                    admin.BranchId
                });
            }

            return Unauthorized(new { message = "Invalid credentials" });
        }
    }
}
