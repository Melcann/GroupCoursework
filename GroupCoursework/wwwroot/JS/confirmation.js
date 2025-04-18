// Details parse
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
const email = params.get('email');
const bookingId = params.get('bookingId');

document.getElementById('conf-name').textContent = name;
document.getElementById('conf-email').textContent = email;
document.getElementById('conf-booking-id').textContent = bookingId;

document.getElementById('confirm-button').addEventListener('click', () => {
    window.location.href = "../index.html";
});