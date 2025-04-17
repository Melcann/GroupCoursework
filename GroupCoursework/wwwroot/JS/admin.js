//Scroll and page links
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

//Login form
async function login() {
    const branchId = document.getElementById("branchId").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageDiv = document.getElementById("message");

    const payload = {
        userName: username,
        branchId: parseInt(branchId),
        password: password
    };

    try {
        const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            // Store user data (optional: localStorage)
            localStorage.setItem("adminUser", JSON.stringify(data));

            // Redirect to admin dashboard page
            window.location.href = "/admin.html";
        } else {
            messageDiv.innerText = data.message || "Login failed.";
            messageDiv.style.color = "red";
        }

    } catch (error) {
        console.error("Login error:", error);
        messageDiv.innerText = "Something went wrong. Please try again.";
        messageDiv.style.color = "red";
    }
}



//logout function
function logout() {
    sessionStorage.clear();
    window.location.href = 'adminLogin.html'; // Redirect to login page
}