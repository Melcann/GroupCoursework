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


//booking summary
document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");

    const baggageCosts = {
        "0": 0,
        "23": 15
    };

    //Update the booking summary
    const updateSummary = () => {
        const selectedBaggage = document.querySelector('input[name="checked-baggage"]:checked')?.value || "0";
        const selectedFlightType = document.getElementById('flight-type')?.value || "economy";
        const selectedSeat = localStorage.getItem('selectedSeatNumber') || "No seat selected";

        const baggageCost = baggageCosts[selectedBaggage] || 0;
        const flightPrice = parseInt(localStorage.getItem('selectedFlightPrice')) || 0; 
        const totalPrice = flightPrice + baggageCost;

        //Update elemenw
        if (document.getElementById('baggage-summary')) {
            document.getElementById('baggage-summary').textContent = selectedBaggage === "0" ? "No checked baggage" : "23kg checked baggage (£15)";
        }

        if (document.getElementById('baggage-cost')) {
            document.getElementById('baggage-cost').textContent = `£${baggageCost}`;
        }

        if (document.getElementById('flight-type-summary')) {
            document.getElementById('flight-type-summary').textContent = selectedFlightType.charAt(0).toUpperCase() + selectedFlightType.slice(1);
        }

        if (document.getElementById('seat-summary')) {
            document.getElementById('seat-summary').textContent = selectedSeat;
        }

        if (document.getElementById('flight-price')) {
            document.getElementById('flight-price').textContent = `£${flightPrice}`;
        }

        if (document.getElementById('total-price')) {
            document.getElementById('total-price').textContent = `£${totalPrice}`;
        }
    };

    //Update on baggage change
    const baggageRadioButtons = document.querySelectorAll('input[name="checked-baggage"]');
    baggageRadioButtons.forEach((radioButton) => {
        radioButton.addEventListener('change', function () {
            const baggageWeight = this.value;
            const baggageCost = baggageWeight === "23" ? 15 : 0;
            localStorage.setItem("selectedBaggageWeight", baggageWeight);
            localStorage.setItem("selectedBaggageCost", baggageCost);
            updateSummary();
        });
    });

    //Update on flight type change
    const flightTypeSelect = document.getElementById('flight-type');
    if (flightTypeSelect) {
        flightTypeSelect.addEventListener('change', function () {
            localStorage.setItem("selectedFlightType", this.value);
            updateSummary();
        });
    }

    //Update on seat selection
    const seatButtons = document.querySelectorAll('.seat');
    seatButtons.forEach((seatButton) => {
        seatButton.addEventListener('click', function () {
            document.querySelectorAll('.seat').forEach(seat => seat.classList.remove('selected'));
            this.classList.add('selected');

            const selectedSeat = this.getAttribute('data-seat');
            localStorage.setItem('selectedSeatNumber', selectedSeat);

            const seatMessage = document.getElementById('seat-message');
            if (seatMessage) {
                seatMessage.textContent = `Seat selected: ${selectedSeat}`;
            }

            updateSummary();
        });
    });

    //Initial summary load
    updateSummary();



    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        //Passenger details from form
        const fullName = document.getElementById("full-name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const passportID = document.getElementById("passport").value;
        const dob = document.getElementById("dob").value;
        const address = document.getElementById("address").value;

        //Local storage data
        const selectedFlightId = localStorage.getItem('selectedFlightId');
        const selectedFlightType = localStorage.getItem('selectedFlightType');
        const selectedBaggageWeight = localStorage.getItem('selectedBaggageWeight');

        // assenger data schema
        const passengerData = {
            passportID: parseInt(passportID),
            fullName: fullName,
            phoneNumber: phone,
            dateOfBirth: dob,
            address: address,
            baggage: selectedBaggageWeight === "23",  //true if baggage is 23kg
            checkedIn: false,
            email: email,
            flightType: selectedFlightType,
            flightID: parseInt(selectedFlightId)
        };

        //Add passenger data to server
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

                //Add baggage data
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

                //Send confirmation email
                return fetch(`https://localhost:7285/Email/send?passengerMail=${encodeURIComponent(email)}&passengerName=${encodeURIComponent(fullName)}`, {
                    method: 'POST'
                });
            })
            .then(emailRes => {
                if (!emailRes.ok) throw new Error("Failed to send confirmation email");
                return emailRes.text();
            })
            .then(emailResult => {
                console.log("Email sent:", emailResult);

                //Redirect to confirmation page after a short delay
                setTimeout(() => {
                    window.location.href = `/HTML/confirmation.html?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&bookingId=N/A`;
                }, 4000);
            })
            .catch(error => {
                console.error("Submission process failed:", error);
            });
    });
});
