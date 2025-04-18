//Seats
document.addEventListener('DOMContentLoaded', () => {
    const rows = 5;
    const seatsPerRow = 6;
    let seatNumber = 1;

    const seatContainer = document.getElementById('seating-layout');

    for (let row = 1; row <= rows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        const leftSeats = document.createElement('div');
        leftSeats.classList.add('left-seats');
        const rightSeats = document.createElement('div');
        rightSeats.classList.add('right-seats');

        for (let i = 0; i < seatsPerRow; i++) {
            const seatButton = document.createElement('button');
            seatButton.classList.add('seat');
            seatButton.setAttribute('data-seat', seatNumber);
            seatButton.textContent = seatNumber;

            seatButton.addEventListener('click', function () {
                //Deselect all other seats
                document.querySelectorAll('.seat').forEach(seat => seat.classList.remove('selected'));
                this.classList.add('selected');

                const selectedSeat = this.getAttribute('data-seat');

                //Save to localStorage
                localStorage.setItem('selectedSeatNumber', selectedSeat);
                console.log("Selected seat number:", selectedSeat);

                //Show message
                document.getElementById('seat-message').textContent = `Seat selected: ${selectedSeat}`;
            });

            if (i < 3) {
                leftSeats.appendChild(seatButton);
            } else {
                rightSeats.appendChild(seatButton);
            }

            seatNumber++;
        }

        const aisle = document.createElement('span');
        aisle.classList.add('aisle');

        rowDiv.appendChild(leftSeats);
        rowDiv.appendChild(aisle);
        rowDiv.appendChild(rightSeats);

        seatContainer.appendChild(rowDiv);
    }
});


//Baggage and flight type (class)
document.addEventListener("DOMContentLoaded", () => {
    const flightTypeSelect = document.getElementById("flight-type");
    const baggageRadios = document.querySelectorAll('input[name="checked-baggage"]');
    const baggageCostDisplay = document.getElementById("baggage-cost");

    //Class
    if (flightTypeSelect) {
        flightTypeSelect.addEventListener("change", function () {
            const selectedType = this.value;
            localStorage.setItem("selectedFlightType", selectedType);
            console.log("Flight type selected:", selectedType);
        });
    }

    //Baggage selection
    if (baggageRadios) {
        baggageRadios.forEach(radio => {
            radio.addEventListener("change", function () {
                const baggageWeight = this.value;
                const baggageCost = baggageWeight === "23" ? 15 : 0;
                baggageCostDisplay.textContent = `£${baggageCost}`;
                localStorage.setItem("selectedBaggageWeight", baggageWeight);
                localStorage.setItem("selectedBaggageCost", baggageCost);
                console.log("Baggage selected:", baggageWeight, "kg for £" + baggageCost);
            });
        });
    }
});





//Booking information
document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        //Passenger details
        const fullName = document.getElementById("full-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const passportID = document.getElementById("passport").value;
        const dob = document.getElementById("dob").value;
        const address = document.getElementById("address").value;

        //Payment details 
        const cardNumber = document.getElementById("card-number").value;
        const expiryDate = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;

        // Local strorage data
        const selectedFlightId = localStorage.getItem('selectedFlightId');
        const selectedSeat = localStorage.getItem('selectedSeatNumber');
        const selectedFlightType = localStorage.getItem('selectedFlightType');
        const selectedBaggageWeight = localStorage.getItem('selectedBaggageWeight');
        const selectedBaggageCost = localStorage.getItem('selectedBaggageCost');

        //Addin passenger schema
        const passengerData = {
            passportID: parseInt(passportID),
            fullName: fullName,
            phoneNumber: phone,
            dateOfBirth: dob,
            address: address,
            baggage: selectedBaggageWeight === "23", //baggage = true if 23kg selected
            checkedIn: false, //default no
            email: email,
            flightType: selectedFlightType,
            flightID: parseInt(selectedFlightId)
        };

        //Adding booking schems
        const bookingData = {
            passportId: parseInt(passportID),
            flightID: parseInt(selectedFlightId),
            paymentStatus: true,
            seatNumber: parseInt(selectedSeat)
        };




        // STEP 1: Add Passenger
        fetch("https://localhost:7285/api/Passengers", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(passengerData),
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to add passenger");
                return response.json();
            })
            .then(passengerRes => {
                console.log("Passenger added:", passengerRes);

                // STEP 2: Add Baggage
                const baggageData = {
                    baggageID: Math.floor(Math.random() * 1000),
                    passportId: parseInt(passportID)
                };

                return fetch("https://localhost:7285/api/Baggage", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(baggageData)
                });
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to add baggage");
                return response.json();
            })
            .then(baggageRes => {
                console.log("Baggage added:", baggageRes);

                // STEP 3: Add Booking
                return fetch("https://localhost:7285/api/Bookings", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                });
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to create booking");
                return response.json();
            })
            .then(bookingRes => {
                console.log("Booking successful:", bookingRes);

                // Get BookingId from response
                const bookingId = bookingRes.bookingId || bookingRes.BookingId || "N/A";
                console.log("Booking ID received:", bookingId);
                console.log("Redirecting in 7 minutes...");

                // Delayed Redirect
                setTimeout(() => {
                    window.location.href = `/HTML/confirmation.html?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&bookingId=${encodeURIComponent(bookingId)}`;
                }, 420000); // 7 minutes
            })
            .catch(error => {
                console.error("Booking process failed:", error);
            });
    });
});

