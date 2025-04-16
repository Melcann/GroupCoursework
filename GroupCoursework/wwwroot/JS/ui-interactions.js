document.addEventListener('DOMContentLoaded', () => {
    // Define the seat layout (5 rows with 6 seats each)
    const seatLayout = [
        { row: 1, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { row: 2, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { row: 3, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { row: 4, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },
        { row: 5, seats: ['A', 'B', 'C', 'D', 'E', 'F'] }
    ];

    const seatContainer = document.getElementById('seating-layout');

    seatLayout.forEach(({ row, seats }) => {
        // Create a row container
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        // Create the left and right seat groups
        const leftSeats = document.createElement('div');
        leftSeats.classList.add('left-seats');
        const rightSeats = document.createElement('div');
        rightSeats.classList.add('right-seats');

        // Loop through each seat and create buttons
        seats.forEach((seat, index) => {
            const seatButton = document.createElement('button');
            seatButton.classList.add('seat');
            seatButton.setAttribute('data-seat', `${row}${seat}`);
            seatButton.textContent = `${row}${seat}`;

            // Add event listener to handle seat selection
            seatButton.addEventListener('click', function () {
                // Deselect any previously selected seat
                document.querySelectorAll('.seat').forEach(seat => seat.classList.remove('selected'));
                this.classList.add('selected'); // Mark as selected

                const selectedSeat = this.getAttribute('data-seat');
                document.getElementById('selected-seat').value = selectedSeat;
                document.getElementById('submit-button').disabled = false; 
            });

            // Assign seat to left or right side
            if (index < 3) {
                leftSeats.appendChild(seatButton); // Seats A, B, C
            } else {
                rightSeats.appendChild(seatButton); // Seats D, E, F
            }
        });

        // Add aisle divider between the left and right sections
        const aisle = document.createElement('span');
        aisle.classList.add('aisle');

        //left seats, aisle, and right seats to the row
        rowDiv.appendChild(leftSeats);
        rowDiv.appendChild(aisle);
        rowDiv.appendChild(rightSeats);

        seatContainer.appendChild(rowDiv);
    });
});

document.querySelectorAll('.page-links a[data-target]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // stop hash

        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
