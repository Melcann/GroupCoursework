document.addEventListener("DOMContentLoaded", function () {
    const planeTable = document.getElementById("planeList");
    const searchPlane = document.getElementById("search-plane");
    const planeForm = document.getElementById("addPlaneForm");

    //Load planes
    function displayPlanes() {
        console.log("Page load and fetching all planes...");
        fetch("https://localhost:7285/api/Planes")
            .then(response => response.json())
            .then(data => {
                console.log("Planes fetched:", data);
                renderPlanes(data);
            })
            .catch(error => console.error("Error fetching planes:", error));
    }

    //Planes table
    function renderPlanes(planes) {
        planeTable.innerHTML = "";
        planes.forEach(plane => {
            const row = document.createElement("tr");
            row.setAttribute("data-plane-id", plane.planeId);

            row.innerHTML = `
                <td class="plane-id">${plane.planeId}</td>
                <td class="plane-seat">${plane.seatCapacity}</td>
                <td class="plane-weight">${plane.weightCapacity}</td>
                <td class="plane-availability">${plane.availability ? "Available" : "Not Available"}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button onclick="deletePlane(${plane.planeId})">Delete</button>
                </td>
            `;

            //Crud save,edit cancel
            row.querySelector(".edit-btn").addEventListener("click", function () {
                const seatCell = row.querySelector(".plane-seat");
                const weightCell = row.querySelector(".plane-weight");
                const availCell = row.querySelector(".plane-availability");

                const originalSeat = seatCell.textContent;
                const originalWeight = weightCell.textContent;
                const originalAvail = availCell.textContent;

                seatCell.innerHTML = `<input type="number" value="${originalSeat}">`;
                weightCell.innerHTML = `<input type="number" step="0.01" value="${originalWeight}">`;
                availCell.innerHTML = `
                    <select>
                        <option value="true" ${originalAvail === "Available" ? "selected" : ""}>Available</option>
                        <option value="false" ${originalAvail === "Not Available" ? "selected" : ""}>Not Available</option>
                    </select>
                `;

                const actionCell = row.lastElementChild;
                actionCell.innerHTML = `
                    <button class="save-btn">Save</button>
                    <button class="cancel-btn">Cancel</button>
                `;

                //Save
                actionCell.querySelector(".save-btn").addEventListener("click", function () {
                    const updatedPlane = {
                        planeId: plane.planeId,
                        seatCapacity: parseInt(seatCell.querySelector("input").value),
                        weightCapacity: parseFloat(weightCell.querySelector("input").value),
                        availability: availCell.querySelector("select").value === "true"
                    };

                    fetch(`https://localhost:7285/api/Planes/${plane.planeId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedPlane)
                    })
                        .then(response => {
                            if (response.ok) {
                                displayPlanes();
                            } else {
                                console.error("Update failed");
                            }
                        })
                        .catch(error => console.error("Error updating plane:", error));
                });

                //Cancel
                actionCell.querySelector(".cancel-btn").addEventListener("click", function () {
                    seatCell.textContent = originalSeat;
                    weightCell.textContent = originalWeight;
                    availCell.textContent = originalAvail;

                    actionCell.innerHTML = `
                        <button class="edit-btn">Edit</button>
                        <button onclick="deletePlane(${plane.planeId})">Delete</button>
                    `;
                    row.querySelector(".edit-btn").addEventListener("click", arguments.callee); // Re-bind edit
                });
            });

            planeTable.appendChild(row);
        });
    }

    //Add new plane
    planeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newPlane = {
            planeId: parseInt(document.getElementById("plane_id").value),
            seatCapacity: parseInt(document.getElementById("seat_capacity").value),
            weightCapacity: parseFloat(document.getElementById("weight_capacity").value),
            availability: document.getElementById("availability").value === "Available"
        };

        fetch("https://localhost:7285/api/Planes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlane)
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to add plane");
                return response.json();
            })
            .then(data => {
                console.log("Plane added:", data);
                displayPlanes();
                planeForm.reset();
            })
            .catch(error => console.error("Error adding plane:", error));
    });

    //Delete plane
    window.deletePlane = function (planeId) {
        if (!confirm("Are you sure you want to delete this plane?")) return;

        fetch(`https://localhost:7285/api/Planes/${planeId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    displayPlanes();
                } else {
                    console.error("Failed to delete plane.");
                }
            })
            .catch(error => console.error("Error deleting plane:", error));
    };

    //Search plane by ID
    searchPlane.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase(); //case insensitive 
        console.log("Searching for plane with ID:", query);

        const rows = document.querySelectorAll("#planeList tr");

        if (query === "") {
            //Query is empty, show all rows
            rows.forEach(row => row.style.display = "");
        } else {
            rows.forEach(row => {
                const planeId = row.cells[0].textContent.trim().toLowerCase(); // Get the plane ID and make it lowercase for comparison

                //Plane ID matche query to show the row
                if (planeId.includes(query)) {
                    console.log(`Plane with ID ${planeId} matches the search query.`);
                    row.style.display = "";
                } else {
                    console.log(`Plane with ID ${planeId} does not match the search query.`);
                    row.style.display = "none";
                }
            });
        }
    });


    displayPlanes();
});

