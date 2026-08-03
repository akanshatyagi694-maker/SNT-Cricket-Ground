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

// ==========================
// Booking Form
// ==========================

const bookingForm = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");
const slotSelect = document.getElementById("slot");

const API_URL = "http://localhost:5000";

// ==========================
// Check Booked Slots
// ==========================

if (dateInput && slotSelect) {

    dateInput.addEventListener("change", async () => {

        const selectedDate = dateInput.value;

        if (!selectedDate) return;

        // Reset slots first
        Array.from(slotSelect.options).forEach(option => {

            option.disabled = false;

            if (option.value) {
                option.textContent = option.value;
            }

        });

        try {

            const response = await fetch(
                `${API_URL}/api/bookings/slots/${selectedDate}`
            );

            if (!response.ok) {
                throw new Error("Could not load slots");
            }

            const data = await response.json();

            const bookedSlots = data.slots || [];

            bookedSlots.forEach(bookedSlot => {

                Array.from(slotSelect.options).forEach(option => {

                    if (option.value === bookedSlot) {

                        option.disabled = true;

                        option.textContent =
                            `${bookedSlot} (Booked)`;

                    }

                });

            });

        } catch (error) {

            console.error(
                "Slot loading error:",
                error
            );

        }

    });

}


// ==========================
// Submit Booking
// ==========================

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const date =
                document.getElementById("date").value;

            const slot =
                document.getElementById("slot").value;


            if (!name || !phone || !date || !slot) {

                alert("Please fill all booking details.");

                return;
            }


            try {

                const response = await fetch(
                    `${API_URL}/api/bookings`,
                    {
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
                    }
                );


                const data = await response.json();


                if (!response.ok || !data.success) {

                    alert(
                        data.message ||
                        "Booking could not be completed."
                    );

                    return;
                }


                alert(
                    "✅ Booking request submitted successfully!"
                );


                // WhatsApp message for SNT
const message =
`🏏 *SNT Cricket Ground Booking*

Name : ${name}
Contact No. : ${phone}
Date : ${date}
Slot : ${slot}`;


                const whatsappURL =
                    "https://wa.me/918010874325?text=" +
                    encodeURIComponent(message);


                window.open(
                    whatsappURL,
                    "_blank"
                );


                bookingForm.reset();


            } catch (error) {

                console.error(
                    "Booking error:",
                    error
                );

                alert(
                    "❌ Unable to connect to the booking server."
                );

            }

        }
    );

}