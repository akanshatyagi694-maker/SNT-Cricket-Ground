// =========================
// Elements
// =========================
const loginBox = document.getElementById("loginBox");
const dashboard = document.getElementById("dashboard");

const username = document.getElementById("username");
const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const loginMessage = document.getElementById("loginMessage");

const bookingTable = document.getElementById("bookingTable");

const totalBookings = document.getElementById("totalBookings");
const pendingBookings = document.getElementById("pendingBookings");
const confirmedBookings = document.getElementById("confirmedBookings");

// =========================
// Login
// =========================

loginBtn.addEventListener("click", async () => {

    const response = await fetch(
        "http://127.0.0.1:5000/api/admin/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        }
    );
        const data = await response.json();

    if (data.success) {

        loginBox.style.display = "none";
        dashboard.style.display = "block";

        loginMessage.innerHTML = "";

        loadBookings();

    } else {

        loginMessage.innerHTML = data.message;

    }

});

// =========================
// Logout
// =========================

logoutBtn.addEventListener("click", () => {

    dashboard.style.display = "none";

    loginBox.style.display = "block";

    username.value = "";

    password.value = "";

});

// =========================
// Load Bookings
// =========================

async function loadBookings() {

    bookingTable.innerHTML = "";

    const response = await fetch(
        "http://127.0.0.1:5000/api/bookings"
    );

    const bookings = await response.json();

    totalBookings.innerHTML = bookings.length;

    let pending = 0;
    let confirmed = 0;
        bookings.forEach((booking) => {

        if (booking.status === "Pending") {
            pending++;
        }

        if (booking.status === "Confirmed") {
            confirmed++;
        }

        bookingTable.innerHTML += `
<tr>

<td>${booking.name}</td>

<td>${booking.phone}</td>

<td>${booking.date}</td>

<td>${booking.slot}</td>

<td>${booking.status}</td>

<td>

${
booking.status === "Confirmed"

?

`<button
class="confirmBtn"
disabled
style="background:gray;cursor:not-allowed;">
Confirmed
</button>`

:

`<button
class="confirmBtn"
onclick="confirmBooking(
'${booking._id}',
'${booking.name}',
'${booking.phone}',
'${booking.date}',
'${booking.slot}'
)">
Confirm
</button>`

}

<button
class="deleteBtn"
onclick="deleteBooking('${booking._id}')">
Delete
</button>

</td>

</tr>
`;

    });

    pendingBookings.innerHTML = pending;

    confirmedBookings.innerHTML = confirmed;

}
// =========================
// Confirm Booking
// =========================

async function confirmBooking(id, name, phone, date, slot) {

    const response = await fetch(
        `http://127.0.0.1:5000/api/bookings/${id}`,
        {
            method: "PUT"
        }
    );

    const data = await response.json();

    if (data.success) {

        alert("✅ Booking Confirmed");

        const message = `🏏 *SNT Cricket Ground*

Hello ${name},

Your booking has been *CONFIRMED* ✅

📅 Date : ${date}
⏰ Slot : ${slot}

📍 Please reach 15 minutes before your slot.

Thank You!

SNT Cricket Ground`;

        window.open(
            "https://wa.me/91" +
            phone +
            "?text=" +
            encodeURIComponent(message),
            "_blank"
        );

        loadBookings();

    } else {

        alert(data.message);

    }

}

// =========================
// Delete Booking
// =========================

async function deleteBooking(id) {

    if (!confirm("Delete this booking?")) return;

    await fetch(
        `http://127.0.0.1:5000/api/bookings/${id}`,
        {
            method: "DELETE"
        }
    );

    loadBookings();

}
