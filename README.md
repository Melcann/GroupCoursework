# Passenger Booking System

## Overview
The **Passenger Booking System** is a web-based flight booking application that allows passengers to book flights, enter personal information, make payments, and receive booking confirmations. Admin functionalities include flight assignment, passenger check-ins, and CRUD operations for planes. The system is built using **HTML, JavaScript, C#, and SQL**.

## Team 
Dana, Courtney, Zeel, Melissa and Amin

## Install
1. Install necessary dependencies for **C#, SQL Server, and JavaScript frameworks**.
2. Set up the database using the provided SQL scripts.
3. Run the project using **Visual Studio** and connect to the database.
4. Open in a browser for frontend testing.
   
   
## Setting Up the Database (EF Core Migrations)
Follow these steps to set up your local SQL Server database using **Entity Framework Core** after cloning the repository:

1. **Update the Connection String**:
   - Open the `appsettings.json` file and locate the `DefaultConnection` under `ConnectionStrings`.
   - Replace `PERSONAL-LAPTOP` with your own SQL Server instance name.
     Example:
     ```json
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR-SERVER-NAME\\SQLEXPRESS;Database=AirportDb;Trusted_Connection=True;TrustServerCertificate=True;"
     }
     ```

2. **Open SQL Server Management Studio (SSMS)**:
   - Connect to your local SQL Server instance.
   - Ensure that the name you used in `appsettings.json` matches the one you're connected to in SSMS.

3. **Apply Migrations**:
   - Open the project in **Visual Studio**.
   - Go to **Tools > NuGet Package Manager > Package Manager Console**.
   - Set the **Default Project** dropdown to the project containing your `DbContext`.
   - Run the following command:
     ```powershell
     Update-Database
     ```
   This will apply all existing migrations and create the `AirportDb` database in your SQL Server instance.

4. **Verify the Database**:
   - Go back to **SSMS** and refresh your Databases.
   - You should now see `AirportDb` with the appropriate tables.

## Accessing the Admin Page
To access the admin page, follow these steps:

1. Navigate to the following URL:  
   `https://localhost:7285/adminHTML/adminLogin.html`

2. On the login page, enter the following credentials:
   - **BranchId:** 900874
   - **UserName:** JetsetgoStanstead
   - **Password:** JetSetGoAdmin90@

3. After successfully logging in, you will be redirected to the Admin Page:  
   `https://localhost:7285/adminHTML/admin.html`

4. On the admin page, you will see a navigation menu with options:  
   - **Passenger**  
   - **Plane**  
   - **Employee**  
   - **Flight**  

5. Click on any of these options, and the page will automatically scroll to the respective section where you can:
   - **Add** new data
   - **Edit** existing data
   - **Delete** data from the database

6. Once you are done managing the data, click the **Logout** option from the navigation menu.

7. After logging out, you will be redirected back to the login page.

## License
This project is for educational purposes only. All rights reserved by the development team.

