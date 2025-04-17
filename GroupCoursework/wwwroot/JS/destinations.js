document.addEventListener("DOMContentLoaded", function () {
    const destinationSelect = document.getElementById("going-to");

    if (destinationSelect) {
        //Index opulate dropdown
        fetch("https://localhost:7285/api/DestinationsPrices")
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch destinations");
                return response.json();
            })
            .then(data => {
                data.forEach(destination => {
                    const option = document.createElement("option");
                    option.value = destination.destination;
                    option.textContent = destination.destination;
                    destinationSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Error loading destinations:", error);
            });
    }

    const flightOptionsHeader = document.getElementById("flight-options-header");
    const flightTableBody = document.getElementById("flight-table-body");

    if (flightOptionsHeader && flightTableBody) {
        //Results display selected flights
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

        fetchFlightOptions(departureAirport, destination, flightDate);
    }

    function fetchFlightOptions(departure, destination, date) {
        const encodedDestination = encodeURIComponent(destination);
        const apiUrl = `https://localhost:7285/api/DestinationsPrices/${encodedDestination}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error("Destination not found");
                return response.json();
            })
            .then(flight => {
                const flightOptions = [
                    {
                        time: "14:30",
                        duration: "6h 15m",
                        price: `£${flight.price}`,
                        from: flight.airportName || departure,
                        to: flight.destination
                    }
                ];
                populateFlightTable(flightOptions);
            })
            .catch(error => {
                console.error("Error fetching flight options:", error);
                alert("Unable to fetch flight options.");
            });
    }

    function populateFlightTable(flightOptions) {
        const flightTableBody = document.getElementById('flight-table-body');
        if (!flightTableBody) return;

        flightTableBody.innerHTML = '';

        flightOptions.forEach(flight => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${flight.time}</td>
                <td>${flight.duration}</td>
                <td>${flight.price}</td>
                <td>${flight.from}</td>
                <td>${flight.to}</td>
            `;
            flightTableBody.appendChild(row);
        });
    }
});
