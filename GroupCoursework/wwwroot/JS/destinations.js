document.addEventListener("DOMContentLoaded", function () {
    const destinationSelect = document.getElementById("going-to");

    if (destinationSelect) {
        //Populate 'Going To' dropdown
        fetch("https://localhost:7285/api/DestinationsPrices")
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch destinations");
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    alert("No destinations available at the moment.");
                } else {
                    data.forEach(destination => {
                        const option = document.createElement("option");
                        option.value = destination.destination;
                        option.textContent = destination.destination;
                        destinationSelect.appendChild(option);
                    });
                }
            })
            .catch(error => {
                console.error("Error loading destinations:", error);
                alert("Error loading destinations. Please try again later.");
            });
    }

    const flightOptionsHeader = document.getElementById("flight-options-header");
    const flightTableBody = document.getElementById("flight-table-body");

    if (flightOptionsHeader && flightTableBody) { //Display selected flights
        const urlParams = new URLSearchParams(window.location.search);
        const departureAirport = urlParams.get('leaving-from');
        const destination = urlParams.get('going-to');
        const flightDate = urlParams.get('flight-date');

        if (!departureAirport || !destination || !flightDate) {
            alert("Missing search parameters. Please return to the search form.");
            return;
        }

        flightOptionsHeader.innerHTML = `
            <h2>Flight Options from ${departureAirport} to ${destination} on ${flightDate}</h2>
        `;

        //Fetch flight 
        fetchFlightOptions(departureAirport, destination, flightDate);
    }

    function fetchFlightOptions(departure, destination, date) {
        const encodedDestination = encodeURIComponent(destination);
        const apiUrl = `https://localhost:7285/api/Flights/by-destination/${encodedDestination}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error("Flights not found");
                return response.json();
            })
            .then(flights => {
                if (!flights.length) {
                    console.log("No flights found for the selected destination.");
                    return;
                }

                const flightOptions = flights.map(flight => ({
                    flightID: flight.flightID,
                    time: new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    duration: flight.duration,
                    price: "£" + (flight.price || "N/A"),
                    from: flight.departureAirport || departure,
                    to: flight.destination
                }));

                populateFlightTable(flightOptions);
            })
            .catch(error => {
                console.error("Error fetching flight options:", error);
                console.log("Unable to fetch flight options.");
            });
    }


    function populateFlightTable(flightOptions) {
        const flightTableBody = document.getElementById('flight-table-body');
        if (!flightTableBody) return;

        flightTableBody.innerHTML = '';

        if (flightOptions.length === 0) {
            flightTableBody.innerHTML = `<tr><td colspan="5">No flight options available.</td></tr>`;
            return;
        }

        flightOptions.forEach(flight => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${flight.time}</td>
            <td>${flight.duration}</td>
            <td>${flight.price}</td>
            <td>${flight.from}</td>
            <td>${flight.to}</td>
        `;

            //Click event row to allow select flight
            row.addEventListener('click', function () {
                console.log("Flight selected:", {
                    flightID: flight.flightID,
                    destination: flight.to,
                    price: flight.price
                });

                //Store flight details in localStorage
                localStorage.setItem('selectedFlightId', flight.flightID);
                localStorage.setItem('selectedDestination', flight.to);
                localStorage.setItem('selectedPrice', flight.price);

            });

            flightTableBody.appendChild(row);
        });
    }

});
