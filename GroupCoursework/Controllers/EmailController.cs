using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

//This code sends an email to the email taken from the database which is taken from the html.
namespace GroupCoursework.Controllers
{
    [ApiController]
    [Route("[controller]")]

    //The references I have used: (Microsoft 2023a), (Microsoft 2023b) full reference is in the report
    public class EmailController : ControllerBase
    {
        //A POST api
        [HttpPost("send")]
        public IActionResult SendEmail([FromQuery] string passengerMail, [FromQuery] string passengerName)
        {
            try //Don't want code to crash in case of a failure
            {
                //I made a gmail with the address jetsetgoforyou@gmail.com and went through the steps to get it an app password to be able to use it
                var fromAddress = new MailAddress("jetsetgoforyou@gmail.com", "Jet Set Go");
                var toAddress = new MailAddress(passengerMail, passengerName);
                const string fromPassword = "lxcvnvouenxfkdza";

                const string subject = "Thank you for booking with JetSetGo Stansted!";
                //The following body string was modified/written by Courtney
                string body = $@"
Dear {passengerName},

Thank you for booking with Jet Set Go! We’re excited to have you on board.

Booking Details:
• Passenger Name: {passengerName}
• Email: {passengerMail}

Need help?
Feel free to contact our support team at support@jetsetgo.com or call us at (800) 555-JETGO.

We look forward to providing you with a smooth and comfortable journey. Please arrive at the airport at least 2 hours before your scheduled departure.

Bon voyage!  
Jet Set Go
";

                using (var smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential(fromAddress.Address, fromPassword);
                    smtp.EnableSsl = true;

                    using (var message = new MailMessage(fromAddress, toAddress)
                    {
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = false
                    })
                    {
                        smtp.Send(message);
                    }
                }

                return Ok("Email sent successfully!");//This is for the developer
            }
            catch (SmtpException smtpEx)
            {
                return StatusCode(500, $"SMTP error: {smtpEx.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to send email: {ex.Message}");
            }
        }

    }
}