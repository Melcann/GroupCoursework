//Display flights table
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded and attempt to fetch flights...");

    fetch("https://localhost:7285/api/Flights")
        .then(response => response.json())
        .then(data => {
            console.log("Flight data received:", data);

            const tableBody = document.getElementById("flightList");
            tableBody.innerHTML = "";

            data.forEach(flight => {
                const row = document.createElement("tr");
                row.setAttribute('data-flight-id', flight.flightID);
                row.innerHTML = `
                    <td>${flight.flightID}</td>
                    <td>${flight.planeId}</td>
                    <td>${flight.destination}</td>
                    <td>${new Date(flight.departureTime).toLocaleString()}</td>
                    <td>${new Date(flight.returnTime).toLocaleString()}</td>
                    <td>${flight.gateNumber}</td>
                    <td>${flight.duration}</td>
                    <td>
                        <button onclick="deleteFlight(${flight.flightID})">Delete</button>
                        <button onclick="editFlight(${flight.flightID})">Edit</button>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching flights:", error));
});

//Add flight
const addFlight = document.getElementById("addFlightForm");
addFlight.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        flightID: document.getElementById("flight_id").value,
        planeId: document.getElementById("plane_id").value,
        destination: document.getElementById("destination").value,
        departureTime: document.getElementById("departure_time").value,
        returnTime: document.getElementById("return_time").value,
        gateNumber: document.getElementById("gate_number").value,
        duration: document.getElementById("duration").value
    };

    //Post flight
    fetch("https://localhost:7285/api/Flights", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            console.log("Add flight response:", response);
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to add flight.");
            }
        })
        .then(data => {
            console.log("Flight added:", data);
            alert("Flight added successfully.");
            location.reload();
        })
        .catch(error => {
            console.error("Error adding flight:", error);
            alert("Error adding flight.");
        });
});

//Delete Flight
function deleteFlight(id) {
    console.log(`Attempting to delete flight with ID: ${id}`);

    fetch(`https://localhost:7285/api/Flights/${id}`, {
        method: "DELETE"
    })
        .then(response => {
            console.log("Delete response:", response);

            if (response.ok) {
                alert("Flight deleted successfully.");
                location.reload();
            } else {
                alert("Failed to delete flight.");
            }
        })
        .catch(error => {
            console.error("Error deleting flight:", error);
        });
}

//Edit Flight
function editFlight(id) {
    console.log(`Attempting to edit flight... ${id}`);
    fetch(`https://localhost:7285/api/Flights/${id}`)
        .then(response => response.json())
        .then(flight => {
            document.getElementById("flight_id").value = flight.flightID;
            document.getElementById("plane_id").value = flight.planeId;
            document.getElementById("destination").value = flight.destination;
            document.getElementById("departure_time").value = flight.departureTime.split('T').join(' ');
            document.getElementById("return_time").value = flight.returnTime.split('T').join(' ');
            document.getElementById("gate_number").value = flight.gateNumber;
            document.getElementById("duration").value = flight.duration;

            //Update not new
            addFlight.removeEventListener("submit", addFlightListener);
            addFlight.addEventListener("submit", function (event) {
                event.preventDefault();

                const updatedFlightData = {
                    planeId: document.getElementById("plane_id").value,
                    destination: document.getElementById("destination").value,
                    departureTime: document.getElementById("departure_time").value,
                    returnTime: document.getElementById("return_time").value,
                    gateNumber: document.getElementById("gate_number").value,
                    duration: document.getElementById("duration").value
                };

                //Update flight
                fetch(`https://localhost:7285/api/Flights/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedFlightData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Flight updated:", data);
                        alert("Flight updated successfully.");
                        location.reload();
                    })
                    .catch(error => {
                        console.error("Error updating flight:", error);
                        alert("Failed to update flight.");
                    });
            });
        })
        .catch(error => {
            console.error("Error fetching flight when editing", error);
        });
}

//Reset the form to make new flight
function resetForm() {
    addFlight.reset(); 
    addFlight.removeEventListener("submit", updateFlightListener);
    addFlight.addEventListener("submit", addFlightListener);
}
