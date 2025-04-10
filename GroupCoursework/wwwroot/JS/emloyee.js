// Fetch all employees
async function fetchEmployees() {
    console.log("Fetching all employees...");

    try {
        const response = await fetch('https://localhost:7285/api/employees');
        if (!response.ok) throw new Error('Failed to fetch employees');

        const employees = await response.json();
        console.log("Employees fetched:", employees);

        const employeeList = document.getElementById('employeeList');
        employeeList.innerHTML = ''; // Clear existing employee list

        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.employeeId}</td>
                <td>${employee.employeeName}</td>
                <td>${employee.role}</td>
                <td>${employee.flightID}</td>
                <td>
                    <button onclick="deleteEmployee(${employee.employeeId})">Delete</button>
                    <button onclick="updateEmployee(${employee.employeeId})">Update</button>
                </td>
            `;
            employeeList.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching employees:', error.message);
    }
}

// Add a new employee
document.getElementById('addEmployeeForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Submitting new employee...");

    const employeeId = document.getElementById('employee_id').value.trim();
    const employeeName = document.getElementById('employee_name').value.trim();
    const role = document.getElementById('role').value.trim();
    const flightID = document.getElementById('assigned_flightID').value.trim();

    const newEmployee = { employeeId, employeeName, role, flightID };

    console.log("Sending employee data:", newEmployee);

    try {
        const response = await fetch('https://localhost:7285/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEmployee)
        });
        if (!response.ok) throw new Error('Failed to add employee');

        const addedEmployee = await response.json();
        console.log('Employee added successfully:', addedEmployee);
        fetchEmployees();
    } catch (error) {
        console.error('Error adding employee:', error.message);
    }

    document.getElementById('addEmployeeForm').reset();
});

// Delete an employee
async function deleteEmployee(employeeId) {
    console.log(`Attempting to delete employee ID: ${employeeId}`);

    try {
        const response = await fetch(`https://localhost:7285/api/employees/${employeeId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Failed to delete employee with ID ${employeeId}`);

        console.log(`Employee with ID ${employeeId} deleted successfully`);
        fetchEmployees();
    } catch (error) {
        console.error('Error deleting employee:', error.message);
    }
}

// Update an employee
async function updateEmployee(employeeId) {
    console.log(`Initiating update for employee ID: ${employeeId}`);

    const newRole = prompt("Enter new role for employee:");
    if (newRole) {
        const updatedData = { role: newRole.trim() };
        console.log("Sending update data:", updatedData);

        try {
            const response = await fetch(`https://localhost:7285/api/employees/${employeeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) throw new Error(`Failed to update employee with ID ${employeeId}`);

            const updatedEmployee = await response.json();
            console.log(`Employee updated successfully:`, updatedEmployee);
            fetchEmployees();
        } catch (error) {
            console.error('Error updating employee:', error.message);
        }
    } else {
        console.log("Update cancelled by user.");
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded, fetching employees...");
    fetchEmployees();
});