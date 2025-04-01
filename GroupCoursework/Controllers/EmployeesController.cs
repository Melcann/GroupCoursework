using GroupCoursework.Data;
using GroupCoursework.Models.Entities;
using GroupCoursework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace GroupCoursework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        private readonly ApplicationDbContext dbContext;

        public EmployeesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        //Get all Employees.
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var allEmployees = dbContext.Employees.ToList();

            return Ok(allEmployees);
        }

        //Search Employees by their EmployeeId.
        [HttpGet]
        [Route("{EmployeeId:int}")]
        public IActionResult GetEmployeeByEmployeeId(int EmployeeId)
        {
            var employee = dbContext.Employees.Find(EmployeeId);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        //Add Employees to database
        [HttpPost]
        public IActionResult AddEmployee(AddEmployeesDto addEmployeesDto)
        {
            var employeesEntity = new Employees()
            {

                EmployeeId = addEmployeesDto.EmployeeId,
                Role = addEmployeesDto.Role,
                EmployeeName = addEmployeesDto.EmployeeName,
                FlightID = addEmployeesDto.FlightID,
            };

            dbContext.Employees.Add(employeesEntity);
            dbContext.SaveChanges();

            return Ok(employeesEntity);
        }

        //Update employee details
        [HttpPut]
        [Route("{EmployeeId:int}")]
        public IActionResult UpdateEmployee(int EmployeeId, UpdateEmployeesDto updateEmployeesDto)
        {
            var employee = dbContext.Employees.Find(EmployeeId);
            if (employee == null)
            {
                return NotFound();
            }

            employee.Role = updateEmployeesDto.Role;
            employee.FlightID = updateEmployeesDto.FlightID;          

            dbContext.SaveChanges();

            return Ok(employee);
        }

        [HttpDelete]
        [Route("{EmployeeId:int}")]
        public IActionResult DeleteEmployee(int EmployeeId)
        {
            var employee = dbContext.Employees.Find(EmployeeId);

            if (employee == null)
            {
                return NotFound();
            }

            dbContext.Employees.Remove(employee);
            dbContext.SaveChanges();
            return Ok();
        }

    }
}
