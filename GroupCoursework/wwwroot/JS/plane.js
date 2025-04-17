//Add new plane
document.getElementById("addPlaneForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const planeId = parseInt(document.getElementById("plane_id").value);
    const seatCapacity = parseInt(document.getElementById("seat_capacity").value);
    const weightCapacity = parseFloat(document.getElementById("weight_capacity").value);
    const availabilityValue = document.getElementById("availability").value;
    const availability = availabilityValue === "Available";

    const planeData = {
        planeId,
        seatCapacity,
        weightCapacity,
        availability
    };

    try {
        const response = await fetch('https://localhost:7285/api/Planes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(planeData)
        });

        if (response.ok) {
            const result = await response.json();
            alert("Plane added successfully!");
            addPlaneToTable(result);
            document.getElementById("addPlaneForm").reset();
        } else {
            const err = await response.text();
            console.error("Failed to add plane:", err);
            alert("Failed to add plane.");
        }
    } catch (error) {
        console.error("Error occurred while adding the plane:", error);
        alert("Error occurred while adding the plane.");
    }
});


//Load planes 
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('https://localhost:7285/api/Planes');
        console.log("Page load and fetching all planes...");
        if (response.ok) {
            const planes = await response.json();
            console.log("Planes fetched", planes);
            planes.forEach(addPlaneToTable);
        } else {
            alert("Failed to load planes.");
        }
    } catch (error) {
        console.error("Error loading planes:", error);
    }
});


//Add plane row
function addPlaneToTable(plane) {
    const row = document.createElement("tr");
    row.setAttribute("data-plane-id", plane.planeId);

    const readableAvailability = plane.availability ? "Available" : "Not Available";

    row.innerHTML = `
        <td>${plane.planeId}</td>
        <td contenteditable="true" data-field="seatCapacity">${plane.seatCapacity}</td>
        <td contenteditable="true" data-field="weightCapacity">${plane.weightCapacity}</td>
        <td contenteditable="true" data-field="availability">${readableAvailability}</td>
        <td>
            <button onclick="editPlane(${plane.planeId})">Edit</button>
            <button onclick="deletePlane(${plane.planeId})">Delete</button>
        </td>
    `;
    document.getElementById("planeList").appendChild(row);
    enableInlineEditing(row, plane.planeId);
}


//Inline editing
function enableInlineEditing(row, planeId) {
    row.querySelectorAll('[contenteditable]').forEach(cell => {
        cell.addEventListener('blur', () => handleInlineEdit(cell, planeId));
        cell.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                cell.blur(); // Save when enter
            }
        });
    });
}


//Convert string availability to boolean match database
function parseAvailability(text) {
    return text.toLowerCase() === "available";
}


//Edits on the table
async function handleInlineEdit(cell, planeId) {
    const row = cell.closest('tr');
    const seatCapacity = parseInt(row.querySelector('[data-field="seatCapacity"]').textContent.trim());
    const weightCapacity = parseFloat(row.querySelector('[data-field="weightCapacity"]').textContent.trim());
    const availabilityText = row.querySelector('[data-field="availability"]').textContent.trim();
    const availability = parseAvailability(availabilityText);

    try {
        const updateData = {
            seatCapacity,
            weightCapacity,
            availability
        };

        const response = await fetch(`https://localhost:7285/api/Planes/${planeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            console.log(`Plane ${planeId} updated successfully.`);
            row.querySelector('[data-field="availability"]').textContent = availability ? "Available" : "Not Available";
        } else {
            const err = await response.text();
            alert("Update failed: " + err);
        }
    } catch (error) {
        console.error("Error updating plane:", error);
        alert("Error updating plane.");
    }
}


//Delete a plane
async function deletePlane(planeId) {
    if (!confirm("Are you sure you want to delete this plane?")) return;

    try {
        const response = await fetch(`https://localhost:7285/api/Planes/${planeId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Plane deleted successfully.");
            document.querySelector(`tr[data-plane-id="${planeId}"]`).remove();
        } else {
            alert("Failed to delete plane.");
        }
    } catch (error) {
        console.error("Error deleting plane:", error);
    }
}


//Focus first editable cell on edit
function editPlane(planeId) {
    const row = document.querySelector(`tr[data-plane-id="${planeId}"]`);
    const firstEditable = row.querySelector('[contenteditable]');
    if (firstEditable) {
        firstEditable.focus();
    }
}


//Search by Plane ID
document.getElementById("search-plane").addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    const rows = document.querySelectorAll("#planeList tr");

    rows.forEach(row => {
        const planeId = row.cells[0].textContent.toLowerCase();
        if (planeId.includes(query)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});
