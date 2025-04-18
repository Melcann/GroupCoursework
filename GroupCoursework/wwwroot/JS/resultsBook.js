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
            passportId: [parseInt(passportID)],
            flightID: [parseInt(selectedFlightId)],
            paymentStatus: true,
            seatNumber: parseInt(selectedSeat)
        };







        //Send the data to the backend (POST request for booking)
        const bookingPost = "https://localhost:7285/api/Bookings";
        fetch(bookingPost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        })
            .then(response => response.json())
            .then(data => {
                //Redirect to confirmation.html
                console.log("Booking successful:", data);

            })
            .catch(error => {
                console.error("Error booking flight:", error);
                //message
            });

        //Baggage data (POST)
        const baggageData = {
            baggageID: Math.floor(Math.random() * 1000), //Random ID
            passportId: parseInt(passportID),
        };

        fetch("https://localhost:7285/api/Baggage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(baggageData),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Baggage added:", data);
            })
            .catch(error => {
                console.error("Error adding baggage:", error);
            });

        //passengr (POST)
        fetch("https://localhost:7285/api/Passengers", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passengerData),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Passenger added:", data);
            })
            .catch(error => {
                console.error("Error adding passenger:", error);
            });

    });
});
