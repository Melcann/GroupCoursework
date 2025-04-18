document.addEventListener("DOMContentLoaded", function () {
    const passengerTable = document.getElementById("passengerList");
    const searchPassenger = document.getElementById("search-passport");
    const passengerForm = document.getElementById("addPassengerForm");

    //Display passengeers
    function displayPassengers() {
        fetch("https://localhost:7285/api/Passengers")
            .then(res => res.json())
            .then(data => {
                console.log("Passengers fetched", data);
                passengerTable.innerHTML = "";
                data.forEach(passenger => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${passenger.passportID}</td>
                        <td class="name">${passenger.fullName}</td>
                        <td class="email">${passenger.email}</td>
                        <td class="phone">${passenger.phoneNumber}</td>
                        <td class="dob">${passenger.dateOfBirth}</td>
                        <td class="address">${passenger.address}</td>
                        <td class="flight">${passenger.flightType}</td>
                        <td class="checked">${passenger.checkedIn ? "Yes" : "No"}</td>
                        <td class="baggage">${passenger.baggage ? "Yes" : "No"}</td>
                        <td>
                            <button class="edit-btn">Edit</button>
                            <button onclick="deletePassenger(${passenger.passportID})">Delete</button>
                        </td>
                    `;
                    const editBtn = row.querySelector(".edit-btn");
                    editBtn.addEventListener("click", () => {
                        const name = row.querySelector(".name");
                        const email = row.querySelector(".email");
                        const phone = row.querySelector(".phone");
                        const dob = row.querySelector(".dob");
                        const address = row.querySelector(".address");
                        const flight = row.querySelector(".flight");
                        const checked = row.querySelector(".checked");
                        const baggage = row.querySelector(".baggage");

                        const actualDb = {
                            name: name.textContent,
                            email: email.textContent,
                            phone: phone.textContent,
                            dob: dob.textContent,
                            address: address.textContent,
                            flight: flight.textContent,
                            checked: checked.textContent === "Yes",
                            baggage: baggage.textContent === "Yes"
                        };

                        name.innerHTML = `<input type="text" value="${actualDb.name}">`;
                        email.innerHTML = `<input type="email" value="${actualDb.email}">`;
                        phone.innerHTML = `<input type="tel" value="${actualDb.phone}">`;
                        dob.innerHTML = `<input type="date" value="${actualDb.dob}">`;
                        address.innerHTML = `<input type="text" value="${actualDb.address}">`;
                        flight.innerHTML = `<input type="text" value="${actualDb.flight}">`;
                        checked.innerHTML = `
                            <select>
                                <option value="true" ${actualDb.checked ? "selected" : ""}>Yes</option>
                                <option value="false" ${!actualDb.checked ? "selected" : ""}>No</option>
                            </select>
                        `;
                        baggage.innerHTML = `
                            <select>
                                <option value="true" ${actualDb.baggage ? "selected" : ""}>Yes</option>
                                <option value="false" ${!actualDb.baggage ? "selected" : ""}>No</option>
                            </select>
                        `;

                        const actionCell = row.lastElementChild;
                        actionCell.innerHTML = `
                            <button class="save-btn">Save</button>
                            <button class="cancel-btn">Cancel</button>
                        `;

                        actionCell.querySelector(".save-btn").addEventListener("click", () => {
                            const updatedPassenger = {
                                PassportID: passenger.passportID,
                                fullName: name.querySelector("input").value,
                                email: email.querySelector("input").value,
                                phoneNumber: phone.querySelector("input").value,
                                dateOfBirth: dob.querySelector("input").value,
                                address: address.querySelector("input").value,
                                flightType: flight.querySelector("input").value,
                                checkedIn: checked.querySelector("select").value === "true",
                                baggage: baggage.querySelector("select").value === "true"
                            };

                            fetch(`https://localhost:7285/api/Passengers/${passenger.passportID}`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(updatedPassenger)
                            })
                                .then(res => res.json())
                                .then(updated => {
                                    console.log("Passenger updated:", updated);
                                    name.textContent = updated.fullName;
                                    email.textContent = updated.email;
                                    phone.textContent = updated.phoneNumber;
                                    dob.textContent = updated.dateOfBirth;
                                    address.textContent = updated.address;
                                    flight.textContent = updated.flightType;
                                    checked.textContent = updated.checkedIn ? "Yes" : "No";
                                    baggage.textContent = updated.baggage ? "Yes" : "No";

                                    actionCell.innerHTML = `
                                        <button class="edit-btn">Edit</button>
                                        <button onclick="deletePassenger(${updated.passportID})">Delete</button>
                                    `;
                                    alert("Passenger updated successfully!");
                                })
                                .catch(err => {
                                    console.error("Error updating passenger", err);
                                    alert("Error updating passenger.");
                                });
                        });

                        actionCell.querySelector(".cancel-btn").addEventListener("click", () => {
                            name.textContent = actualDb.name;
                            email.textContent = actualDb.email;
                            phone.textContent = actualDb.phone;
                            dob.textContent = actualDb.dob;
                            address.textContent = actualDb.address;
                            flight.textContent = actualDb.flight;
                            checked.textContent = actualDb.checked ? "Yes" : "No";
                            baggage.textContent = actualDb.baggage ? "Yes" : "No";

                            actionCell.innerHTML = `
                                <button class="edit-btn">Edit</button>
                                <button onclick="deletePassenger(${passenger.passportID})">Delete</button>
                            `;
                        });
                    });

                    passengerTable.appendChild(row);
                });
            })
            .catch(err => {
                console.error("Failed to fetch passengers", err);
                alert("Failed to fetch passengers.");
            });
    }

    //Add new p
    passengerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newPassenger = {
            PassportID: parseInt(document.getElementById("passportID").value),
            FullName: document.getElementById("fullName").value,
            Email: document.getElementById("email").value,
            PhoneNumber: document.getElementById("phoneNumber").value,
            DateOfBirth: document.getElementById("dateOfBirth").value,
            Address: document.getElementById("address").value,
            Baggage: document.getElementById("adminBaggage").value === "true",
            CheckedIn: document.getElementById("checkedIn").value === "true",
            FlightType: document.getElementById("flightType").value,
            FlightID: parseInt(document.getElementById("flightID").value)
        };

        fetch("https://localhost:7285/api/Passengers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPassenger)
        })
            .then(res => res.json())
            .then(() => {
                console.log("New passenger added");
                displayPassengers();
                passengerForm.reset();
                alert("Passenger added successfully!");
            })
            .catch(err => {
                console.error("Error adding passenger", err);
                alert("Error adding passenger.");
            });
    });

    //Search passenger Passport ID, filter 
    searchPassenger.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase();
        console.log("Searching for passenger with Passport ID:", query);

        const rows = document.querySelectorAll("#passengerList tr");

        if (query === "") {
            rows.forEach(row => row.style.display = "");
        } else {
            rows.forEach(row => {
                const passportId = row.cells[0].textContent.trim().toLowerCase(); //Passport ID
                if (passportId.includes(query)) {
                    console.log(`Passenger with Passport ID ${passportId} matches the search query.`);
                    row.style.display = "";
                } else {
                    console.log(`Passenger with Passport ID ${passportId} does not match the search query.`);
                    row.style.display = "none";
                }
            });
        }
    });


    //Delete passenger
    window.deletePassenger = function (passportId) {
        if (confirm("Are you sure you want to delete this passenger?")) {
            fetch(`https://localhost:7285/api/Passengers/${passportId}`, {
                method: "DELETE"
            })
                .then(res => {
                    if (res.ok) {
                        console.log("Passenger deleted successfully");
                        displayPassengers();
                        alert("Passenger deleted successfully!");
                    } else {
                        console.error("Failed to delete passenger");
                        alert("Failed to delete passenger.");
                    }
                })
                .catch(err => {
                    console.error("Error deleting passenger", err);
                    alert("Error deleting passenger.");
                });
        }
    };


    displayPassengers();
});

