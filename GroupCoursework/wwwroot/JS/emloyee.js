document.addEventListener("DOMContentLoaded", function () {
    const employeeTable = document.getElementById("employeeList");
    const searchEmployee = document.getElementById("search-employee");
    const employeeForm = document.getElementById("addEmployeeForm");

    //Load all employees
    function displayEmployees() {
        fetch("https://localhost:7285/api/Employees")
            .then(response => response.json())
            .then(data => {
                console.log("Employees fetched:", data);
                renderEmployees(data);
            })
            .catch(error => console.error("Error fetching employees:", error));
    }

    function renderEmployees(data) {
        employeeTable.innerHTML = "";
        data.forEach(employee => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="emp-id">${employee.employeeId}</td>
                <td class="emp-name">${employee.employeeName}</td>
                <td class="emp-role">${employee.role}</td>
                <td class="emp-flight">${employee.flightID || ""}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button onclick="deleteEmployee(${employee.employeeId})">Delete</button>
                </td>
            `;

            row.querySelector(".edit-btn").addEventListener("click", function () {
                const nameCell = row.querySelector(".emp-name");
                const roleCell = row.querySelector(".emp-role");
                const flightCell = row.querySelector(".emp-flight");

                const originalName = nameCell.textContent;
                const originalRole = roleCell.textContent;
                const originalFlight = flightCell.textContent;

                nameCell.innerHTML = `<input type="text" value="${originalName}">`;
                roleCell.innerHTML = `
                    <select>
                        <option value="Pilot" ${originalRole === "Pilot" ? "selected" : ""}>Pilot</option>
                        <option value="Cabin Crew" ${originalRole === "Cabin Crew" ? "selected" : ""}>Cabin Crew</option>
                        <option value="Ground Staff" ${originalRole === "Ground Staff" ? "selected" : ""}>Ground Staff</option>
                        <option value="Security" ${originalRole === "Security" ? "selected" : ""}>Security</option>
                    </select>
                `;
                flightCell.innerHTML = `<input type="text" value="${originalFlight}">`;

                const actionCell = row.lastElementChild;
                actionCell.innerHTML = `
                    <button class="save-btn">Save</button>
                    <button class="cancel-btn">Cancel</button>
                `;

                //Save
                actionCell.querySelector(".save-btn").addEventListener("click", function () {
                    const updatedName = nameCell.querySelector("input").value;
                    const updatedRole = roleCell.querySelector("select").value;
                    const updatedFlight = flightCell.querySelector("input").value;

                    const updatedEmployee = {
                        employeeName: updatedName,
                        role: updatedRole,
                        flightID: updatedFlight
                    };

                    fetch(`https://localhost:7285/api/Employees/${employee.employeeId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedEmployee)
                    })
                        .then(response => {
                            if (response.ok) {
                                displayEmployees();
                            } else {
                                console.error("Update failed");
                            }
                        })
                        .catch(error => console.error("Error updating employee:", error));
                });

                //Cancel
                actionCell.querySelector(".cancel-btn").addEventListener("click", function () {
                    nameCell.textContent = originalName;
                    roleCell.textContent = originalRole;
                    flightCell.textContent = originalFlight;

                    actionCell.innerHTML = `
                        <button class="edit-btn">Edit</button>
                        <button onclick="deleteEmployee(${employee.employeeId})">Delete</button>
                    `;
                    row.querySelector(".edit-btn").addEventListener("click", arguments.callee); //edit
                });
            });

            employeeTable.appendChild(row);
        });
    }


    //Add Employee
    employeeForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newEmployee = {
            employeeId: parseInt(document.getElementById("employee_id").value),
            employeeName: document.getElementById("employee_name").value,
            role: document.getElementById("role").value,
            flightID: document.getElementById("assigned_flightID").value || null
        };

        fetch("https://localhost:7285/api/Employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmployee)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to add employee");
                }
                return response.json();
            })
            .then(data => {
                console.log("Employee added:", data);
                displayEmployees();
                employeeForm.reset();
            })
            .catch(error => console.error("Error adding employee:", error));
    });


    //Delete Employee
    window.deleteEmployee = function (employeeId) {
        if (!confirm("Are you sure you want to delete this employee?")) return;

        fetch(`https://localhost:7285/api/Employees/${employeeId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    displayEmployees();
                } else {
                    console.error("Failed to delete employee.");
                }
            })
            .catch(error => console.error("Error deleting employee:", error));
    };


    //Search
    searchEmployee.addEventListener("input", function () {
        const employeeId = searchEmployee.value.trim();

        if (employeeId === "") {
            displayEmployees();
            return;
        }

        fetch(`https://localhost:7285/api/Employees/${employeeId}`)
            .then(response => {
                if (!response.ok) throw new Error("Not found");
                return response.json();
            })
            .then(employee => {
                renderEmployees([employee]);
            })
            .catch(error => {
                employeeTable.innerHTML = `<tr><td colspan="5">No employee found with ID ${employeeId}</td></tr>`;
            });
    });


    //Initial load
    displayEmployees();
});
