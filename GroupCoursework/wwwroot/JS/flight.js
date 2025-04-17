document.addEventListener("DOMContentLoaded", () => {
    const addFlightForm = document.getElementById("addFlightForm");
    const flightTableBody = document.getElementById("flightList");
    const searchFlightInput = document.getElementById("search-flight");



    //Initial fetch and display
    fetchFlights();



    //Fetch and display all flights
    async function fetchFlights() {
        try {
            const res = await fetch("https://localhost:7285/api/Flights");
            console.log("Page load and fetching all flights...");
            const data = await res.json();
            console.log("Flights fetched", data);
            flightTableBody.innerHTML = "";
            data.forEach(flight => flightTableBody.appendChild(createFlightRow(flight)));
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }


    //Create inline editable cells
    function createFlightRow(flight) {
        const row = document.createElement("tr");
        row.setAttribute("data-flight-id", flight.flightID);

        row.innerHTML = `
    <td contenteditable="true" class="editable">${flight.flightID}</td>
    <td contenteditable="true" class="editable">${flight.planeId}</td>
    <td contenteditable="true" class="editable">${flight.destination}</td>
    <td contenteditable="true" class="editable">${new Date(flight.departureTime).toISOString().slice(0, 16)}</td>
    <td contenteditable="true" class="editable">${new Date(flight.returnTime).toISOString().slice(0, 16)}</td>
    <td contenteditable="true" class="editable">${flight.gateNumber}</td>
    <td contenteditable="true" class="editable">${flight.duration}</td>
    <td>
        <button class="save-btn">Save</button>
        <button onclick="deleteFlight(${flight.flightID})">Delete</button>
    </td>
    `;

        row.querySelector(".save-btn").addEventListener("click", () => saveEditedFlight(row, flight.flightID));
        return row;
    }


    //Save updated flight from table row
    async function saveEditedFlight(row, flightID) {
        const cells = row.querySelectorAll("td");

        const updatedFlight = {
            flightID: parseInt(cells[0].innerText),
            planeId: parseInt(cells[1].innerText),
            destination: cells[2].innerText.trim(),
            departureTime: new Date(cells[3].innerText).toISOString(),
            returnTime: new Date(cells[4].innerText).toISOString(),
            gateNumber: cells[5].innerText.trim(),
            duration: formatDuration(cells[6].innerText.trim())
        };

        try {
            const res = await fetch(`https://localhost:7285/api/Flights/${flightID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFlight)
            });

            if (!res.ok) throw new Error("Update failed");
            alert("Flight updated successfully.");
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update flight.");
        }
    }


    //Add flight from form
    addFlightForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const newFlight = {
            flightID: parseInt(document.getElementById("flight_id").value),
            planeId: parseInt(document.getElementById("plane_id").value),
            destination: document.getElementById("destination").value.trim(),
            departureTime: document.getElementById("departure_time").value,
            returnTime: document.getElementById("return_time").value,
            gateNumber: document.getElementById("gate_number").value.trim(),
            duration: formatDuration(document.getElementById("duration").value.trim())
        };

        try {
            const res = await fetch("https://localhost:7285/api/Flights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFlight)
            });

            if (!res.ok) throw new Error("Add failed");

            const flight = await res.json();
            alert("Flight added successfully.");
            flightTableBody.appendChild(createFlightRow(flight));
            addFlightForm.reset();
        } catch (err) {
            console.error("Add error:", err);
            alert("Failed to add flight.");
        }
    });


    //Delete flight
    window.deleteFlight = async function (id) {
        if (!confirm("Are you sure you want to delete this flight?")) return;

        try {
            const res = await fetch(`https://localhost:7285/api/Flights/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Delete failed");

            alert("Flight deleted successfully.");
            fetchFlights();
        } catch (err) {
            console.error("Delete error:", err);
            alert("Failed to delete flight.");
        }
    };


    //Search flight by ID
    searchFlightInput.addEventListener("input", async () => {
        const id = searchFlightInput.value.trim();

        if (!id) {
            fetchFlights();
            return;
        }

        try {
            const res = await fetch(`https://localhost:7285/api/Flights/${id}`);
            if (!res.ok) throw new Error("Not found");

            const flight = await res.json();
            flightTableBody.innerHTML = "";
            flightTableBody.appendChild(createFlightRow(flight));
        } catch {
            flightTableBody.innerHTML = `<tr><td colspan="8">No flight found with ID "${id}"</td></tr>`;
        }
    });



    //Helper to format duration like this "2.5" => "2h 30m", "3" => "3h"
    function formatDuration(value) {
        if (!value) return "0h";

        //If already in "Xh Ym" format, return same
        if (/^\d+h(\s?\d+m)?$/.test(value)) return value;

        const num = parseFloat(value);
        if (isNaN(num)) return value;

        const hours = Math.floor(num);
        const minutes = Math.round((num - hours) * 60);

        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
});

