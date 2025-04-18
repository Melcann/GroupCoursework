//Scroll and page links
document.querySelectorAll('.page-links a[data-target]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); //stop hash

        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

//Login form
function login() {
    const branchId = document.getElementById("branchId").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const validUser = {
        branchId: "900874",
        username: "JetSetStanstead",
        password: "JetSetGoAdmin90@"
    };

    if (
        branchId === validUser.branchId &&
        username === validUser.username &&
        password === validUser.password
    ) {
        sessionStorage.setItem("isLoggedIn", "true");

        showMessage("Login successful! Redirecting...", "success");

        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000);
    } else {
        showMessage("Invalid Branch ID, Username, or Password.", "error");
    }
}

//Show message
function showMessage(msg, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = msg;
    messageDiv.className = type;
}

//Logout function
function logout() {
    sessionStorage.clear();
    window.location.href = "adminLogin.html";
}

//Check login status
function checkAuth() {
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "adminLogin.html";
    }
}

