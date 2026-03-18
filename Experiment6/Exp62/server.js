const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// 🔥 Root Route (for browser)
app.get("/", (req, res) => {
  res.send("✅ JWT Banking API is running successfully!");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Protected Route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});