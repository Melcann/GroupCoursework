//Display flights table
    document.addEventListener("DOMContentLoaded", () => {
        fetch("https://localhost:7285/api/Flights") 
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById("flightList");
                tableBody.innerHTML = ""; 

                data.forEach(flight => {
                    const row = document.createElement("tr");

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
                        </td>
                    `;

                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching flights:", error));
    });

    function deleteFlight(id) {
        fetch(`https://localhost:7285/api/Flights/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    alert("Flight deleted successfully.");
                    location.reload(); 
                } else {
                    alert("Failed to delete flight.");
                }
            });
    }

