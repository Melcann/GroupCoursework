const flights = [
    { time: "06:50 - 10:05", duration: "2h 15m", price: "£64", from: "LTN", to: "BCN" },
    { time: "08:00 - 11:15", duration: "3h 15m", price: "£75", from: "LHR", to: "CDG" },
    { time: "12:00 - 14:30", duration: "2h 30m", price: "£120", from: "MAN", to: "FRA" }
];

function populateFlightsTable() {
    const tableBody = document.getElementById('flight-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    flights.forEach((flight, index) => {
        const row = document.createElement('tr');
        row.setAttribute('data-index', index);

        const timeCell = document.createElement('td');
        timeCell.textContent = flight.time;
        row.appendChild(timeCell);

        const durationCell = document.createElement('td');
        durationCell.textContent = flight.duration;
        row.appendChild(durationCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = flight.price;
        row.appendChild(priceCell);

        const fromCell = document.createElement('td');
        fromCell.textContent = flight.from;
        row.appendChild(fromCell);

        const toCell = document.createElement('td');
        toCell.textContent = flight.to;
        row.appendChild(toCell);

        row.addEventListener('click', function () {
            selectFlight(index);
        });

        tableBody.appendChild(row);
    });
}

function selectFlight(index) {
    const selectedFlight = flights[index];
    const bookingForm = document.getElementById('booking-form');
    bookingForm.scrollIntoView({ behavior: 'smooth' });
}

// Call the function to populate the table
populateFlightsTable();

document.querySelectorAll('input[name="checked-baggage"]').forEach(input => {
    input.addEventListener('change', function() {
        document.getElementById("baggage-cost").textContent = "£" + this.value;
    });
});