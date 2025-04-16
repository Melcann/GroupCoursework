document.addEventListener("DOMContentLoaded", function () {
    const employeeTable = document.getElementById("employeeList");
    const searchEmployee = document.getElementById("search-employee");
    const employeeForm = document.getElementById("addEmployeeForm");
    console.log("Page loaded and attempt to fetch employees...");

    // Display all employees
    function displayEmployees() {
        fetch("https://localhost:7285/api/Employees")
            .then(response => response.json())
            .then(data => {
                console.log("Employees fetched:", data);
                employeeTable.innerHTML = "";
                data.forEach(employee => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${employee.employeeId}</td>
                        <td>${employee.employeeName}</td>
                        <td>${employee.role}</td>
                        <td>${employee.flightID || "N/A"}</td>
                        <td>
                            <button onclick="deleteEmployee(${employee.employeeId})">Delete</button>
                        </td>
                    `;
                    employeeTable.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching employees:", error));
    }

    // Adding a new employee
    employeeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newEmployee = {
            EmployeeId: document.getElementById("employee_id").value,
            EmployeeName: document.getElementById("employee_name").value,
            Role: document.getElementById("role").value,
            FlightID: document.getElementById("assigned_flightID").value || null
        };

        fetch("https://localhost:7285/api/Employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Employee added:", data);
                displayEmployees();
                employeeForm.reset();
            })
            .catch(error => console.error("Error adding employee:", error));
    });

    // Searching employee by ID
    searchEmployee.addEventListener("input", function () {
        const employeeId = searchEmployee.value.trim();
        console.log("Search input:", employeeId);
        if (employeeId) {
            fetch(`https://localhost:7285/api/Employees/${employeeId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Search result:", data);
                    employeeTable.innerHTML = "";

                    if (data) {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${data.employeeId}</td>
                            <td>${data.employeeName}</td>
                            <td>${data.role}</td>
                            <td>${data.flightID || "N/A"}</td>
                            <td>
                                <button onclick="deleteEmployee(${data.employeeId})">Delete</button>
                            </td>
                        `;
                        employeeTable.appendChild(row);
                    } else {
                        const noResultRow = document.createElement("tr");
                        noResultRow.innerHTML = `<td colspan="5">No employee found with ID ${employeeId}</td>`;
                        employeeTable.appendChild(noResultRow);
                    }
                })
                .catch(error => console.error("Error fetching employee by ID:", error));
        } else {
            displayEmployees();  // Show all employees if the search is empty
        }
    });

    // Delete an employee
    window.deleteEmployee = function (employeeId) {
        console.log("Deleting employee with ID:", employeeId);
        fetch(`https://localhost:7285/api/Employees/${employeeId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    console.log("Employee deleted successfully");
                    displayEmployees();
                } else {
                    console.error("Error finding employee:", response);
                }
            })
            .catch(error => console.error("Error finding employee:", error));
    };

    // Load all employees when page is loaded
    displayEmployees();
});



