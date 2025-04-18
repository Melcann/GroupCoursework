document.addEventListener('DOMContentLoaded', function () {
    const flightForm = document.getElementById('addFlightForm');
    const flightTable = document.getElementById('flightList');
    const searchFlight = document.getElementById('search-flight');

    //Loaflights
    function displayFlights() {
        fetch('https://localhost:7285/api/Flights')
            .then(response => response.json())
            .then(data => {
                console.log("Flights fetched:", data);
                renderFlights(data);
            })
            .catch(error => console.error("Error fetching flights:", error));
    }

    function renderFlights(data) {
        flightTable.innerHTML = "";
        data.forEach(flight => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td class="flight-id">${flight.flightID}</td>
                <td class="plane-id">${flight.planeId}</td>
                <td class="destination">${flight.destination}</td>
                <td class="departure">${new Date(flight.departureTime).toLocaleString()}</td>
                <td class="return">${new Date(flight.returnTime).toLocaleString()}</td>
                <td class="gate">${flight.gateNumber}</td>
                <td class="duration">${flight.duration}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button onclick="deleteFlight('${flight.flightID}')">Delete</button>
                </td>
            `;

            row.querySelector(".edit-btn").addEventListener("click", function () {
                const planeCell = row.querySelector(".plane-id");
                const destCell = row.querySelector(".destination");
                const depCell = row.querySelector(".departure");
                const retCell = row.querySelector(".return");
                const gateCell = row.querySelector(".gate");
                const durationCell = row.querySelector(".duration");

                const original = {
                    planeId: planeCell.textContent,
                    destination: destCell.textContent,
                    departureTime: new Date(depCell.textContent).toISOString().slice(0, 16),
                    returnTime: new Date(retCell.textContent).toISOString().slice(0, 16),
                    gateNumber: gateCell.textContent,
                    duration: durationCell.textContent
                };

                planeCell.innerHTML = `<input type="text" value="${original.planeId}">`;
                destCell.innerHTML = `<input type="text" value="${original.destination}">`;
                depCell.innerHTML = `<input type="datetime-local" value="${original.departureTime}">`;
                retCell.innerHTML = `<input type="datetime-local" value="${original.returnTime}">`;
                gateCell.innerHTML = `<input type="text" value="${original.gateNumber}">`;
                durationCell.innerHTML = `<input type="text" value="${original.duration}">`;

                const actionCell = row.lastElementChild;
                actionCell.innerHTML = `
                    <button class="save-btn">Save</button>
                    <button class="cancel-btn">Cancel</button>
                `;

                //Save update
                actionCell.querySelector(".save-btn").addEventListener("click", function () {
                    const updatedFlight = {
                        flightID: flight.flightID,
                        planeId: planeCell.querySelector("input").value,
                        destination: destCell.querySelector("input").value,
                        departureTime: depCell.querySelector("input").value,
                        returnTime: retCell.querySelector("input").value,
                        gateNumber: gateCell.querySelector("input").value,
                        duration: durationCell.querySelector("input").value
                    };

                    fetch(`https://localhost:7285/api/Flights/${flight.flightID}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedFlight)
                    })
                        .then(res => {
                            if (res.ok) {
                                displayFlights();
                            } else {
                                throw new Error("Update failed");
                            }
                        })
                        .catch(error => console.error("Error updating flight:", error));
                });

                //Cancel edit
                actionCell.querySelector(".cancel-btn").addEventListener("click", function () {
                    planeCell.textContent = original.planeId;
                    destCell.textContent = original.destination;
                    depCell.textContent = new Date(original.departureTime).toLocaleString();
                    retCell.textContent = new Date(original.returnTime).toLocaleString();
                    gateCell.textContent = original.gateNumber;
                    durationCell.textContent = original.duration;

                    actionCell.innerHTML = `
                        <button class="edit-btn">Edit</button>
                        <button onclick="deleteFlight('${flight.flightID}')">Delete</button>
                    `;
                    row.querySelector(".edit-btn").addEventListener("click", arguments.callee);
                });
            });

            flightTable.appendChild(row);
        });
    }

    //Add light
    flightForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newFlight = {
            flightID: document.getElementById('flightID').value,
            planeId: document.getElementById('planeId').value,
            destination: document.getElementById('destination').value,
            departureTime: document.getElementById('departureTime').value,
            returnTime: document.getElementById('returnTime').value,
            gateNumber: document.getElementById('gateNumber').value,
            duration: document.getElementById('duration').value
        };

        fetch('https://localhost:7285/api/Flights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFlight)
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to add flight");
                return response.json();
            })
            .then(data => {
                console.log("Flight added:", data);
                displayFlights();
                flightForm.reset();
            })
            .catch(error => console.error("Error adding flight:", error));
    });

    //Delete
    window.deleteFlight = function (flightID) {
        if (!confirm("Are you sure you want to delete this flight?")) return;

        fetch(`https://localhost:7285/api/Flights/${flightID}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    displayFlights();
                } else {
                    throw new Error("Failed to delete flight");
                }
            })
            .catch(error => console.error("Error deleting flight:", error));
    };

    //Search flight ID and filter to allow partal search
    searchFlight.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase();
        console.log("Searching for flight with ID:", query);

        const rows = document.querySelectorAll("#flightList tr");

        if (query === "") {
            rows.forEach(row => row.style.display = "");
        } else {
            rows.forEach(row => {
                const flightId = row.cells[0].textContent.trim().toLowerCase(); //Flight ID 
                if (flightId.includes(query)) {
                    console.log(`Flight with ID ${flightId} matches the search query.`);
                    row.style.display = "";
                } else {
                    console.log(`Flight with ID ${flightId} does not match the search query.`);
                    row.style.display = "none";
                }
            });
        }
    });



    displayFlights();
});
