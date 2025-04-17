using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;


//Post - sending an email, by scrum master
namespace TryingSendingAnEmail.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmailController : ControllerBase
    {
        [HttpPost("send")]
        public IActionResult SendEmail()
        {
            try
            {
                var fromAddress = new MailAddress("jetsetgoforyou@gmail.com", "Jet Set Go");
                var toAddress = new MailAddress("2004melissac@gmail.com", "Melissa");
                const string fromPassword = "lxcvnvouenxfkdza";
                const string subject = "Test Email from ASP.NET Core!";
                const string body = "Hello! This is a test email sent from an ASP.NET Core Web API.";

                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                };

                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }

                return Ok("Email sent successfully!");//It did work actually
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to send email: {ex.Message}");
            }
        }

    }
}