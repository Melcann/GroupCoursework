document.getElementById("addPlaneForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const planeId = parseInt(document.getElementById("plane_id").value);
    const seatCapacity = parseInt(document.getElementById("seat_capacity").value);
    const weightCapacity = parseFloat(document.getElementById("weight_capacity").value);
    const availabilityValue = document.getElementById("availability").value;

    // Convert string to boolean
    const availability = availabilityValue === "Available";

    // Wrap inside `addPlanesDto` as required by the API
    const payload = {
        addPlanesDto: {
            planeId,
            seatCapacity,
            weightCapacity,
            availability
        }
    };

    console.log("Submitting wrapped payload:", payload);

    try {
        const response = await fetch('https://localhost:7285/api/Planes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log("Server response:", response);

        if (response.ok) {
            const result = await response.json();
            console.log("Plane added successfully:", result);
            alert("Plane added successfully!");

            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${result.planeId}</td>
                <td>${result.seatCapacity}</td>
                <td>${result.availability}</td>
                <td><button onclick="deletePlane(${result.planeId})">Delete</button></td>
            `;
            document.getElementById("planeList").appendChild(newRow);
            document.getElementById("addPlaneForm").reset();
        } else {
            const err = await response.text();
            console.error("Failed to add plane. Status:", response.status, "Message:", err);
            alert("Failed to add plane.");
        }
    } catch (error) {
        console.error("Error occurred while adding the plane:", error);
        alert("Error occurred while adding the plane.");
    }
});

async function deletePlane(planeId) {
    console.log("Deleting plane with ID:", planeId);

    if (!confirm("Are you sure you want to delete this plane?")) return;

    try {
        const response = await fetch(`https://localhost:5074/api/Planes/${planeId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log("Plane deleted successfully.");
            alert("Plane deleted successfully.");
            location.reload(); // Optional: reload page or manually remove the row
        } else {
            console.error("Failed to delete plane. Status:", response.status);
            alert("Failed to delete plane.");
        }
    } catch (error) {
        console.error("Error deleting plane:", error);
    }
}