const Booking = require("../models/Booking");

// Create Booking
const createBooking = async (req, res) => {

    try {

        const { name, phone, date, slot } = req.body;

        // Check if same date + slot already exists
        const existingBooking = await Booking.findOne({
            date: date,
            slot: slot
        });

        if (existingBooking) {

            return res.status(400).json({
                success: false,
                message: "❌ This slot is already booked. Please select another slot."
            });

        }

        const booking = new Booking({
            name,
            phone,
            date,
            slot,
            status: "Pending"
        });

        await booking.save();

        res.status(201).json({
            success: true,
            message: "Booking Saved Successfully!",
            booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Booking

const deleteBooking = async (req, res) => {

    try {

        await Booking.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Booking Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// Confirm Booking

const confirmBooking = async (req, res) => {

    try {

        const booking = await Booking.findByIdAndUpdate(

            req.params.id,

            {
                status: "Confirmed"
            },

            {
                new: true
            }

        );

        res.json({

            success: true,

            message: "Booking Confirmed",

            booking

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
// Get Booked Slots By Date
const getBookedSlots = async (req, res) => {

    try {

        const date = req.params.date;

        const bookings = await Booking.find({
            date: date
        });

        const slots = bookings.map(b => b.slot);

        res.json({
            success: true,
            slots
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// Get All Bookings
const getBookings = async (req, res) => {

    try {

        const bookings = await Booking.find().sort({ createdAt: -1 });

        res.json(bookings);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {

    createBooking,

    getBookings,

    deleteBooking,

    getBookedSlots,

    confirmBooking

};