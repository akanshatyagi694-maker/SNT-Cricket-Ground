const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 SNT Cricket Ground API Running...");
});

console.log("Booking Routes:", bookingRoutes);

app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
