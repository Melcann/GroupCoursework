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



//logout function
function logout() {
    sessionStorage.clear();
    window.location.href = 'adminLogin.html'; // Redirect to login page
}