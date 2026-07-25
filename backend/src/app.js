const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const communityRoutes = require("./routes/communityRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CampusConnect Backend API is running!"
    });
});

module.exports = app;