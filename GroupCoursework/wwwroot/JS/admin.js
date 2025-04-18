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

// Login form
function login() {
    const branchId = document.getElementById('branchId').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = {
        BranchId: branchId,
        UserName: username,
        Password: password
    };

    document.getElementById('message').innerText = 'Logging in...';

    fetch('https://localhost:7285/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                sessionStorage.setItem('username', data.adminId);
                document.getElementById('message').innerText = `Login successful. Welcome, ${data.adminId}!`;
                setTimeout(() => {
                    window.location.href = 'admin.html'; 
                }, 4000);
            }
        })
        .catch(error => {
            document.getElementById('message').innerText = error.message;
        });
}

// Logout function
function logout() {
    sessionStorage.clear();
    window.location.href = 'adminLogin.html';
}
