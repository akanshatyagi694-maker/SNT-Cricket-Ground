// ==========================
// Gallery (Safe Version)
// ==========================

const images = document.querySelectorAll(".gallery-container img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

if (images.length && lightbox && lightboxImg) {

    images.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    if (closeBtn) {
        closeBtn.onclick = () => {
            lightbox.style.display = "none";
        };
    }

    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    };
}

// ==========================
// Booking Form
// ==========================

const bookingForm = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");
const slotSelect = document.getElementById("slot");

if (bookingForm) {

    bookingForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const date = document.getElementById("date").value;
        const slot = document.getElementById("slot").value;
dateInput.addEventListener("change", async () => {

    const date = dateInput.value;

    const response = await fetch(
        `http://127.0.0.1:5000/api/bookings/slots/${date}`
    );

    const data = await response.json();

    // Enable all slots
    Array.from(slotSelect.options).forEach(option => {
        option.disabled = false;
    });

    // Disable booked slots
    data.slots.forEach(slot => {

        Array.from(slotSelect.options).forEach(option => {

            if (option.value === slot) {

                option.disabled = true;

                option.text = slot + " (Booked)";

            }

        });

    });

});
dateInput.addEventListener("change", async () => {

    const date = dateInput.value;

    const response = await fetch(
        `http://127.0.0.1:5000/api/bookings/slots/${date}`
    );

    const data = await response.json();

    Array.from(slotSelect.options).forEach(option => {
        option.disabled = false;
    });

    data.slots.forEach(slot => {

        Array.from(slotSelect.options).forEach(option => {

            if (option.value === slot) {

                option.disabled = true;
                option.text = slot + " (Booked)";

            }

        });

    });

});
        try {

            const response = await fetch("http://127.0.0.1:5000/api/bookings", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    phone,
                    date,
                    slot
                })

            });

            const data = await response.json();

     if (!response.ok) {

         alert(data.message);

        return;

    }

            if (data.success) {

                alert("✅ Booking Saved Successfully!");

                const message =
`🏏 *SNT Cricket Ground Booking*

Name : ${name}
Phone : ${phone}
Date : ${date}
Slot : ${slot}`;

              window.location.href =
    "https://wa.me/918010874325?text=" + encodeURIComponent(message);

                bookingForm.reset();

            } else {

                if (!data.success) {

    alert(data.message);

    return;

}

            }

        } catch (error) {

            console.error(error);

            alert("❌ Server Connection Failed");

        }

    });

}