const express = require("express");

const router = express.Router();

const {

    createBooking,

    getBookings,

    deleteBooking,

    getBookedSlots,

    confirmBooking

} = require("../controllers/bookingControllers");
router.get("/", getBookings);

router.get("/slots/:date", getBookedSlots);

router.post("/", createBooking);

router.put("/:id", confirmBooking);

router.delete("/:id", deleteBooking);

module.exports = router;