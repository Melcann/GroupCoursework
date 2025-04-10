document.getElementById("addPlaneForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const planeId = document.getElementById("plane_id").value;
    const seatCapacity = document.getElementById("seat_capacity").value;
    const weightCapacity = document.getElementById("weight_capacity").value;
    const availability = document.getElementById("availability").value;

    const payload = {
        planeId: parseInt(planeId),
        seatCapacity: parseInt(seatCapacity),
        weightCapacity: parseFloat(weightCapacity),
        availability: availability
    };

    console.log("Submitting plane data:", payload);

    try {
        const response = await fetch('https://localhost:7285/api/planes', {
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
        const response = await fetch(`https://localhost:7285/api/planes/${planeId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log("Plane deleted successfully.");
            alert("Plane deleted successfully.");
            location.reload(); // Optional, or remove the row from DOM
        } else {
            console.error("Failed to delete plane. Status:", response.status);
            alert("Failed to delete plane.");
        }
    } catch (error) {
        console.error("Error deleting plane:", error);
    }
}